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
  categories: ["Fashion", "Jewelry", "Sports", "Electronics", "Indoor"],
  shopping: ["Payments", "Delivery options", "Buyer protection"],
  customerCare: [
    "Help center",
    "Terms & Conditions",
    "Privacy policy",
    "Returns & refund",
    "Survey & feedback",
  ],
  pages: ["About Us", "Shop", "Contact Us", "Services", "Blog"],
};

export default function Footer() {
  return (
    <footer className="flex flex-col w-full items-center justify-center gap-4 px-4 sm:px-8 lg:px-16 py-6 bg-white">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8 lg:gap-36 w-full max-w-7xl">
        {/* Logo + Intro */}
        <div className="flex flex-col items-start gap-4 w-full lg:w-auto">
          <Image src={Logo.src || Logo} alt="Logo" width={120} height={40} />

          <p className="w-full lg:w-[388px] text-sm text-black leading-relaxed">
            Welcome to Estrella, where brilliance meets innovation! <br className="hidden sm:block" />
            We are a leading company dedicated to delivering exceptional
            products and services to cater to your needs.
          </p>

          <div className="flex items-center gap-4 text-gray-700">
            <Facebook className="w-6 h-6 hover:text-blue-600 cursor-pointer transition-colors" />
            <Twitter className="w-6 h-6 hover:text-blue-400 cursor-pointer transition-colors" />
            <Instagram className="w-6 h-6 hover:text-pink-600 cursor-pointer transition-colors" />
            <Linkedin className="w-6 h-6 hover:text-blue-700 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-20 w-full lg:w-auto">
          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold text-base text-black mb-2">Categories</h3>
            {footerData.categories.map((category, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-sm md:text-base text-black font-medium hover:text-gray-600 transition-colors cursor-pointer"
              >
                {category}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold text-base text-black mb-2">Shopping</h3>
            {footerData.shopping.map((item, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-sm md:text-base text-black font-medium hover:text-gray-600 transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold text-base text-black mb-2">Customer care</h3>
            {footerData.customerCare.map((item, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-sm md:text-base text-black font-medium hover:text-gray-600 transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold text-base text-black mb-2">Pages</h3>
            {footerData.pages.map((page, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-sm md:text-base text-black font-medium hover:text-gray-600 transition-colors cursor-pointer"
              >
                {page}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Separator className="w-full max-w-7xl" />

      <div className="flex items-center justify-center gap-1 text-[11px] md:text-xs text-black font-medium">
        <Copyright className="w-3 h-3" />
        <span>2025 Estrella Inc. All rights reserved</span>
      </div>
    </footer>
  );
}
