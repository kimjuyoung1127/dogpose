import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackLayer = ({ poseAccuracy, criticalErrors, feedbackMessage, currentReps, targetReps, progress }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-4 pointer-events-none">
      {/* Progress Bar - Top */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-700 pointer-events-auto">
        <motion.div
          className="h-full bg-gradient-to-r from-[#F9A826] to-[#34D399]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Critical Errors - Top Center */}
      <AnimatePresence>
        {criticalErrors.map((error, index) => (
          <motion.div
            key={index}
            className="absolute top-4 bg-red-600 bg-opacity-80 text-white p-3 rounded-lg text-sm font-bold z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              <span>{error.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-4">
        {/* Rep Counter */}
        <motion.div
          className="text-6xl font-bold text-white mb-2 drop-shadow-lg"
          animate={{ scale: currentReps % 2 === 0 ? 1 : 1.05 }}
          transition={{ duration: 0.5 }}
        >
          {currentReps} / {targetReps}
        </motion.div>

        {/* Feedback Message */}
        <motion.div
          className="bg-black bg-opacity-60 rounded-full px-5 py-2 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {feedbackMessage}
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackLayer;