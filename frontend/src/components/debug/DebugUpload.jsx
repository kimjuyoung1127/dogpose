import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const DebugUpload = forwardRef(({ videoRef, setCameraPermission, onVideoUpload }, ref) => {
  const objectUrlRef = useRef(null);
  const fileInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    click: () => {
      fileInputRef.current.click();
    }
  }));

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file && videoRef.current) {
      const video = videoRef.current;

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      const newUrl = URL.createObjectURL(file);
      objectUrlRef.current = newUrl;

      video.srcObject = null;
      video.src = newUrl;
      video.loop = true;
      video.play();

      setCameraPermission('granted');
      onVideoUpload();
    }
  };

  return (
    <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 100 }}>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        ref={fileInputRef}
        style={{ color: 'white' }}
      />
    </div>
  );
});

export default DebugUpload;