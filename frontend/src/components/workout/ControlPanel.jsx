import React from 'react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const ControlPanel = ({
  elapsedTime,
  exercise,
  isPaused,
  togglePause,
  skipExercise,
  endWorkout,
  criticalErrors,
  setCriticalErrors
}) => {
  const shouldShowSkipModal = criticalErrors.some(error => error.message.includes('운동을 건너뛰었'));

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-black bg-opacity-50 backdrop-blur-md p-4 flex flex-col items-center justify-between rounded-t-2xl">
      <div className="w-full flex justify-between items-center">
        {/* Timer */}
        <div className="text-3xl font-bold">
          {formatTime(elapsedTime)}
        </div>

        {/* Next Exercise Preview */}
        <div className="text-center">
          <div className="text-sm text-gray-400">다음 동작</div>
          <div className="text-lg font-semibold">
            {exercise?.name || '준비 운동'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-8">
        <button
          className="w-16 h-16 rounded-full bg-gray-700 bg-opacity-70 flex items-center justify-center text-2xl"
          onClick={skipExercise}
        >
          ⏭️
        </button>

        <button
          className="w-20 h-20 rounded-full bg-gradient-to-r from-[#F9A826] to-[#34D399] flex items-center justify-center text-3xl"
          onClick={togglePause}
        >
          {isPaused ? '▶️' : '⏸️'}
        </button>

        <button
          className="w-16 h-16 rounded-full bg-red-600 bg-opacity-70 flex items-center justify-center text-2xl"
          onClick={endWorkout}
        >
          ❌
        </button>
      </div>

      {/* Skip Confirmation Modal */}
      {shouldShowSkipModal && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
          <div className="bg-gray-800 p-8 rounded-2xl text-center max-w-xs">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold mb-4">운동을 건너뛰시겠습니까?</h3>
            <div className="flex justify-between">
              <button
                className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={() => setCriticalErrors([])}
              >
                취소
              </button>
              <button
                className="bg-gradient-to-r from-[#F9A826] to-[#34D399] text-white py-2 px-4 rounded-lg"
                onClick={() => {
                  setCriticalErrors([]);
                  // Navigate to next exercise in real app
                }}
              >
                건너뛰기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;