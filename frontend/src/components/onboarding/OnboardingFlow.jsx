import React, { useState, useRef, useEffect } from 'react';
import WebcamSetupStep from './WebcamSetupStep';
import SkeletonDetectionStep from './SkeletonDetectionStep';
import ExerciseSelectionStep from './ExerciseSelectionStep';
import PoseAnalysisComponent from '../PoseAnalysis';

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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
    <>
      {renderStep()}
      <PoseAnalysisComponent 
        modelPath="./yolov11_pose_dog.onnx"
        videoRef={videoRef}
        canvasRef={canvasRef}
        onAnalysisComplete={handleAnalysisComplete}
        isAnalyzing={isAnalyzing}
      />
    </>
  );
};

export default OnboardingFlow;