백엔드 파일
핵심 분석 엔진
backend/main.py - FastAPI 서버, YOLOv8 모델 로딩, 분석 로직, API 엔드포인트 main.py:1-243
backend/models/best.pt - 훈련된 YOLOv8 모델 파일 (17개 관절 키포인트 감지) main.py:60-61
backend/requirements.txt - Python 의존성 패키지 목록
backend/Dockerfile - 백엔드 컨테이너 설정
프론트엔드 파일
분석 페이지
src/pages/tools/PostureAnalysisPage.tsx - 영상 업로드 및 분석 시작 페이지 PostureAnalysisPage.tsx:1-455
기록 관리
src/pages/history/PostureAnalysisHistoryPage.tsx - 분석 기록 목록 페이지 PostureAnalysisHistoryPage.tsx:2-189
src/pages/history/AnalysisDetailView.tsx - 분석 결과 상세 보기 (Canvas 렌더링) AnalysisDetailView.tsx:34-302
src/pages/history/AnalysisDetailModal.tsx - 분석 결과 모달
src/pages/history/LatestAnalysisResultCard.tsx - 최신 분석 결과 카드
src/pages/history/useUserDogs.ts - 사용자 강아지 목록 훅
컴포넌트
src/components/posture-analysis-history/JointAnalysisHistoryList.tsx - 분석 기록 리스트 컴포넌트
src/components/posture-analysis-history/JointAnalysisHistorySkeleton.tsx - 로딩 스켈레톤
src/components/posture-analysis-history/EmptyJointAnalysisHistory.tsx - 빈 상태 컴포넌트
타입 정의
src/types/analysis.ts - 분석 관련 TypeScript 타입 정의 analysis.ts:1-86
훅
src/hooks/useJointAnalysisHistory.ts - 분석 기록 조회 훅
데이터베이스
스키마
supabase/schema.sql - joint_analysis_records 테이블 정의 schema.sql:956-966
에셋
UI 리소스
public/posture/posture-analysis-demo.gif - 사용자 가이드용 데모 GIF
문서
개발 문서
posture_overview/1.md - 프로젝트 개요 및 아키텍처 1.md:1-43
posture_overview/2.md - V4 UX 및 안정성 강화 2.md:1-60
posture_overview/posture_overview2.md - 신뢰도 개선 및 자세 점수 시스템 posture_overview2.md:1-75
Notes
이 파일들은 AI 자세 분석 시스템의 완전한 구현을 포함하고 있습니다. 백엔드는 backend/ 디렉토리에, 프론트엔드는 src/pages/tools/, src/pages/history/, src/components/posture-analysis-history/ 디렉토리에 분산되어 있습니다.

특히 backend/main.py는 전체 분석 로직의 핵심이며, PostureAnalysisPage.tsx와 AnalysisDetailView.tsx는 사용자 인터페이스의 핵심입니다. best.pt 모델 파일은 반드시 포함되어야 하며, Supabase 연동을 위해서는 환경 변수 설정도 필요합니다.