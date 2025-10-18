import React, { useEffect } from 'react';

const WebcamSetupStep = ({ onNext, onPrev, cameraPermission, setCameraPermission, videoRef, onUploadClick }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="text-center max-w-2xl bg-black bg-opacity-50 p-8 rounded-lg">
        <div className="text-8xl mb-8 animate-pulse">🐶</div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6">뭉치를 화면에 넣어주세요</h2>
        
        <div className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl">
          {cameraPermission === 'denied' ? (
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">카메라 접근이 필요해요</h3>
              <p className="mb-4">
                브라우저 설정에서 이 사이트의 카메라 사용을 허용해주세요.
              </p>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
                onClick={() => window.location.reload()}
              >
                다시 시도
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 bg-gray-700 rounded-xl overflow-hidden border-4 border-dashed border-blue-500 flex items-center justify-center mb-4 relative">
                {/* Video stream is now handled by parent, show visual indication */}
                {cameraPermission === 'granted' ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="text-center text-white text-sm">
                      <div className="text-2xl mb-2">📷</div>
                      <p>카메라 연결됨</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    카메라 접근을 기다리는 중...
                  </div>
                )}
              </div>
              
              <p className="text-lg mb-2">
                {cameraPermission === 'granted' 
                  ? '카메라가 성공적으로 연결되었습니다!' 
                  : '카메라 접근을 기다리는 중...'}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg"
            onClick={onPrev}
          >
            이전
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg"
            onClick={onUploadClick}
          >
            영상 업로드
          </button>
          <button
            className={`font-bold py-3 px-8 rounded-full text-lg ${
              cameraPermission === 'granted'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            disabled={cameraPermission !== 'granted'}
            onClick={onNext}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebcamSetupStep;