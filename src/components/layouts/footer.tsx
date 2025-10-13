import { Separator } from "@/components/ui/separator";
import {
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import React from "react";
import Logo from "@/assets/wishzy-logo.png";
import Image from "next/image";

const footerData = {
  categories: ["Thời trang", "Trang sức", "Thể thao", "Điện tử", "Nội thất"],
  shopping: ["Thanh toán", "Tùy chọn giao hàng", "Bảo vệ người mua"],
  customerCare: [
    "Trung tâm trợ giúp",
    "Điều khoản & Điều kiện",
    "Chính sách bảo mật",
    "Đổi trả & hoàn tiền",
    "Khảo sát & phản hồi",
  ],
  pages: ["Về chúng tôi", "Cửa hàng", "Liên hệ", "Dịch vụ", "Blog"],
};

export default function Footer() {
  return (
    <footer className="flex flex-col w-full items-center justify-center gap-6 px-4 sm:px-6 lg:px-8 py-8 bg-white border-t border-gray-200 mt-20">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16 w-full max-w-7xl">
        {/* Logo + Intro */}
        <div className="flex flex-col items-start gap-4 w-full lg:w-80">
          <Image src={Logo.src || Logo} alt="Logo" width={120} height={40} />

          <p className="w-full text-sm leading-relaxed text-gray-700">
            Chào mừng đến với Wishzy, nơi tài năng gặp gỡ sự đổi mới! 
            Chúng tôi là công ty hàng đầu chuyên cung cấp các khóa học và dịch vụ 
            giáo dục chất lượng cao để đáp ứng nhu cầu học tập của bạn.
          </p>

          <div className="flex items-center gap-4 text-gray-600">
            <Facebook className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 hover:text-pink-600 cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 hover:text-blue-700 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full lg:w-auto">
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-sm text-gray-900 mb-2">Danh mục</h3>
            {footerData.categories.map((category, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {category}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3">
            <h3 className="text-sm text-gray-900 mb-2">Mua sắm</h3>
            {footerData.shopping.map((item, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3">
            <h3 className="text-sm text-gray-900 mb-2">Chăm sóc khách hàng</h3>
            {footerData.customerCare.map((item, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3">
            <h3 className="text-sm text-gray-900 mb-2">Trang</h3>
            {footerData.pages.map((page, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {page}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Separator and Copyright */}
      <div className="w-full max-w-7xl">
        <Separator className="mb-4" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Copyright className="w-4 h-4" />
            <span className="text-sm">2024 Wishzy. Tất cả quyền được bảo lưu.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}