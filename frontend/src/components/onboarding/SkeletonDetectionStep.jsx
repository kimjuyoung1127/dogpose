import React, { useEffect, useMemo } from 'react';
import Webcam from 'react-webcam';

const SkeletonDetectionStep = ({ onNext, onPrev, videoRef, canvasRef, analysisResult }) => {

  const skeletonDetected = useMemo(() => 
    analysisResult && analysisResult.keypoints_data && analysisResult.keypoints_data.length > 0
  , [analysisResult]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="text-center max-w-4xl w-full bg-black bg-opacity-30 p-8 rounded-lg">
        <div className="relative w-full h-96 md:h-[500px] mx-auto bg-gray-800 rounded-2xl overflow-hidden border-4 border-white mb-8">
        {/* Video and canvas are now handled by parent component */}
        {!skeletonDetected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
            <div className="text-center text-white">
              <p className="text-lg"> 스켈레톤 탐지 중...</p>
              <p className="text-sm mt-2">카메라에 강아지의 전체 모습이 나오게 해주세요</p>
            </div>
          </div>
        )}
      </div>
        
        <div className={`text-xl font-semibold mb-6 p-4 rounded-lg ${
          skeletonDetected ? 'text-green-400 bg-green-900 bg-opacity-30' : 'text-yellow-400 bg-yellow-900 bg-opacity-30'
        }`}>
          {skeletonDetected 
            ? '✅ 뭉치를 찾았어요! 이제 운동을 시작할 준비 완료!' 
            : '🔍 뭉치를 찾는 중... 카메라에 강아지의 전체 모습이 나오게 해주세요'}
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg"
            onClick={onPrev}
          >
            이전
          </button>
          <button
            className={`font-bold py-3 px-8 rounded-full text-lg ${
              skeletonDetected
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!skeletonDetected}
            onClick={onNext}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetectionStep;