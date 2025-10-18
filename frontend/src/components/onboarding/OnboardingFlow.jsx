import React, { useState, useRef, useEffect } from 'react';
import WebcamSetupStep from './WebcamSetupStep';
import SkeletonDetectionStep from './SkeletonDetectionStep';
import ExerciseSelectionStep from './ExerciseSelectionStep';
import PoseAnalysisComponent from '../PoseAnalysis';

import DebugUpload from '../debug/DebugUpload';

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const debugUploadRef = useRef(null);

  const handleUploadClick = () => {
    if (debugUploadRef.current) {
      debugUploadRef.current.click();
    }
  };

  const isDevMode = new URLSearchParams(window.location.search).get('dev') === 'true';

  // Effect to handle webcam stream
  useEffect(() => {
    if (isVideoUploaded) return; // Don't get webcam if a video is uploaded

    let stream = null;

    const getWebcam = async () => {
      // Stop any existing stream first
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }

      if (currentStep === 1 || currentStep === 2) { // Only get webcam for steps that need it
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            
            // Wait for the video to be loaded and then play it
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play().catch(e => console.log("Video play error:", e));
            };
            
            // Also try to play immediately
            if (videoRef.current.readyState >= 2) { // HAVE_CURRENT_DATA
              videoRef.current.play().catch(e => console.log("Video play error:", e));
            }
          }
          setCameraPermission('granted');
        } catch (err) {
          console.error('Error accessing webcam:', err);
          setCameraPermission('denied');
        }
      } else {
        // Stop the stream when moving past webcam steps
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }
      }
    };

    getWebcam();

    // Cleanup function to stop the stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [currentStep, isVideoUploaded]);

  useEffect(() => {
    // Activate analysis only on the skeleton detection step
    setIsAnalyzing(currentStep === 2);
  }, [currentStep]);

  const handleAnalysisComplete = (result) => {
    // In onboarding, we just care about detecting a skeleton
    if (result && result.keypoints_data && result.keypoints_data.length > 0) {
      setAnalysisResult(result);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(selectedExercise);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WebcamSetupStep 
            onNext={nextStep}
            onPrev={prevStep}
            cameraPermission={cameraPermission}
            setCameraPermission={setCameraPermission}
            videoRef={videoRef}
            onUploadClick={handleUploadClick}
          />
        );
      case 2:
        return (
          <SkeletonDetectionStep
            onNext={nextStep}
            onPrev={prevStep}
            videoRef={videoRef}
            canvasRef={canvasRef}
            analysisResult={analysisResult}
          />
        );
      case 3:
        return (
          <ExerciseSelectionStep
            onNext={nextStep}
            onPrev={prevStep}
            onComplete={onComplete}
            selectedExercise={selectedExercise}
            setSelectedExercise={setSelectedExercise}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#111' }}>
      {/* 1. 비디오와 캔버스의 zIndex를 높여서 가장 위로 올립니다. */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted
        controls={false}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          transform: 'scaleX(-1)',
          objectFit: 'contain',
          zIndex: 0, // 비디오는 맨 뒤에 위치
        }} 
      />
      <canvas 
        ref={canvasRef}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          zIndex: 1, // 캔버스는 비디오 위에 위치
        }} 
      />

      {/* 2. UI 요소들은 zIndex를 2로 설정하여 캔버스 위에 위치시킵니다. */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        {renderStep()}
      </div>
      
      {/* Dev mode file upload */}
      <DebugUpload ref={debugUploadRef} videoRef={videoRef} setCameraPermission={setCameraPermission} onVideoUpload={() => setIsVideoUploaded(true)} />

      {/* PoseAnalysisComponent는 시각적 요소가 아니므로 zIndex가 필요 없습니다. */}
      <PoseAnalysisComponent 
        modelPath="./yolov11_pose_dog.onnx"
        videoRef={videoRef}
        canvasRef={canvasRef}
        onAnalysisComplete={handleAnalysisComplete}
        isAnalyzing={isAnalyzing}
      />
    </div>
  );
};

export default OnboardingFlow;