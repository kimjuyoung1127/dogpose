import React from 'react';
import { motion } from 'framer-motion';

const NextActions = ({ onContinue }) => {
  return (
    <motion.div
      className="w-full flex flex-col sm:flex-row gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.7 }}
    >
      <motion.button
        className="flex-1 bg-gradient-to-r from-[#4A69E2] to-[#34D399] text-white font-bold py-4 px-6 rounded-full text-lg"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onContinue('dashboard')}
      >
        대시보드에서 상세 분석 보기
      </motion.button>
      
      <motion.button
        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-full text-lg"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onContinue('new-workout')}
      >
        다른 운동 시작하기
      </motion.button>
    </motion.div>
  );
};

export default NextActions;