import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackLayer = ({ poseAccuracy, criticalErrors, feedbackMessage, currentReps, targetReps, progress }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between pt-10 pb-40 px-4 pointer-events-none">
      {/* Critical Errors */}
      <AnimatePresence>
        {criticalErrors.map((error, index) => (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 bg-opacity-90 text-white p-4 rounded-xl text-lg font-bold z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-2">⚠️</span>
              <span>{error.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Rep Counter - Center */}
      <motion.div 
        className="text-7xl font-bold text-white mb-4 drop-shadow-lg"
        animate={{ scale: currentReps % 2 === 0 ? 1 : 1.1 }}
        transition={{ duration: 0.5 }}
      >
        {currentReps} / {targetReps}
      </motion.div>
      
      {/* Feedback Message */}
      <motion.div
        className="bg-black bg-opacity-50 rounded-full px-6 py-3 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {feedbackMessage}
      </motion.div>
      
      {/* Progress Bar - Top */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-700 pointer-events-auto">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#F9A826] to-[#34D399]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default FeedbackLayer;