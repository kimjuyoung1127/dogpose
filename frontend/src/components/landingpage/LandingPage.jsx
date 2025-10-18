import React from 'react';
import TopNavigation from './TopNavigation';
import HeroSection from './HeroSection';
import HeroContentSection from './HeroContentSection';
import StatisticsSection from './StatisticsSection';
import UseCasesSection from './UseCasesSection';
import WhoWeHelpSection from './WhoWeHelpSection';
import MeasurableOutcomesSection from './MeasurableOutcomesSection';
import ScientificallyValidatedSection from './ScientificallyValidatedSection';
import ComparisonSection from './ComparisonSection';
import ActionSection from './ActionSection';
import TrustedBySection from './TrustedBySection';
import MediaSection from './MediaSection';
import FooterSection from './FooterSection';

const LandingPage = ({ onStartExperience }) => {
  return (
    <div className="landing-page relative">
      <TopNavigation onStartExperience={onStartExperience} />
      <HeroSection />
      <HeroContentSection onStartExperience={onStartExperience} />
      <StatisticsSection />
      <UseCasesSection />
      <WhoWeHelpSection />
      <MeasurableOutcomesSection />
      <ScientificallyValidatedSection />
      <ComparisonSection />
      <ActionSection onStartExperience={onStartExperience} />
      <TrustedBySection />
      <MediaSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;