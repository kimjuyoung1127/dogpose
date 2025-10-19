import React from 'react';

const VideoFeed = ({ poseAccuracy, videoRef, canvasRef }) => {
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-contain"
        playsInline
        muted
        autoPlay
      />
      
      {/* Skeleton Overlay Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
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