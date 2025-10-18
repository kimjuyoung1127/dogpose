import React from 'react';

const FooterSection = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">DogPose</h3>
            <p className="text-gray-400">
              AI를 활용한 반려견 운동 분석 및 코칭 서비스
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">서비스</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">운동 분석</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">코칭 프로그램</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">건강 리포트</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">지원</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">고객센터</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">문의하기</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">자주 묻는 질문</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">뉴스레터</h4>
            <p className="text-gray-400 mb-3">최신 정보를 받아보세요</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="이메일 주소" 
                className="px-4 py-2 rounded-l-lg w-full text-gray-800"
              />
              <button className="bg-dog-purple text-white px-4 py-2 rounded-r-lg">
                구독
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2023 DogPose. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">채용</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;