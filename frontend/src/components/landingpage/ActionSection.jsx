import React from 'react';
import { motion } from 'framer-motion';

const ActionSection = ({ onStartExperience }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-dog-purple to-dog-green">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">지금 바로 경험해보세요</h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            1분 안에 강아지 운동 분석을 시작할 수 있습니다. 복잡한 절차 없이 데모 영상을 통해 확인해보세요.
          </p>
          
          <motion.button
            className="bg-white text-dog-purple font-bold text-xl py-5 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartExperience}
          >
            지금 바로 경험해보세요 →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ActionSection;