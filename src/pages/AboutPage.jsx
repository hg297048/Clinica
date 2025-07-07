
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AboutHeader from '@/components/about/AboutHeader';
import HistorySection from '@/components/about/HistorySection';
import MissionVisionValuesSection from '@/components/about/MissionVisionValuesSection';
import TeamPreviewSection from '@/components/about/TeamPreviewSection';
import CtaSection from '@/components/about/CtaSection';

const AboutPage = () => {
  return (
    <div className="pt-24">
      <AboutHeader />
      <HistorySection />
      <MissionVisionValuesSection />
      <TeamPreviewSection />
      <CtaSection />
    </div>
  );
};

export default AboutPage;
