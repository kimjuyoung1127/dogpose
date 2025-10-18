import React from 'react';
import { motion } from 'framer-motion';

const ScientificallyValidatedSection = () => {
  const validationItems = [
    {
      title: "서울대학교 수의과대학 공동 연구",
      description: "정확한 분석을 위한 데이터 수집 및 검증",
      image: "/placeholder-seoul-univ.jpg",
      alt: "서울대학교 수의과대학",
      icon: "🔬"
    },
    {
      title: "논문 기반 분석 알고리즘",
      description: "특허 출원 중인 기술로 개발된 정확한 분석 엔진",
      image: "/placeholder-research-paper.jpg",
      alt: "논문 기반 알고리즘",
      icon: "📄"
    },
    {
      title: "반려견 3,000마리의 모션 데이터 학습 완료",
      description: "다양한 품종과 크기의 강아지 데이터로 학습된 AI 모델",
      image: "/placeholder-dog-data.jpg",
      alt: "모션 데이터 학습",
      icon: "🐕"
    }
  ];

  return (
    <section className="py-16 bg-[#F7FAFC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">과학적으로 검증된 정확도</h2>
          <p className="text-lg text-[#2D3748] max-w-2xl mx-auto">
            전문가들의 연구와 검증을 바탕으로 개발된 정확한 분석 기술
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {validationItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#F7FAFC] rounded-2xl overflow-hidden h-64 flex items-center justify-center border border-[#2D3748] border-opacity-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-center p-4">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-[#2D3748] font-bold">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScientificallyValidatedSection;