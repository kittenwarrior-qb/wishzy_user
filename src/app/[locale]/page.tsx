import HomePageClient from "@/components/pages/home-page/home-page-client";
import { genPageMetadata } from "@/app/seo";

async function fetchBannerImages() {
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
  params: Promise<PageParams>;
}) {
  const images = await fetchBannerImages();
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "vi";

  return genPageMetadata(locale, "HomePage", {
    images,
  });
}

export default function HomePage() {
  return <HomePageClient />;
}