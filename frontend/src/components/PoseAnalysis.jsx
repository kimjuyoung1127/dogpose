import React, { useEffect, useRef, useState } from 'react';
import * as ort from 'onnxruntime-web';

/**
 * PoseAnalysisComponent: A component that performs real-time dog pose analysis
 * using an ONNX model running in the browser.
 *
 * @param {{
 *   modelPath: string,
 *   videoRef: React.RefObject<HTMLVideoElement>,
 *   canvasRef: React.RefObject<HTMLCanvasElement>,
 *   onAnalysisComplete: (results: any) => void,
 *   isAnalyzing: boolean
 * }} props
 */
const PoseAnalysisComponent = ({ modelPath, videoRef, canvasRef, onAnalysisComplete, isAnalyzing }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const animationFrameId = useRef(null);

  // 1. Load the ONNX model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Tell ONNX Runtime where to find the WASM files
        ort.env.wasm.wasmPaths = '/wasm/';

        setIsLoading(true);
        const newSession = await ort.InferenceSession.create(modelPath, {
          executionProviders: ['webgl', 'wasm'], // Use WebGL as primary, WASM as fallback
          graphOptimizationLevel: 'all',
        });
        setSession(newSession);
        console.log("ONNX session created successfully.");
      } catch (error) {
        console.error('Error loading ONNX model:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadModel();
  }, [modelPath]);

  // 2. Main analysis loop
  useEffect(() => {
    if (isAnalyzing && session && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let allKeypoints = [];

      const runAnalysis = async () => {
        // 1. Always check the latest videoRef.current
        if (!videoRef.current || videoRef.current.readyState < 3) {
          animationFrameId.current = requestAnimationFrame(runAnalysis);
          return;
        }

        // 2. Get the latest video information right after the check (this is the key change!)
        const video = videoRef.current;

        // 3. Now 'preprocess' function will always use the latest video information
        // Pre-process the frame
        const { input, newWidth, newHeight, padX, padY } = preprocess(video);

        // Run inference
        const feeds = { images: input };
        const results = await session.run(feeds);
        console.log("AI Model Raw Output:", results); // Log the raw output
        
        // Post-process the results
        const keypoints = postprocess(results, newWidth, newHeight, padX, padY, video.videoWidth, video.videoHeight);
        
        if (keypoints.length > 0) {
          allKeypoints.push(keypoints);
          drawSkeleton(ctx, keypoints, video, canvas);
        }

        animationFrameId.current = requestAnimationFrame(runAnalysis);
      };

      runAnalysis();

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        // When analysis stops, calculate final scores
        if (allKeypoints.length > 0) {
          const stability = calculateStabilityScore(allKeypoints);
          const curvature = calculateSpineCurvature(allKeypoints);
          onAnalysisComplete({
            scores: { stability, curvature },
            keypoints_data: allKeypoints,
          });
        }
      };
    }
  }, [isAnalyzing, session, videoRef, canvasRef]);

  return null; // This component is non-visual
};

// --- Pre-processing and Post-processing ---

const MODEL_WIDTH = 640;
const MODEL_HEIGHT = 640;

/**
 * Pre-processes a video frame for YOLO model inference.
 * @param {HTMLVideoElement} video 
 * @returns Pre-processed tensor and scaling information.
 */
function preprocess(video) {
  const canvas = document.createElement('canvas');
  canvas.width = MODEL_WIDTH;
  canvas.height = MODEL_HEIGHT;
  const ctx = canvas.getContext('2d');

  const ratio = Math.min(MODEL_WIDTH / video.videoWidth, MODEL_HEIGHT / video.videoHeight);
  const newWidth = Math.round(video.videoWidth * ratio);
  const newHeight = Math.round(video.videoHeight * ratio);
  const padX = (MODEL_WIDTH - newWidth) / 2;
  const padY = (MODEL_HEIGHT - newHeight) / 2;

  ctx.fillStyle = 'rgb(114, 114, 114)';
  ctx.fillRect(0, 0, MODEL_WIDTH, MODEL_HEIGHT);
  ctx.drawImage(video, padX, padY, newWidth, newHeight);

  const imageData = ctx.getImageData(0, 0, MODEL_WIDTH, MODEL_HEIGHT);
  const data = imageData.data;
  const float32Data = new Float32Array(3 * MODEL_WIDTH * MODEL_HEIGHT);

  let j = 0;
  for (let i = 0; i < data.length; i += 4) {
    float32Data[j] = data[i] / 255.0;     // R
    float32Data[j + MODEL_WIDTH * MODEL_HEIGHT] = data[i + 1] / 255.0; // G
    float32Data[j + 2 * MODEL_WIDTH * MODEL_HEIGHT] = data[i + 2] / 255.0; // B
    j++;
  }

  const input = new ort.Tensor('float32', float32Data, [1, 3, MODEL_HEIGHT, MODEL_WIDTH]);
  return { input, newWidth, newHeight, padX, padY };
}

/**
 * Post-processes the YOLOv8-pose model output to extract keypoints.
 * This version correctly handles the transposed output tensor.
 * @param {ort.Tensor} results 
 * @returns {Array<Array<{x: number, y: number, confidence: number}>>}
 */
function postprocess(results, newWidth, newHeight, padX, padY, originalWidth, originalHeight) {
    const outputTensor = results.output0;
    if (!outputTensor) { return []; }

    const data = outputTensor.data;
    const dims = outputTensor.dims; // [1, 77, 8400]
    const numPredictions = dims[2]; // 8400
    const predictions = [];
    const numKeypoints = 24;        // 77 = bbox(4) + obj_conf(1) + keypoints(24*3)

    for (let i = 0; i < numPredictions; i++) {
        // Transposed 데이터 접근 방식: i번째 예측의 5번째 속성(객체 신뢰도)을 가져옵니다.
        const classConfidence = data[i + 4 * numPredictions]; 

        if (classConfidence > 0.8) { // 임계값은 0.6으로 약간 높여 안정성 확보
            const dogKeypoints = [];
            for (let j = 0; j < numKeypoints; j++) {
                // keypoint 데이터는 5번 인덱스부터 시작합니다.
                const offset = 5 + j * 3;
                
                // Transposed 데이터 접근: data[i + 속성_인덱스 * 예측_개수]
                const x = data[i + (offset + 0) * numPredictions];
                const y = data[i + (offset + 1) * numPredictions];
                const confidence = data[i + (offset + 2) * numPredictions];

                const originalX = ((x - padX) / newWidth) * originalWidth;
                const originalY = ((y - padY) / newHeight) * originalHeight;

                dogKeypoints.push({ x: originalX, y: originalY, confidence });
            }
            predictions.push({ keypoints: dogKeypoints, confidence: classConfidence });
        }
    }

    if (predictions.length === 0) {
        return [];
    }

    // 가장 신뢰도 높은 예측 결과 하나만 선택합니다.
    predictions.sort((a, b) => b.confidence - a.confidence);
    return [predictions[0].keypoints];
}


// --- Score Calculation (Ported from Python) ---

/**
 * Calculates stability score based on spine angle deviation.
 * @param {Array} keypointsData - Array of keypoints for each frame.
 * @returns {number} Stability score (0-100).
 */
function calculateStabilityScore(keypointsData) {
  if (!keypointsData || keypointsData.length === 0) return 0;

  const [l_shoulder_idx, r_shoulder_idx] = [5, 6];
  const [l_hip_idx, r_hip_idx] = [11, 12];
  const spineAngles = [];

  for (const frameKeypoints of keypointsData) {
    if (!frameKeypoints || frameKeypoints.length === 0) continue;
    const dogKeypoints = frameKeypoints[0]; // Assume one dog

    if (dogKeypoints.length <= Math.max(l_shoulder_idx, r_shoulder_idx, l_hip_idx, r_hip_idx)) continue;

    const l_shoulder = dogKeypoints[l_shoulder_idx];
    const r_shoulder = dogKeypoints[r_shoulder_idx];
    const l_hip = dogKeypoints[l_hip_idx];
    const r_hip = dogKeypoints[r_hip_idx];

    if (!l_shoulder || !r_shoulder || !l_hip || !r_hip) continue;

    const shoulder_center = { x: (l_shoulder.x + r_shoulder.x) / 2, y: (l_shoulder.y + r_shoulder.y) / 2 };
    const hip_center = { x: (l_hip.x + r_hip.x) / 2, y: (l_hip.y + r_hip.y) / 2 };

    const [deltaY, deltaX] = [shoulder_center.y - hip_center.y, shoulder_center.x - hip_center.x];
    const angleRad = Math.atan2(deltaY, deltaX);
    spineAngles.push(angleRad * (180 / Math.PI));
  }

  if (spineAngles.length === 0) return 0;

  const mean = spineAngles.reduce((a, b) => a + b, 0) / spineAngles.length;
  const stdDev = Math.sqrt(spineAngles.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / spineAngles.length);
  
  const score = Math.max(0, 100 - (stdDev * 10));
  return Math.round(score);
}

/**
 * Calculates spine curvature score.
 * @param {Array} keypointsData - Array of keypoints for each frame.
 * @returns {number} Curvature score.
 */
function calculateSpineCurvature(keypointsData) {
    // This is a complex function that would require a similar porting effort.
    // For now, returning a placeholder.
    // The full implementation would involve porting the numpy-based logic
    // from `calculate_spine_curvature` in the Python script.
    return 75; // Placeholder score
}


// --- Drawing ---

/**
 * Draws the detected skeleton on the canvas.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Array} keypoints 
 * @param {number} width 
 * @param {number} height 
 */
function drawSkeleton(ctx, keypoints, video, canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const videoRatio = video.videoWidth / video.videoHeight;
    const canvasRatio = canvas.width / canvas.height;
    let scale = 1, offsetX = 0, offsetY = 0;

    if (videoRatio > canvasRatio) {
        scale = canvas.height / video.videoHeight;
        offsetX = (canvas.width - video.videoWidth * scale) / 2;
    } else {
        scale = canvas.width / video.videoWidth;
        offsetY = (canvas.height - video.videoHeight * scale) / 2;
    }

    // ★★★ 24개 관절에 대한 연결 정보 (추정) ★★★
    // 이 순서는 모델마다 다를 수 있으므로, 결과가 이상하면 이 배열의 숫자를 바꿔보며 테스트해야 합니다.
    const connections = [
        [0, 1], [0, 2], [1, 3], [2, 4],   // 머리 (0:코, 1:왼쪽눈, 2:오른쪽눈, 3:왼쪽귀, 4:오른쪽귀)
        [5, 6], [11, 12], [5, 11], [6, 12], // 몸통 (5:왼쪽어깨, 6:오른쪽어깨, 11:왼쪽엉덩이, 12:오른쪽엉덩이)
        [5, 7], [7, 9], [9, 21],          // 왼 앞다리 (7:팔꿈치, 9:손목, 21:발)
        [6, 8], [8, 10], [10, 22],         // 오른 앞다리
        [11, 13], [13, 15], [15, 17],      // 왼 뒷다리 (13:무릎, 15:발목, 17:발)
        [12, 14], [14, 16], [16, 18],      // 오른 뒷다리
        [11, 19], [12, 19]                // 꼬리 시작점 (19번 관절 추정)
    ];

    for (const dog of keypoints) {
        // 점 그리기 (Keypoints)
        ctx.fillStyle = '#FF00FF';
        dog.forEach(point => {
            if (point.confidence > 0.5) {
                const scaledX = point.x * scale + offsetX;
                const scaledY = point.y * scale + offsetY;
                ctx.beginPath();
                ctx.arc(scaledX, scaledY, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
        
        // 선 그리기 (Connections)
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 3;
        connections.forEach(([start, end]) => {
            if (dog[start] && dog[end] && dog[start].confidence > 0.5 && dog[end].confidence > 0.5) {
                const startX = dog[start].x * scale + offsetX;
                const startY = dog[start].y * scale + offsetY;
                const endX = dog[end].x * scale + offsetX;
                const endY = dog[end].y * scale + offsetY;
                
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }
        });
    }
}

export default PoseAnalysisComponent;