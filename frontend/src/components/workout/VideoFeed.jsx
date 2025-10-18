import React from 'react';
import Webcam from 'react-webcam';

const VideoFeed = ({ poseAccuracy, videoRef, canvasRef }) => {
  return (
    <div className="relative w-full h-full">
      <Webcam
        audio={false}
        className="w-full h-full object-cover"
        ref={videoRef}
      />
      
      {/* Skeleton Overlay Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full"
      />
      
      {/* Pose Accuracy Feedback */}
      {poseAccuracy > 90 && (
        <div 
          className="absolute top-0 left-0 w-full h-full border-4 border-green-500 rounded-xl pointer-events-none"
          style={{
            animation: 'pulse-border 2s infinite'
          }}
        />
      )}
    </div>
  );
};

export default VideoFeed;