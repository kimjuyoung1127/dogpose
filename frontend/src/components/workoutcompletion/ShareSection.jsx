import React from 'react';
import { motion } from 'framer-motion';

const ShareSection = () => {
  return (
    <motion.div
      className="w-full mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">공유하기</h2>
      
      <div className="flex justify-center space-x-6">
        <motion.button
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          📷
        </motion.button>
        
        <motion.button
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F9A826] to-[#EF4444] flex items-center justify-center text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          💬
        </motion.button>
        
        <motion.button
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          💼
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ShareSection;