import React from 'react';
import { motion } from 'framer-motion';

const MediaSection = () => {
  const articles = [
    {
      title: "슬개골 탈구 예방을 위한 최고의 홈트레이닝 3가지",
      description: "수의사가 추천하는 간단한 홈 운동법을 AI와 함께 실천해보세요."
    },
    {
      title: "강아지 비만, AI로 탈출하는 방법",
      description: "정확한 분석을 통해 개별 맞춤형 운동을 제공받아보세요."
    },
    {
      title: "AI가 분석하는 강아지 보행 패턴",
      description: "걸음걸이 이상 징후를 조기에 발견하는 방법에 대해 알아보세요."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">블로그 & 미디어</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            유용한 정보와 최신 연구 동향을 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">{article.title}</h3>
              <p className="text-gray-600">{article.description}</p>
              <button className="mt-4 text-dog-purple font-medium hover:underline">
                더 보기 →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;