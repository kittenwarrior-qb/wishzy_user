import HotListSection from "@/components/pages/home-page/hot-list-section";
import AboutSection from "@/components/pages/home-page/about-section";
import BannerSection from "@/components/pages/home-page/banner-section";
import CategorySection from "@/components/pages/home-page/category-section";
import ContactSection from "@/components/pages/home-page/contact-section";
import ResultSection from "@/components/pages/home-page/result-section";
import SearchSection from "@/components/pages/home-page/search-section";
import TestimonialSection from "@/components/pages/home-page/testimonial-section";
import TutorialSection from "@/components/pages/home-page/tutorial-section";
import { genPageMetadata } from "@/app/seo";
import CourseDecision from "@/components/pages/home-page/course-decision-section";

async function fetchBannerImages() {
  // giả sử fetch api
  return [
    "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
    "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
    "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
  ];
}
interface PageParams {
  locale: string;
}

export async function generateMetadata({
  params,
}: {
  params: PageParams | Promise<PageParams>;
}) {
  const images = await fetchBannerImages();
  const resolvedParams = params instanceof Promise ? await params : params;
  const locale = resolvedParams.locale || "vi";

  return genPageMetadata(locale, "HomePage", {
    images,
  });
}

export default async function HomePage() {
  const images = await fetchBannerImages();

  return (
    <div>
      <div className="bg-neutral/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-0 min-h-[650px] sm:min-h-[550px] xs:min-h-[400px] flex flex-col gap-6">
          <SearchSection />
          <BannerSection images={images} />
        </div>
      </div>
      <HotListSection />

      <CategorySection />
      <ResultSection />
      <CourseDecision />
      <TestimonialSection />
      <TutorialSection />
      <ContactSection />
      <AboutSection />
    </div>
  );
}
