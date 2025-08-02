import HotListSection from '@/components/pages/home-page/hot-list-section'
import AboutSection from '@/components/pages/home-page/about-section'
import BannerSection from '@/components/pages/home-page/banner-section'
import CategorySection from '@/components/pages/home-page/category-section'
import ContactSection from '@/components/pages/home-page/contact-section'
import ResultSection from '@/components/pages/home-page/result-section'
import SearchSection from '@/components/pages/home-page/search-section'
import TestimonialSection from '@/components/pages/home-page/testimonial-section'
import TutorialSection from '@/components/pages/home-page/tutorial-section'

export default function HomePage() {
  return (
    <div>
      <div className="min-h-[650px] bg-neutral/10">
        <div className="max-w-[1280px] mx-auto">
          <SearchSection />
          <BannerSection />
        </div>
      </div>

      <HotListSection/>
      {/* <CourselistSection /> */}
      <CategorySection />
      <AboutSection />
      <ContactSection />
      <ResultSection />
      <TestimonialSection />
      <TutorialSection />
    </div>
  )
}
