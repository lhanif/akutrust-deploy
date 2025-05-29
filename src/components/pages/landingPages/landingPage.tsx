"use client";
import React from 'react';
import { HeroSection } from '@/components/pages/landingPages/heroSection';
import { PartnershipSection } from '@/components/pages/landingPages/partnershipSection';
import { FeaturesSection } from '@/components/pages/landingPages/featuresSection';

export  function LandingPage() {
  return (
    <>
      <HeroSection />
      <div id="partner-section">
        <PartnershipSection />
      </div>
      <div id="features-section">
        <FeaturesSection />
      </div>
    </>
  );
}

export default LandingPage;