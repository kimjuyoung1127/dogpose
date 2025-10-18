import React from 'react';
import { motion } from 'framer-motion';

const WhoWeHelpSection = () => {
  const targetGroups = [
    {
      title: "소형견 견주",
      description: "작고 소중한 우리 아이, 슬개골이 걱정되시나요?",
      image: "/placeholder-small-dog-owner.jpg",
      alt: "소형견 견주",
      icon: "🐕"
    },
    {
      title: "활동적인 견주",
      description: "강아지와 더 전문적인 운동을 함께 즐기고 싶으신가요?",
      image: "/placeholder-active-dog-owner.jpg",
      alt: "활동적인 견주",
      icon: "🏃‍♂️"
    },
    {
      title: "노령견 견주",
      description: "나이 든 반려견의 기력과 관절 건강이 예전 같지 않나요?",
      image: "/placeholder-senior-dog-owner.jpg",
      alt: "노령견 견주",
      icon: "🐕‍🦺"
    }
  ];

  return (
    <section className="py-16 bg-[#F7FAFC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">이건 바로 내 이야기!</h2>
          <p className="text-lg text-[#2D3748] max-w-2xl mx-auto">
            다양한 강아지와 견주를 위한 맞춤형 솔루션을 제공합니다.
          </p>
        </div>

        <div className="space-y-8">
          {targetGroups.map((group, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-64 bg-[#4A69E2] flex items-center justify-center">
                <div className="text-center z-10 text-white p-4 text-center">
                  <div className="text-5xl mb-2">{group.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{group.title}</h3>
                  <p className="text-[#F0F8FF]">{group.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelpSection;