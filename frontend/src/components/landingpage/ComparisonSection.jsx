import React from 'react';
import { motion } from 'framer-motion';

const ComparisonSection = () => {
  const features = [
    {
      name: "실시간 피드백",
      ourService: true,
      hospital: false,
      youtube: false
    },
    {
      name: "데이터 기반 분석",
      ourService: true,
      hospital: true,
      youtube: false
    },
    {
      name: "비용 합리성",
      ourService: true,
      hospital: false,
      youtube: true
    },
    {
      name: "시간과 장소의 자유",
      ourService: true,
      hospital: false,
      youtube: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">우리 서비스는 다르다</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            다른 방법과 비교해보세요. DogPose는 최고의 솔루션입니다.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-6 text-left font-semibold text-gray-700">기능</th>
                <th className="py-4 px-6 text-center font-semibold text-gray-700">우리 서비스</th>
                <th className="py-4 px-6 text-center font-semibold text-gray-700">동물병원</th>
                <th className="py-4 px-6 text-center font-semibold text-gray-700">유튜브 영상</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <motion.tr 
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="py-4 px-6 font-medium text-gray-800">{feature.name}</td>
                  <td className="py-4 px-6 text-center">
                    {feature.ourService ? (
                      <span className="text-green-500 text-2xl">✅</span>
                    ) : (
                      <span className="text-red-500 text-2xl">❌</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {feature.hospital ? (
                      <span className="text-green-500 text-2xl">✅</span>
                    ) : (
                      <span className="text-red-500 text-2xl">❌</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {feature.youtube ? (
                      <span className="text-green-500 text-2xl">✅</span>
                    ) : (
                      <span className="text-red-500 text-2xl">❌</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;