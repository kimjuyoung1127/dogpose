import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-screen video holder that extends under navigation */}
      <div className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          {/* Video placeholder - Replace with actual video element later */}
          <div className="text-center">
            <div className="text-6xl mb-4">🎥</div>
            <p className="text-xl text-white">Full-screen video content</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;