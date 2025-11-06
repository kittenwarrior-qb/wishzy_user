import { genPageMetadata } from "@/app/seo";
import OrderPageClient from "./OrderPageClient";

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

  return genPageMetadata(locale, "Order", {
    title: locale === "vi" ? "Đặt hàng - Wishzy" : "Order - Wishzy",
    description: locale === "vi" ? "Hoàn tất đơn hàng và thanh toán" : "Complete your order and payment",
  });
}

export default async function OrderPage() {
  return <OrderPageClient />;
}
