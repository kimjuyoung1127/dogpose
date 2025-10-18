import React from 'react';
import { motion } from 'framer-motion';

const HeroContentSection = ({ onStartExperience }) => {
  return (
    <div className="relative z-10 w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-dog-purple to-dog-green pt-20">
      <div className="w-full max-w-4xl mx-auto px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main headline */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
          >
            AI로 시작하는 우리 강아지 1:1 <br></br>홈 트레이닝
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-white max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            카메라만 켜면, 수의사가 설계한 운동 프로그램을 AI가 실시간으로 코칭해줘요.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <motion.button
              className="bg-white text-dog-purple font-bold text-lg py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartExperience}
            >
              카메라 켜고 무료로 시작하기 →
            </motion.button>

            <motion.button
              className="bg-transparent border-2 border-white text-white font-bold text-lg py-4 px-8 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              30초 데모 영상 보기
            </motion.button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: '🏥', text: '수의사 협력 개발' },
              { icon: '🔒', text: '데이터는 기기 내에서만 처리' },
              { icon: '⚡', text: '회원가입 불필요' }
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <span className="text-xl mr-2">{badge.icon}</span>
                <span className="font-medium">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroContentSection;