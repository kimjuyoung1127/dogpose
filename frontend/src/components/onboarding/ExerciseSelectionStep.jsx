import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ExerciseSelectionStep = ({ onNext, onPrev, onComplete }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const exercises = [
    {
      id: "sit-stand",
      name: "앉기 → 일어서기",
      icon: "🪑",
      difficulty: "초급",
      duration: "2분",
      benefits: "뒷다리 근력 강화",
      color: "from-blue-500 to-blue-700"
    },
    {
      id: "jump",
      name: "장애물 점프",
      icon: "🦘",
      difficulty: "중급",
      duration: "3분",
      benefits: "순발력 & 균형감",
      color: "from-green-500 to-green-700"
    },
    {
      id: "walk",
      name: "제자리 걷기",
      icon: "🐾",
      difficulty: "초급",
      duration: "5분",
      benefits: "보행 패턴 분석",
      color: "from-purple-500 to-purple-700"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="text-center max-w-4xl w-full bg-black bg-opacity-30 p-8 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">첫 운동을 선택해보세요!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              className={`rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 ${
                selectedExercise === exercise.id 
                  ? 'ring-4 ring-yellow-400 scale-105' 
                  : 'hover:scale-105'
              }`}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedExercise(exercise.id)}
            >
              <div className={`h-48 bg-gradient-to-br ${exercise.color} flex flex-col items-center justify-center p-6`}>
                <div className="text-6xl mb-2">{exercise.icon}</div>
                <h3 className="text-xl font-bold">{exercise.name}</h3>
              </div>
              <div className="bg-gray-800 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    exercise.difficulty === '초급' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white'
                  }`}>
                    {exercise.difficulty}
                  </span>
                  <span className="text-gray-300">{exercise.duration}</span>
                </div>
                <p className="text-gray-300 text-sm">{exercise.benefits}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg"
            onClick={onPrev}
          >
            이전
          </button>
          <button
            className={`font-bold py-3 px-8 rounded-full text-lg ${
              selectedExercise
                ? 'bg-gradient-to-r from-[#F9A826] to-[#34D399] text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedExercise}
            onClick={onNext}
          >
            {selectedExercise ? '운동 시작하기' : '운동을 선택해주세요'}
          </button>
          <button
            className="text-gray-400 hover:text-white font-medium py-3 px-6 text-lg"
            onClick={() => onComplete(null)}
          >
            건너뛰기 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseSelectionStep;