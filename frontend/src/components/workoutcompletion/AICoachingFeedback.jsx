import React from 'react';
import { motion } from 'framer-motion';

const AICoachingFeedback = ({ exerciseId }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-2xl p-6 w-full mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3 }}
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="mr-2">🤖</span> AI 코칭 피드백
      </h2>
      
      <div className="flex items-start bg-gray-700 rounded-xl p-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A69E2] to-[#8B5CF6] flex items-center justify-center text-2xl mr-4 flex-shrink-0">
          🤖
        </div>
        
        <div className="relative flex-1">
          <div className="absolute -top-3 left-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-700"></div>
          <div className="bg-gray-700 rounded-lg p-4 ml-6">
            <p className="mb-2">
              {exerciseId === 'sit-stand'
                ? '뭉치의 왼쪽 뒷다리가 오른쪽보다 20% 약해요.'
                : '뭉치의 자세 정확도가 90% 이상으로 훌륭합니다!'
              }
            </p>
            <p>
              <span className="font-semibold inline-block mr-2">
                {exerciseId === 'sit-stand'
                  ? '"한발 들고 서기" 운동으로 균형을 맞춰보세요!'
                  : '계속 좋은 자세를 유지하고 계세요!'
                }
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AICoachingFeedback;