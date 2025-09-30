// src/components/pages/home-page/home-page-client.tsx
"use client";

import { useState, useEffect } from "react";
import BannerSection from "@/components/pages/home-page/banner-section";
import HotListSection from "@/components/pages/home-page/hot-list-section";
import AboutSection from "@/components/pages/home-page/about-section";
import CategorySection from "@/components/pages/home-page/category-section";
import ContactSection from "@/components/pages/home-page/contact-section";
import ResultSection from "@/components/pages/home-page/result-section";
import TestimonialSection from "@/components/pages/home-page/testimonial-section";
import TutorialSection from "@/components/pages/home-page/tutorial-section";

export default function HomePageClient() {
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const toggleInteractiveMode = () => {
    setIsInteractiveMode(prev => !prev);
  };

  useEffect(() => {
    if (isInteractiveMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isInteractiveMode]);

  return (
    <div className="relative">
      <BannerSection
      />
      
      {!isInteractiveMode && (
        <>
          <HotListSection />
          <CategorySection />
          <ResultSection />
          <HotListSection />
          <TestimonialSection />
          <TutorialSection />
          <ContactSection />
          <AboutSection />
        </>
      )}
    </div>
  );
}