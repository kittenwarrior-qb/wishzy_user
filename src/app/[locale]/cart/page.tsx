import { genPageMetadata } from "@/app/seo";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface PageParams {
  locale: string;
}

export async function generateMetadata({
  params,
}: {
  params: PageParams | Promise<PageParams>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const locale = resolvedParams.locale || "vi";

  return genPageMetadata(locale, "Cart", {
    title: locale === "vi" ? "Giỏ hàng - Wishzy" : "Shopping Cart - Wishzy",
    description: locale === "vi" ? "Xem và quản lý các khóa học trong giỏ hàng của bạn" : "View and manage courses in your shopping cart",
  });
}

// Mock data for demonstration
const mockCartItems = [
  {
    id: 1,
    title: "Complete React Development Course",
    instructor: "John Doe",
    price: 299000,
    originalPrice: 599000,
    image: "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
    duration: "40 hours",
    lessons: 120,
    quantity: 1,
  },
  {
    id: 2,
    title: "Advanced JavaScript Masterclass",
    instructor: "Jane Smith",
    price: 199000,
    originalPrice: 399000,
    image: "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
    duration: "30 hours",
    lessons: 85,
    quantity: 1,
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Mike Johnson",
    price: 249000,
    originalPrice: 499000,
    image: "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
    duration: "25 hours",
    lessons: 60,
    quantity: 2,
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

export default async function CartPage() {
  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = mockCartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn</h1>
          <p className="text-gray-600">{mockCartItems.length} khóa học trong giỏ hàng</p>
        </div>

        {mockCartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-8">Hãy thêm một số khóa học vào giỏ hàng của bạn</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Khám phá khóa học
            </button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Khóa học đã chọn</h2>
                  <div className="space-y-6">
                    {mockCartItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
                        {/* Course Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={200}
                            height={120}
                            className="w-full sm:w-48 h-32 object-cover rounded-lg"
                          />
                        </div>

                        {/* Course Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-2">Giảng viên: {item.instructor}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                            <span>{item.duration}</span>
                            <span>{item.lessons} bài học</span>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-xl font-bold text-blue-600">
                                {formatPrice(item.price)}
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Quantity Controls */}
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button className="p-2 hover:bg-gray-100 transition-colors">
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                                <button className="p-2 hover:bg-gray-100 transition-colors">
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Remove Button */}
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm sticky top-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm tính:</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Tiết kiệm:</span>
                      <span className="font-medium">-{formatPrice(discount)}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Tổng cộng:</span>
                        <span className="text-blue-600">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                    Thanh toán ngay
                  </button>

                  {/* Continue Shopping */}
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Tiếp tục mua sắm
                  </button>

                  {/* Promo Code */}
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-3">Mã giảm giá</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
