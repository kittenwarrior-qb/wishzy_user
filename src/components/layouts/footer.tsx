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
    <footer className="flex flex-col w-full items-center justify-center gap-4 px-16 py-6 bg-white">
      <div className="flex items-center justify-center gap-36 w-full">
        {/* Logo + Intro */}
        <div className="flex flex-col items-start gap-4">
            <Image src={Logo.src || Logo} alt="Logo" width={120} height={40} />

          <p className="w-[388px] text-sm text-black">
            Welcome to Estrella, where brilliance meets innovation! <br />
            We are a leading company dedicated to delivering exceptional
            products and services to cater to your needs.
          </p>

          <div className="flex items-center gap-4 text-gray-700">
            <Facebook className="w-6 h-6" />
            <Twitter className="w-6 h-6" />
            <Instagram className="w-6 h-6" />
            <Linkedin className="w-6 h-6" />
          </div>
        </div>

        {/* Links */}
        <div className="flex items-start gap-20">
          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold text-base text-black">Categories</h3>
            {footerData.categories.map((category, index) => (
              <div key={index} className="text-base text-black font-medium">
                {category}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold text-base text-black">Shopping</h3>
            {footerData.shopping.map((item, index) => (
              <div key={index} className="text-base text-black font-medium">
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold text-base text-black">Customer care</h3>
            {footerData.customerCare.map((item, index) => (
              <div key={index} className="text-base text-black font-medium">
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold text-base text-black">Pages</h3>
            {footerData.pages.map((page, index) => (
              <div key={index} className="text-base text-black font-medium">
                {page === "Services" ? (
                  <>
                    Services
                    <br />
                    Blog
                  </>
                ) : (
                  page
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="w-full max-w-[1200px]" />

      <div className="flex items-center justify-center gap-1 text-[11px] text-black font-medium">
        <Copyright className="w-3 h-3" />
        <span>2025 Estrella Inc. All rights reserved</span>
      </div>
    </footer>
  );
}
