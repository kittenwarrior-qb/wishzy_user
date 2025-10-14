"use client";

import AdSection from "@/components/pages/home-page/ad-section";
import BannerSection from "@/components/pages/home-page/banner-section";
import CategorySection from "@/components/pages/home-page/category-section";
import HotListSection from "@/components/pages/home-page/hot-list-section";
import AboutSection from "@/components/pages/home-page/about-section";
import GradeSection from "@/components/pages/home-page/grade-section";
import ContactSection from "@/components/pages/home-page/contact-section";
import ResultSection from "@/components/pages/home-page/result-section";
import TestimonialSection from "@/components/pages/home-page/instructors";
import TutorialSection from "@/components/pages/home-page/tutorial-section";

export default function HomePageClient() {
  return (
        <>
        <AdSection/>
        <BannerSection/>
        <CategorySection/>
          <HotListSection />
          {/* <GradeSection />
          <ResultSection />
          <HotListSection />
          <TestimonialSection />
          <TutorialSection />
          <ContactSection />
          <AboutSection /> */}
        </>
  );
}