import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CelebrationHero = ({ exerciseName }) => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="text-8xl mb-6"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        🏆
      </motion.div>
      
      <motion.h1 
        className="text-5xl md:text-6xl font-bold mb-6"
        style={{
          background: 'linear-gradient(to right, #FFD700, #FFA500)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        운동 완료!
      </motion.h1>
      
      <motion.p 
        className="text-xl text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {exerciseName} 운동을 완료하셨어요!
      </motion.p>
    </motion.div>
  );
};

export default CelebrationHero;