import React, { useState, useEffect } from 'react';

const TopNavigation = ({ onStartExperience }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine text color based on whether we're scrolled or on a light background
  const textColor = isScrolled ? 'text-gray-800' : 'text-white';
  const buttonBgColor = isScrolled ? 'hover:bg-gray-200' : 'hover:bg-white hover:bg-opacity-30';
  const loginButtonColor = isScrolled ? 'text-white' : 'text-white';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300">
      <div className="container mx-auto px-4">
        <nav className={`${
          isScrolled 
            ? 'bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200' 
            : 'bg-white bg-opacity-30 backdrop-blur-md rounded-2xl shadow-lg border border-white border-opacity-30'
        } transition-all duration-300`}>
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <div className="flex items-center">
              <div className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'} flex items-center`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-dog-purple to-dog-green flex items-center justify-center mr-3">
                  <span className="text-white font-bold">M</span>
                </div>
                <span>MungAI</span>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-1">
              <button className={`px-4 py-2 ${textColor} font-medium ${buttonBgColor} rounded-full transition-all duration-300`}>
                기능
              </button>
              <button className={`px-4 py-2 ${textColor} font-medium ${buttonBgColor} rounded-full transition-all duration-300`}>
                가격
              </button>
              <button className={`px-4 py-2 ${textColor} font-medium ${buttonBgColor} rounded-full transition-all duration-300`}>
                문의
              </button>
              <button 
                className={`bg-gradient-to-r from-dog-purple to-dog-green ${loginButtonColor} px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all duration-300 ml-2`}
                onClick={onStartExperience}
              >
                로그인
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default TopNavigation;