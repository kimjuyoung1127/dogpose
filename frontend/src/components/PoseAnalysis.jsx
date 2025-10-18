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
        if (video.readyState < 2) {
          animationFrameId.current = requestAnimationFrame(runAnalysis);
          return;
        }

        // Pre-process the frame
        const { input, newWidth, newHeight, padX, padY } = preprocess(video);

        // Run inference
        const feeds = { images: input };
        const results = await session.run(feeds);
        
        // Post-process the results
        const keypoints = postprocess(results, newWidth, newHeight, padX, padY, video.videoWidth, video.videoHeight);
        
        if (keypoints.length > 0) {
          allKeypoints.push(keypoints);
          drawSkeleton(ctx, keypoints, video.videoWidth, video.videoHeight);
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
 * Post-processes the model output to extract keypoints.
 * @param {ort.Tensor} results 
 * @returns {Array<Array<{x: number, y: number, confidence: number}>>}
 */
function postprocess(results, newWidth, newHeight, padX, padY, originalWidth, originalHeight) {
    const data = results.output0.data;
    const keypoints = [];
    const numKeypoints = 17; // For YOLOv8-pose
    const numElements = 4; // x, y, confidence, class

    for (let i = 0; i < data.length; i += numKeypoints * numElements) {
        const dogKeypoints = [];
        let isValid = true;
        for (let j = 0; j < numKeypoints; j++) {
            const x = data[i + j * numElements];
            const y = data[i + j * numElements + 1];
            const confidence = data[i + j * numElements + 2];

            // Scale back to original video dimensions
            const originalX = ((x - padX) / newWidth) * originalWidth;
            const originalY = ((y - padY) / newHeight) * originalHeight;

            dogKeypoints.push({ x: originalX, y: originalY, confidence });
            if(confidence < 0.5) isValid = false; // Threshold
        }
        if(isValid) keypoints.push(dogKeypoints);
    }
    return keypoints;
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
function drawSkeleton(ctx, keypoints, width, height) {
  ctx.clearRect(0, 0, width, height);
  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 4], // Head
    [5, 6], [5, 7], [7, 9], [6, 8], [8, 10], // Body and front legs
    [11, 12], [11, 13], [13, 15], [12, 14], [14, 16] // Hips and back legs
  ];

  for (const dog of keypoints) {
    // Draw keypoints
    ctx.fillStyle = '#FF0000';
    for (let i = 0; i < dog.length; i++) {
      const point = dog[i];
      if (point.confidence > 0.5) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Draw connections
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 3;
    for (const [start, end] of connections) {
      const startPoint = dog[start];
      const endPoint = dog[end];
      if (startPoint && endPoint && startPoint.confidence > 0.5 && endPoint.confidence > 0.5) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
      }
    }
  }
}

export default PoseAnalysisComponent;