import React from 'react';
import { motion } from 'framer-motion';

const UseCasesSection = () => {
  const useCases = [
    {
      title: "슬개골 관리 & 재활 운동",
      description: "수의사가 설계한 맞춤 운동으로 관절 주변 근육을 강화하세요.",
      image: "/placeholder-kneecap-exercise.jpg",
      alt: "슬개골 관리 운동",
      icon: "🦴"
    },
    {
      title: "다이어트 & 비만 예방",
      description: "체계적인 칼로리 소모 프로그램으로 건경한 체중을 되찾아주세요.",
      image: "/placeholder-diet-exercise.jpg",
      alt: "다이어트 & 비만 예방",
      icon: "⚖️"
    },
    {
      title: "보행 패턴 분석",
      description: "AI 분석으로 걸음걸이 이상 징후를 조기에 발견하세요.",
      image: "/placeholder-gait-analysis.jpg",
      alt: "보행 패턴 분석",
      icon: "🐾"
    }
  ];

  return (
    <section className="py-16 bg-[#F7FAFC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">AI 코칭으로 해결할 수 있는 문제</h2>
          <p className="text-lg text-[#2D3748] max-w-2xl mx-auto">
            수의사와 함께 개발한 AI가 강아지 건강 문제를 정확하게 분석하고 운동을 코칭합니다.
          </p>
        </div>

        <div className="space-y-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-[#F7FAFC] h-64 flex items-center justify-center border border-[#2D3748] border-opacity-20">
                  <div className="text-center">
                    <div className="text-5xl mb-2">{useCase.icon}</div>
                    <p className="text-gray-600 text-sm">{useCase.alt}</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-[#2D3748] mb-3">{useCase.title}</h3>
                  <p className="text-[#2D3748]">{useCase.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;