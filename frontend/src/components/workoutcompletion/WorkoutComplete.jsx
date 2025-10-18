import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CelebrationHero from './CelebrationHero';
import MetricCards from './MetricCards';
import AICoachingFeedback from './AICoachingFeedback';
import ShareSection from './ShareSection';
import NextActions from './NextActions';

const WorkoutComplete = ({ workoutData, onContinue }) => {
  const [showCelebration, setShowCelebration] = useState(true);
  const [isPR, setIsPR] = useState(false);
  
  // Simulate workout completion data if not provided
  const workoutResults = workoutData || {
    accuracy: 88,
    completedReps: 10,
    duration: 180,
    exercise: {
      name: "앉기 → 일어서기",
      id: "sit-stand"
    }
  };
  
  // Check if this is a personal record
  useEffect(() => {
    // In a real app, this would check against stored personal records
    setIsPR(workoutResults.accuracy > 90 || workoutResults.completedReps >= 10);
  }, [workoutResults]);

  // Simulate celebration effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 3000); // Celebration effect for 3 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 flex flex-col">
      {/* Celebration Effect */}
      {showCelebration && (
        <motion.div
          className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-8xl">🎉</div>
        </motion.div>
      )}
      
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <CelebrationHero exerciseName={workoutResults.exercise?.name} />
        <MetricCards workoutResults={workoutResults} isPR={isPR} />
        <AICoachingFeedback exerciseId={workoutResults.exercise?.id} />
        <ShareSection />
        <NextActions onContinue={onContinue} />
      </div>
      
      {/* Footer */}
      <motion.footer
        className="py-6 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p>뭉치의 건강한 하루를 위해, 매일 10분 운동!</p>
      </motion.footer>
    </div>
  );
};

export default WorkoutComplete;