import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import { registerServiceWorker, showInstallPrompt } from './utils/registerServiceWorker';
import LandingPage from './components/landingpage/LandingPage';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import WorkoutMode from './components/workout/WorkoutMode';
import Dashboard from './components/dashboard/Dashboard';
import WorkoutComplete from './components/workoutcompletion/WorkoutComplete';
import PoseAnalysisComponent from './components/PoseAnalysis';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workoutResult, setWorkoutResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // registerServiceWorker(); // Commented out for development to prevent interference with .wasm files
    showInstallPrompt();
  }, []);

  useEffect(() => {
    // Start or stop analysis based on the current view
    setIsAnalyzing(currentView === 'workout');
  }, [currentView]);

  const handleStartExperience = () => {
    setCurrentView('onboarding');
  };

  const handleOnboardingComplete = (exercise) => {
    if (exercise) {
      setSelectedExercise(exercise);
      setCurrentView('workout');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleWorkoutComplete = (result) => {
    setWorkoutResult(result);
    setCurrentView('workoutComplete');
  };

  const handleContinueFromWorkout = (action) => {
    if (action === 'dashboard') {
      setCurrentView('dashboard');
    } else if (action === 'new-workout') {
      setCurrentView('onboarding');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStartExperience={handleStartExperience} />;
      case 'onboarding':
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
      case 'workout':
        return (
          <>
            <WorkoutMode 
              exercise={selectedExercise} 
              onComplete={handleWorkoutComplete} 
              videoRef={videoRef} 
              canvasRef={canvasRef} 
            />
            <PoseAnalysisComponent 
              modelPath="./yolov11_pose_dog.onnx"
              videoRef={videoRef}
              canvasRef={canvasRef}
              onAnalysisComplete={handleWorkoutComplete}
              isAnalyzing={isAnalyzing}
            />
          </>
        );
      case 'workoutComplete':
        return <WorkoutComplete workoutData={workoutResult} onContinue={handleContinueFromWorkout} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <LandingPage onStartExperience={handleStartExperience} />;
    }
  };

  return (
    <div className="app-container min-h-screen bg-gray-100">
      {renderCurrentView()}
      <button
        id="install-button"
        style={{ display: 'none' }}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-dog-purple to-dog-green text-white rounded-full px-6 py-3 shadow-lg z-50"
      >
        앱 설치하기
      </button>
    </div>
  );
}

export default App;