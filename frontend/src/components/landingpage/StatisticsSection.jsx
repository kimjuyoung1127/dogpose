import React from 'react';
import { motion } from 'framer-motion';

const StatisticsSection = () => {
  const stats = [
    { 
      number: "2마리 중 1마리", 
      description: "국내 반려견 2마리 중 1마리는 과체중", 
      image: "/placeholder-dog-overweight.jpg",
      alt: "과체중 강아지"
    },
    { 
      number: "15%", 
      description: "슬개골 탈구, 매년 15%씩 증가", 
      image: "/placeholder-kneecap.jpg", 
      alt: "슬개골 탈구 문제"
    },
    { 
      number: "120만 원", 
      description: "관절 질환 치료 평균 비용", 
      image: "/placeholder-treatment-cost.jpg", 
      alt: "관절 질환 치료 비용"
    }
  ];

  return (
    <section className="py-16 bg-[#F7FAFC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">왜 당신의 강아지에게 필요할까요?</h2>
          <p className="text-lg text-[#2D3748] max-w-2xl mx-auto">
            강아지 건강 문제는 예방이 최선입니다. 데이터로 증명된 현실을 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-[#F7FAFC] h-48 flex items-center justify-center border border-[#2D3748] border-opacity-20">
                <div className="text-center">
                  <div className="text-5xl mb-2">📊</div>
                  <p className="text-[#2D3748] text-sm">{stat.alt}</p>
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#4A69E2] mb-4">
                  {stat.number}
                </div>
                <p className="text-lg text-[#2D3748]">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;