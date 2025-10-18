import React from 'react';
import { motion } from 'framer-motion';

const TrustedBySection = () => {
  const partners = [
    '서울대학교 동물병원',
    '펫프렌즈',
    '핏펫',
    '네이처의샘',
    '하림펫푸드',
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">신뢰할 수 있는 파트너</h2>
          <p className="text-lg text-gray-600">함께하는 브랜드</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="text-2xl font-bold text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;