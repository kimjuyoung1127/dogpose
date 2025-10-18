import React, { useState, useEffect, useRef } from 'react';
import VideoFeed from './VideoFeed';
import FeedbackLayer from './FeedbackLayer';
import ControlPanel from './ControlPanel';

const WorkoutMode = ({ exercise, onComplete, videoRef, canvasRef }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentReps, setCurrentReps] = useState(0);
  const [targetReps, setTargetReps] = useState(10); // Default target
  const [isPaused, setIsPaused] = useState(false);
  const [poseAccuracy, setPoseAccuracy] = useState(95); // Simulated accuracy
  const [feedbackMessage, setFeedbackMessage] = useState('좋은 자세예요!');
  const [criticalErrors, setCriticalErrors] = useState([]);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  // Set target reps based on exercise
  useEffect(() => {
    if (exercise) {
      switch (exercise.id) {
        case 'sit-stand':
          setTargetReps(10);
          break;
        case 'jump':
          setTargetReps(8);
          break;
        case 'walk':
          setTargetReps(20); // steps
          break;
        default:
          setTargetReps(10);
      }
    }
  }, [exercise]);

  // Timer effect
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  // Simulate pose feedback
  useEffect(() => {
    const feedbackInterval = setInterval(() => {
      // Simulate random feedback
      const feedbacks = [
        { message: '좋은 자세예요!', type: 'positive' },
        { message: '등을 더 폅펴 주세요', type: 'correction' },
        { message: '오른쪽 다리를 더 앞으로!', type: 'correction' },
        { message: '안정적인 자세네요', type: 'positive' }
      ];

      const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
      setFeedbackMessage(randomFeedback.message);

      // Set accuracy based on feedback type
      setPoseAccuracy(randomFeedback.type === 'positive' ? 90 + Math.random() * 10 : 70 + Math.random() * 20);

      // Simulate critical errors occasionally
      if (randomFeedback.type === 'correction' && Math.random() > 0.7) {
        setCriticalErrors([{
          message: '엉덩이를 10도 더 낮춰주세요',
          audioFile: null
        }]);
      } else {
        setCriticalErrors([]);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(feedbackInterval);
  }, []);

  // Simulate rep counting
  useEffect(() => {
    if (currentReps < targetReps) {
      const repInterval = setInterval(() => {
        if (Math.random() > 0.7) { // Randomly simulate a rep completion
          setCurrentReps(prev => Math.min(prev + 1, targetReps));
          setProgress((currentReps + 1) / targetReps * 100);
        }
      }, 3000);

      return () => clearInterval(repInterval);
    }
  }, [currentReps, targetReps]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const endWorkout = () => {
    onComplete({
      reps: currentReps,
      time: elapsedTime,
      accuracy: poseAccuracy,
      exercise: exercise
    });
  };

  const skipExercise = () => {
    // In a real app, this would go to the next exercise
    setCriticalErrors([{ message: '운동을 건너뛰었어요', audioFile: null }]);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Section */}
      <div className="relative w-full h-full">
        <VideoFeed poseAccuracy={poseAccuracy} videoRef={videoRef} canvasRef={canvasRef} />
        <FeedbackLayer
          poseAccuracy={poseAccuracy}
          criticalErrors={criticalErrors}
          feedbackMessage={feedbackMessage}
          currentReps={currentReps}
          targetReps={targetReps}
          progress={progress}
        />
      </div>

      {/* Control Panel */}
      <ControlPanel
        elapsedTime={elapsedTime}
        exercise={exercise}
        isPaused={isPaused}
        togglePause={togglePause}
        skipExercise={skipExercise}
        endWorkout={endWorkout}
        criticalErrors={criticalErrors}
        setCriticalErrors={setCriticalErrors}
      />
    </div>
  );
};

export default WorkoutMode;