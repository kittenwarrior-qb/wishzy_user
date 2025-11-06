import { genPageMetadata } from "@/app/seo";
import CartPageClient from "./CartPageClient";

interface PageParams {
  locale: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "vi";

  return genPageMetadata(locale, "Cart", {
    title: locale === "vi" ? "Giỏ hàng - Wishzy" : "Shopping Cart - Wishzy",
    description: locale === "vi" ? "Xem và quản lý các khóa học trong giỏ hàng của bạn" : "View and manage courses in your shopping cart",
  });
}

export default async function CartPage() {
  return <CartPageClient />;
}
