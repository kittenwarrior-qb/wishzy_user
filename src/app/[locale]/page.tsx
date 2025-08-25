import HotListSection from '@/components/pages/home-page/hot-list-section'
import AboutSection from '@/components/pages/home-page/about-section'
import BannerSection from '@/components/pages/home-page/banner-section'
import CategorySection from '@/components/pages/home-page/category-section'
import ContactSection from '@/components/pages/home-page/contact-section'
import ResultSection from '@/components/pages/home-page/result-section'
import SearchSection from '@/components/pages/home-page/search-section'
import TestimonialSection from '@/components/pages/home-page/testimonial-section'
import TutorialSection from '@/components/pages/home-page/tutorial-section'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div>
      <div className="min-h-[650px] bg-neutral/10">
        <div className="max-w-[1280px] mx-auto">
          <SearchSection />
          <BannerSection />
        </div>
      </div>

      <div className='py-10'>
        <div className='mx-auto max-w-[1280px] my-5 pb-3'>
          <p className='font-semibold text-[22px] mb-6'>Khóa Học và Chứng Chỉ</p>
          <p className='font-semibold text-[30px] mb-3'>Nổi bật trên Wishzy</p>
          <p className='text-[18px]'>Khám phá các khóa học được nhiều người biết đến, mọi trình độ</p>
        </div>
        <HotListSection/>

        <div className='flex gap-3 mx-auto max-w-[1280px] my-5'>
          <Button variant="default" className='text-[14px]'>
            Hiển thị thêm
          </Button>
          <Button variant="outline" className='text-[14px]'>
            Xem tất cả
          </Button>
        </div>
      </div>

      <div className='mx-auto max-w-[1280px]'>
        <CategorySection />
      </div>

      <div className='mx-auto max-w-[1280px]'>
        <ResultSection />
      </div>

      <div className='mx-auto max-w-[1280px] mt-10'>
        <AboutSection />
        <ContactSection />
        <TestimonialSection />
        <TutorialSection />
      </div>
    </div>
  )
}
