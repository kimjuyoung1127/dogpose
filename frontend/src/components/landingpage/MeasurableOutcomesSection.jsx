import React from 'react';
import { motion } from 'framer-motion';

const MeasurableOutcomesSection = () => {
  const outcomes = [
    { 
      title: "운동 정확도 25% 향상", 
      description: "AI 코칭을 통한 자세 교정 효과", 
      image: "/placeholder-accuracy-improvement.jpg",
      alt: "운동 정확도 향상",
      icon: "🎯" 
    },
    { 
      title: "뒷다리 근력 15% 강화", 
      description: "특정 운동 프로그램의 임상 결과", 
      image: "/placeholder-muscle-strengthening.jpg",
      alt: "뒷다리 근력 강화",
      icon: "💪" 
    },
    { 
      title: "보행 균형 점수 95점 달성", 
      description: "좌우 비대칭 개선 효과", 
      image: "/placeholder-balance-score.jpg",
      alt: "보행 균형 점수",
      icon: "⚖️" 
    }
  ];

  return (
    <section className="py-16 bg-[#F7FAFC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">측정 가능한 성과</h2>
          <p className="text-lg text-[#2D3748] max-w-2xl mx-auto">
            우리의 솔루션을 통해 실제로 얻을 수 있는 결과를 확인해보세요.
          </p>
        </div>

        <div className="space-y-12">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row-reverse">
                <div className="md:w-1/3 bg-[#F7FAFC] h-64 flex items-center justify-center border border-[#2D3748] border-opacity-20">
                  <div className="text-center">
                    <div className="text-5xl mb-2">{outcome.icon}</div>
                    <p className="text-[#2D3748] text-sm">{outcome.alt}</p>
                  </div>
                </div>
                <div className="md:w-2/3 bg-gradient-to-br from-[#4A69E2] to-[#34D399] p-8 flex flex-col justify-center text-white">
                  <h3 className="text-xl font-bold mb-3">{outcome.title}</h3>
                  <p className="opacity-90 text-opacity-90">{outcome.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeasurableOutcomesSection;