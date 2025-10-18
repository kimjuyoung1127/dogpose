import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('accuracy');
  const [reportsOpen, setReportsOpen] = useState(false);
  
  // Mock data for the dashboard
  const dogProfile = {
    name: "뭉치",
    breed: "래브라도",
    age: 3,
    photo: "https://placekitten.com/200/200" // Using a placeholder for now
  };
  
  const healthScore = 87;
  const trend = 5; // Up by 5 points this week
  
  const recentActivities = [
    {
      id: 1,
      exerciseName: "앉기 → 일어서기",
      date: "2023-05-15",
      reps: 10,
      accuracy: 92,
      duration: 120,
      aiInsight: "왼쪽 다리 근력이 좋아졌어요!",
      skeletonGif: "https://placekitten.com/100/100",
      isPR: true
    },
    {
      id: 2,
      exerciseName: "장애물 점프",
      date: "2023-05-14",
      reps: 8,
      accuracy: 85,
      duration: 180,
      aiInsight: "점프 높이가 10% 향상되었어요",
      skeletonGif: "https://placekitten.com/100/100",
      isPR: false
    },
    {
      id: 3,
      exerciseName: "제자리 걷기",
      date: "2023-05-13",
      reps: 18,
      accuracy: 95,
      duration: 300,
      aiInsight: "보행 패턴이 안정적이에요",
      skeletonGif: "https://placekitten.com/100/100",
      isPR: false
    }
  ];
  
  const chartData = {
    accuracy: [
      { date: '5/1', value: 75 },
      { date: '5/2', value: 78 },
      { date: '5/3', value: 82 },
      { date: '5/4', value: 85 },
      { date: '5/5', value: 83 },
      { date: '5/6', value: 86 },
      { date: '5/7', value: 87 },
    ],
    reps: [
      { date: '5/1', value: 6 },
      { date: '5/2', value: 7 },
      { date: '5/3', value: 8 },
      { date: '5/4', value: 8 },
      { date: '5/5', value: 9 },
      { date: '5/6', value: 9 },
      { date: '5/7', value: 10 },
    ],
    balance: [
      { date: '5/1', value: 70 },
      { date: '5/2', value: 72 },
      { date: '5/3', value: 75 },
      { date: '5/4', value: 78 },
      { date: '5/5', value: 80 },
      { date: '5/6', value: 83 },
      { date: '5/7', value: 85 },
    ]
  };
  
  const achievements = [
    {
      id: 1,
      name: "운동 완료 마스터",
      description: "운동 10회 완료",
      icon: "🏆",
      unlocked: true,
      unlockedAt: "2023-05-10",
      progress: 100
    },
    {
      id: 2,
      name: "정확도 완성",
      description: "90% 이상 정확도 달성",
      icon: "🎯",
      unlocked: true,
      unlockedAt: "2023-05-12",
      progress: 100
    },
    {
      id: 3,
      name: "일일 운동 습관",
      description: "연속 7일 운동 달성",
      icon: " streak",
      unlocked: false,
      progress: 40
    },
    {
      id: 4,
      name: "반려견 건강 지킴이",
      description: "건강 점수 90점 달성",
      icon: "❤️",
      unlocked: false,
      progress: 87
    }
  ];
  
  // Mock data for gait analysis
  const gaitData = [65, 70, 75, 80, 85, 90, 85, 80, 75, 70, 65]; // Simplified
  
  // Mock data for ROM (Range of Motion)
  const romData = [
    { joint: 'hip', left: 85, right: 83 },
    { joint: 'knee', left: 90, right: 88 },
    { joint: 'elbow', left: 95, right: 94 },
    { joint: 'shoulder', left: 92, right: 90 }
  ];
  
  const breedAverage = 78;
  
  // Format date as relative time
  const formatRelativeTime = (dateStr) => {
    return "방금 전"; // Simplified for demo
  };
  
  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };
  
  // Get color based on health score
  const getHealthColor = (score) => {
    if (score >= 90) return '#10B981'; // green
    if (score >= 70) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Card: Dog Profile + Health Score */}
        <motion.div
          className="bg-gradient-to-br from-dog-purple to-dog-green rounded-3xl p-8 text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-24 h-24 rounded-full bg-white bg-opacity-30 p-1 mr-6">
                <img 
                  src={dogProfile.photo} 
                  alt={dogProfile.name} 
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{dogProfile.name}</h1>
                <p className="text-white text-opacity-80">{dogProfile.breed} · {dogProfile.age}살</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeDasharray="283" // 2*π*r ≈ 2*3.14*45
                    strokeDashoffset={283 - (283 * healthScore) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{healthScore}</span>
                  <span className="text-sm">건강 점수</span>
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <span className={`mr-1 ${trend > 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {trend > 0 ? '▲' : '▼'}
                </span>
                <span className="text-sm">
                  이번 주 {trend > 0 ? '+' : ''}{trend} 상승
                </span>
              </div>
            </div>
          </div>
          
          {/* Weekly Story */}
          <div className="mt-8 pt-6 border-t border-white border-opacity-30">
            <h2 className="text-xl font-bold mb-4">뭉치의 이번 주 하이라이트 ✨</h2>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 flex items-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-lg mr-4 flex items-center justify-center text-2xl">
                🏆
              </div>
              <div>
                <h3 className="font-bold">장애물 점프 10회 연속 성공</h3>
                <p className="text-sm">전체 강아지 중 상위 5% 기록이에요!</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Activity Feed */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-4">최근 운동</h2>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <motion.div
                key={activity.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
                  <div className="relative bg-gray-200 rounded-xl h-32 flex items-center justify-center overflow-hidden">
                    <img 
                      src={activity.skeletonGif} 
                      alt="Skeleton" 
                      className="w-full h-full object-cover"
                    />
                    {activity.isPR && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                        🏆 신기록
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="w-full sm:w-3/4 sm:pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{activity.exerciseName}</h3>
                      <p className="text-gray-500 text-sm">{formatRelativeTime(activity.date)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 my-3">
                    <div className="text-center p-2 bg-gray-100 rounded-lg">
                      <div className="text-sm text-gray-500">반복</div>
                      <div className="font-bold">{activity.reps}회</div>
                    </div>
                    <div className="text-center p-2 bg-gray-100 rounded-lg">
                      <div className="text-sm text-gray-500">정확도</div>
                      <div className="font-bold text-green-600">{activity.accuracy}%</div>
                    </div>
                    <div className="text-center p-2 bg-gray-100 rounded-lg">
                      <div className="text-sm text-gray-500">시간</div>
                      <div className="font-bold">{formatTime(activity.duration)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-purple-600 bg-purple-50 rounded-lg p-2">
                    <span className="mr-2">🧠</span>
                    <span>{activity.aiInsight}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Progress Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">30일 진행도</h2>
            <div className="flex space-x-2">
              {['accuracy', 'reps', 'balance'].map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeTab === tab
                      ? 'bg-dog-purple text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'accuracy' && '정확도'}
                  {tab === 'reps' && '반복 횟수'}
                  {tab === 'balance' && '좌우 균형'}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-64 flex items-end space-x-1 md:space-x-2 mb-6">
            {chartData[activeTab].map((point, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <motion.div
                  className="w-full bg-gradient-to-t from-dog-purple to-dog-green rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${(point.value / 100) * 90}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                />
                <div className="text-xs text-gray-500 mt-1">{point.date.split('-')[1]}</div>
              </div>
            ))}
          </div>
          
          {/* Comparison Bar */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">내 강아지</span>
              <span className="font-bold">{healthScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-purple-600 h-4 rounded-full" 
                style={{ width: `${healthScore}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">같은 견종 평균</span>
              <span className="font-bold">{breedAverage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gray-500 h-4 rounded-full" 
                style={{ width: `${breedAverage}%` }}
              ></div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg text-green-800 flex items-center">
              <span className="mr-2">🎉</span>
              <span>평균보다 {healthScore - breedAverage}% 더 우수해요!</span>
            </div>
          </div>
        </motion.div>
        
        {/* Achievements Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4">🏅 달성 배지</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map(badge => (
              <motion.div
                key={badge.id}
                className={`rounded-2xl p-4 ${
                  badge.unlocked 
                    ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-300' 
                    : 'bg-gray-100 border-2 border-gray-200'
                }`}
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-2">{badge.icon}</div>
                  <h3 className="font-bold">{badge.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                  
                  {badge.unlocked ? (
                    <div className="text-xs text-green-600 font-semibold">
                      {new Date(badge.unlockedAt).toLocaleDateString('ko-KR')} 달성
                    </div>
                  ) : (
                    <div className="mt-3">
                      <div className="w-full bg-gray-300 rounded-full h-2 mb-1">
                        <div 
                          className="bg-gradient-to-r from-dog-orange to-dog-green h-2 rounded-full" 
                          style={{ width: `${badge.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600">{badge.progress}% 완료</div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Analysis Reports (Collapsible) */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            className="w-full flex justify-between items-center text-left font-bold text-lg"
            onClick={() => setReportsOpen(!reportsOpen)}
          >
            <span>상세 분석 리포트</span>
            <span>{reportsOpen ? '▲' : '▼'}</span>
          </button>
          
          {reportsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-6"
            >
              {/* Gait Analysis Report */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-3">🐾 보행 패턴 분석</h3>
                
                {/* Gait Heatmap Visualization */}
                <div className="h-40 bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-grid grid-cols-10 gap-1">
                        {gaitData.map((value, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-sm"
                            style={{ backgroundColor: `hsl(120, 80%, ${30 + value * 0.6}%)` }}
                            title={`Step ${index + 1}: ${value}%`}
                          />
                        ))}
                      </div>
                      <div className="text-xs mt-2">보폭 일관성 히트맵</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className={`p-3 rounded-lg ${
                    95 >= 90 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    <span className="font-semibold">✅</span> 좌우 대칭성: 95% (정상 범위)
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-100 text-yellow-800">
                    <span className="font-semibold">⚠️</span> 보폭: 평균보다 10% 짧음
                  </div>
                </div>
              </div>
              
              {/* Range of Motion Report */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-3">🦴 관절 가동 범위 (ROM)</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left">관절</th>
                        <th className="p-2 text-center">왼쪽</th>
                        <th className="p-2 text-center">오른쪽</th>
                        <th className="p-2 text-center">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {romData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-2 font-medium">{item.joint}</td>
                          <td className="p-2 text-center">{item.left}°</td>
                          <td className="p-2 text-center">{item.right}°</td>
                          <td className="p-2 text-center">
                            {Math.abs(item.left - item.right) > 5 
                              ? <span className="text-yellow-600">⚠️ 비대칭</span> 
                              : <span className="text-green-600">✓ 정상</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;