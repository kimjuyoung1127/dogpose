import React, { useMemo } from 'react';

const SkeletonDetectionStep = ({ onNext, onPrev, analysisResult }) => {
  const skeletonDetected = useMemo(
    () => analysisResult && analysisResult.keypoints_data && analysisResult.keypoints_data.length > 0,
    [analysisResult]
  );

  return (
    <div className="flex flex-col items-center justify-end h-screen text-white p-4">
      <div className="w-full max-w-4xl bg-black bg-opacity-50 backdrop-blur-md p-6 rounded-t-2xl text-center">
        <div
          className={`text-xl font-semibold mb-4 p-4 rounded-lg ${
            skeletonDetected
              ? 'text-green-400 bg-green-900 bg-opacity-30'
              : 'text-yellow-400 bg-yellow-900 bg-opacity-30'
          }`}
        >
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