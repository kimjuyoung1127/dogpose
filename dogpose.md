물론입니다. 지금까지 진행된 프로젝트의 모든 과정, 특히 험난했던 트러블슈팅 경험과 최종 해결책을 모두 담아 체계적인 **Notion 정리용 최종 보고서**를 만들어 드리겠습니다.

이 보고서는 프로젝트의 시작부터 현재까지의 여정을 기록하는 중요한 이정표가 될 것입니다.

-----

# 🐾 실시간 반려견 피트니스 플랫폼 개발 보고서

> **프로젝트 기간:** 2025-10-17 \~ 2025-10-18
> **핵심 목표:** 서버 중심 아키텍처의 높은 지연 시간(Latency) 문제를 해결하고, 브라우저 내에서 실시간으로 AI 자세 추정을 수행하는 클라이언트 중심 플랫폼 구축

<br>

## 1\. 📝 프로젝트 개요 및 최종 아키텍처

### 🎯 핵심 목표

기존 서버 측 AI 분석 시스템(`dogpose.md`)의 구조적 한계(네트워크 왕복 시간, 서버 비용)를 극복하기 위해, AI 추론 엔진을 사용자의 브라우저로 이전하는 클라이언트 중심 아키텍처로 전환. 이를 통해 **초저지연 실시간 경험, 개인정보보호 강화, 운영 비용 절감**이라는 핵심 가치를 달성.

### 💻 최종 기술 스택

  * **프론트엔드:** React, Vite, Tailwind CSS
  * **AI 추론 엔진:** ONNX Runtime Web
  * **AI 모델:** 반려견 전용 YOLOv11-pose (`.onnx`)
  * **백엔드:** FastAPI
  * **데이터베이스:** TimescaleDB (PostgreSQL 확장)

-----

## 2\. ✨ UX/UI 설계 방향

### 🚀 "10초 안에 체험하고, 10분 안에 중독되는 경험"

`kemtai.com` 등 성공적인 AI 피트니스 서비스를 벤치마킹하여, 사용자가 회원가입이나 복잡한 설정 없이 즉시 핵심 가치를 체험할 수 있는 "Zero Friction" 온보딩 플로우를 설계.

  * **1단계: 웹캠 설정:** 사용자 행동 기반으로 카메라를 활성화하여 안정성 확보.
  * **2단계: 스켈레톤 감지:** UI 틀 안에서 안정적으로 영상을 보여주며 AI가 반려견을 인식하는 과정을 시각적으로 피드백.
  * **3단계: 운동 선택:** 실제 운동으로 자연스럽게 연결.

### 🎨 컬러 팔레트: 신뢰와 활력 (Trust & Vitality)

전문성과 건강함을 전달하는 **Professional Blue**와 **Healthy Green**을 주력으로 사용하고, 사용자의 행동을 유도하는 버튼에는 **Action Orange**를 사용하여 명확성과 활기를 더함.

| 역할 | 색상 예시 | Hex 코드 |
| :--- | :--- | :--- |
| **주요 색상** | Professional Blue | `#4A69E2` |
| **보조 색상** | Healthy Green | `#34D399` |
| **강조 색상** | Action Orange | `#F9A826` |

-----

## 3\. 💣 주요 기술 난관 및 해결 과정 (Troubleshooting Log)

> **문제의 핵심:** Vite 개발 서버의 모듈 처리 방식과 `onnxruntime-web` 라이브러리의 WebAssembly 및 멀티스레딩 모듈 로딩 방식 간의 근본적인 **아키텍처 충돌.**

이 문제를 해결하기 위해 약 15단계 이상의 디버깅 과정을 거쳤으며, 그 과정에서 발생한 주요 오류와 최종 해결책은 다음과 같습니다.

### 📜 오류 발생 타임라인

1.  **MIME Type 오류:** `.wasm` 파일을 서버가 `text/html`로 잘못 전송.
2.  **500 Internal Server Error:** `.mjs` 파일을 Vite 서버가 처리하다 내부 충돌 발생.
3.  **LinkError:** 라이브러리 버전 다운그레이드 후, 캐시된 파일과 충돌 발생.
4.  **`drawImage` TypeError:** React 컴포넌트 렌더링 타이밍 문제로 비디오 요소가 준비되기 전에 그리려고 시도.
5.  **CSS `zIndex` 문제:** 비디오가 UI 요소 뒤에 숨어 보이지 않는 현상.

### 💡 최종 해결 청사진

수많은 시도 끝에, 아래 3가지 핵심 전략의 조합으로 모든 문제를 해결했습니다.

1.  **`vite-plugin-static-copy` 활용 (자동화):** `node_modules`에 숨어있는 `.wasm`, `.mjs` 파일들을 빌드 시점에 `public` 폴더로 자동으로 복사하여 Vite가 파일을 못 찾는 문제를 원천 차단.
2.  **보안 헤더 설정 (필수):** `SharedArrayBuffer`를 활성화하여 라이브러리의 멀티스레딩 성능을 끌어내기 위해 `vite.config.js`에 COOP/COEP 헤더를 명시.
3.  **명시적 경로 지정 (안정성):** 애플리케이션 코드에서 `ort.env.wasm.wasmPaths`를 통해 복사된 파일의 위치를 라이브러리에 직접 알려주어, 경로 추측으로 인한 오류를 방지.

\<details\>
\<summary\>\<b\>✅ 최종적으로 동작하는 \<code\>vite.config.js\</code\> 전문\</b\>\</summary\>

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/onnxruntime-web/dist/*.{wasm,mjs}',
          dest: 'wasm' 
        }
      ]
    })
  ],
  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
})
```

\</details\>

-----

## 4\. 🚀 프론트엔드 핵심 구현 코드

### `OnboardingFlow.jsx`

사용자 온보딩의 각 단계를 제어하고, **사라지지 않는 안정적인 비디오/캔버스 환경**을 제공하는 부모 컴포넌트.

\<details\>
\<summary\>\<b\>📄 \<code\>OnboardingFlow.jsx\</code\> 최종 코드 보기\</b\>\</summary\>

```jsx
import React, { useState, useRef, useEffect } from 'react';
import WebcamSetupStep from './WebcamSetupStep';
import SkeletonDetectionStep from './SkeletonDetectionStep';
import ExerciseSelectionStep from './ExerciseSelectionStep';
import PoseAnalysisComponent from '../PoseAnalysis';

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraPermission('granted');
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setCameraPermission('denied');
    }
  };

  useEffect(() => {
    setIsAnalyzing(currentStep === 2);
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [currentStep]);

  const handleAnalysisComplete = (result) => {
    if (result && result.keypoints_data && result.keypoints_data.length > 0) {
      setAnalysisResult(result);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WebcamSetupStep onStartWebcam={startWebcam} onNext={nextStep} cameraPermission={cameraPermission} />;
      case 2:
        return <SkeletonDetectionStep onNext={nextStep} onPrev={prevStep} analysisResult={analysisResult} />;
      case 3:
        return <ExerciseSelectionStep onComplete={onComplete} onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-[800px] h-[600px] bg-black rounded-lg shadow-2xl overflow-hidden">
        <video ref={videoRef} autoPlay playsInline muted className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1] z-0" />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10" />
        <div className="relative z-20 h-full">{renderStep()}</div>
        <PoseAnalysisComponent modelPath="./yolov11_pose_dog.onnx" videoRef={videoRef} canvasRef={canvasRef} onAnalysisComplete={handleAnalysisComplete} isAnalyzing={isAnalyzing} />
      </div>
    </div>
  );
};

export default OnboardingFlow;
```

\</details\>

### `PoseAnalysisComponent.jsx`

AI 모델 로딩, 실시간 추론, 전/후처리, 스켈레톤 렌더링 등 **모든 AI 관련 로직을 캡슐화**한 핵심 컴포넌트.

\<details\>
\<summary\>\<b\>📄 \<code\>PoseAnalysisComponent.jsx\</code\> 최종 코드 보기\</b\>\</summary\>

```jsx
import React, { useEffect, useRef, useState } from 'react';
import * as ort from 'onnxruntime-web';

const PoseAnalysisComponent = ({ modelPath, videoRef, canvasRef, onAnalysisComplete, isAnalyzing }) => {
  const [session, setSession] = useState(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        ort.env.wasm.wasmPaths = '/wasm/';
        const newSession = await ort.InferenceSession.create(modelPath, {
          executionProviders: ['webgl', 'wasm'],
        });
        setSession(newSession);
        console.log("ONNX session created successfully.");
      } catch (error) {
        console.error('Error loading ONNX model:', error);
      }
    };
    loadModel();
  }, [modelPath]);

  useEffect(() => {
    if (isAnalyzing && session) {
      const runAnalysis = async () => {
        if (!videoRef.current || videoRef.current.readyState < 3) {
          animationFrameId.current = requestAnimationFrame(runAnalysis);
          return;
        }
        const video = videoRef.current;
        const { input, newWidth, newHeight, padX, padY } = preprocess(video);
        const feeds = { images: input };
        const results = await session.run(feeds);
        const keypoints = postprocess(results, newWidth, newHeight, padX, padY, video.videoWidth, video.videoHeight);
        
        if (keypoints.length > 0) {
          onAnalysisComplete({ keypoints_data: keypoints });
          const ctx = canvasRef.current.getContext('2d');
          drawSkeleton(ctx, keypoints, canvasRef.current.width, canvasRef.current.height);
        }
        animationFrameId.current = requestAnimationFrame(runAnalysis);
      };
      runAnalysis();
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isAnalyzing, session, videoRef, canvasRef, onAnalysisComplete]);

  return null;
};

// --- Pre & Post Processing, Drawing functions ---

function preprocess(video) {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    const ratio = Math.min(640 / video.videoWidth, 640 / video.videoHeight);
    const newWidth = Math.round(video.videoWidth * ratio);
    const newHeight = Math.round(video.videoHeight * ratio);
    const padX = (640 - newWidth) / 2;
    const padY = (640 - newHeight) / 2;

    ctx.fillStyle = 'rgb(114, 114, 114)';
    ctx.fillRect(0, 0, 640, 640);
    ctx.drawImage(video, padX, padY, newWidth, newHeight);

    const imageData = ctx.getImageData(0, 0, 640, 640);
    const { data } = imageData;
    const float32Data = new Float32Array(3 * 640 * 640);

    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      float32Data[j] = data[i] / 255.0;
      float32Data[j + 640 * 640] = data[i + 1] / 255.0;
      float32Data[j + 2 * 640 * 640] = data[i + 2] / 255.0;
    }

    const input = new ort.Tensor('float32', float32Data, [1, 3, 640, 640]);
    return { input, newWidth, newHeight, padX, padY };
}

function postprocess(results, newWidth, newHeight, padX, padY, originalWidth, originalHeight) {
    const outputTensor = results['/model.22/Reshape_7_output_0']; // Netron에서 확인한 실제 이름
    if (!outputTensor) return [];
    
    const data = outputTensor.data;
    const dimensions = outputTensor.dims;
    const numPredictions = dimensions[2];
    const predictions = [];

    for (let i = 0; i < numPredictions; i++) {
        let maxConfidence = 0;
        for (let j = 0; j < 17; j++) {
            const keypointConfidence = data[i + (4 + j * 4 + 2) * numPredictions];
            if (keypointConfidence > maxConfidence) maxConfidence = keypointConfidence;
        }

        if (maxConfidence > 0.5) {
            const dogKeypoints = [];
            for (let j = 0; j < 17; j++) {
                const offset = 4 + j * 4;
                const x = data[i + (offset) * numPredictions];
                const y = data[i + (offset + 1) * numPredictions];
                const confidence = data[i + (offset + 2) * numPredictions];

                const originalX = ((x - padX) / newWidth) * originalWidth;
                const originalY = ((y - padY) / newHeight) * originalHeight;

                dogKeypoints.push({ x: originalX, y: originalY, confidence });
            }
            predictions.push({ keypoints: dogKeypoints, confidence: maxConfidence });
        }
    }

    if (predictions.length === 0) return [];
    predictions.sort((a, b) => b.confidence - a.confidence);
    return [predictions[0].keypoints];
}

function drawSkeleton(ctx, keypoints, width, height) {
    ctx.clearRect(0, 0, width, height);
    const connections = [[0, 1], [0, 2], [1, 3], [2, 4], [5, 6], [5, 7], [7, 9], [6, 8], [8, 10], [11, 12], [11, 13], [13, 15], [12, 14], [14, 16]];

    for (const dog of keypoints) {
        ctx.fillStyle = '#FF0000';
        dog.forEach(point => {
            if (point.confidence > 0.5) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
        });

        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 3;
        connections.forEach(([start, end]) => {
            const startPoint = dog[start];
            const endPoint = dog[end];
            if (startPoint && endPoint && startPoint.confidence > 0.5 && endPoint.confidence > 0.5) {
                ctx.beginPath();
                ctx.moveTo(startPoint.x, startPoint.y);
                ctx.lineTo(endPoint.x, endPoint.y);
                ctx.stroke();
            }
        });
    }
}

export default PoseAnalysisComponent;
```

\</details\>

-----

## 5\. ➡️ 프로젝트 현황 및 다음 단계

### ✅ 현재 상태

  * Vite + React + ONNX Runtime Web 기술 스택의 **환경 설정 문제 완벽 해결.**
  * 브라우저에서 실시간으로 웹캠 영상을 받아 AI 모델로 **스켈레톤을 추정하고 렌더링하는 핵심 기능 구현 완료.**
  * 사용자 온보딩 플로우의 기본 구조 및 컴포넌트 구현 완료.
