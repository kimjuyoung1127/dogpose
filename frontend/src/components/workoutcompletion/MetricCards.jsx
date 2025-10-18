import React from 'react';
import { motion } from 'framer-motion';

const MetricCards = ({ workoutResults, isPR }) => {
  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
    >
      <motion.div 
        className="bg-gradient-to-br from-[#34D399] to-[#16A34A] rounded-2xl p-6 text-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="text-5xl font-bold mb-2">{workoutResults.accuracy}%</div>
        <div className="text-gray-200 mb-3">정확도</div>
        <div className="text-sm text-green-200">전주 대비 +5%</div>
      </motion.div>
      
      <motion.div 
        className="bg-gradient-to-br from-[#4A69E2] to-[#3B82F6] rounded-2xl p-6 text-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="text-5xl font-bold mb-2">{workoutResults.completedReps}회</div>
        <div className="text-gray-200 mb-3">완료 횟수</div>
        {isPR && (
          <div className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            🏆 신기록!
          </div>
        )}
      </motion.div>
      
      <motion.div 
        className="bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-2xl p-6 text-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="text-5xl font-bold mb-2">{formatTime(workoutResults.duration)}</div>
        <div className="text-gray-200 mb-3">소요 시간</div>
      </motion.div>
    </motion.div>
  );
};

export default MetricCards;