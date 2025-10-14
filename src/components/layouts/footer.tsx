import Image from "next/image";
import Link from "next/link";
import React from "react";

const footerColumns = [
  {
    title: "Khám phá",
    links: ["Khóa học", "Khóa học", "Khóa học", "Khóa học"],
  },
  {
    title: "Chính sách và ưu đãi",
    links: ["Khóa học", "Khóa học", "Khóa học", "Khóa học"],
  },
  {
    title: "Tài liệu",
    links: ["Khóa học", "Khóa học", "Khóa học", "Khóa học"],
  },
  {
    title: "Chúng tôi",
    links: ["Khóa học", "Khóa học", "Khóa học", "Khóa học"],
  },
];

export default function Footer() {
  return (
    <footer className="flex flex-col w-full items-center justify-center gap-4 px-[35px] py-[26px] bg-[#fff5ed]">
      <div className="flex items-start justify-between w-full  max-w-[2400px] ">
        <div className="inline-flex flex-col items-start gap-[18px]">
          <div className="inline-flex items-start gap-[7px]">
            <Link href="/">
              <Image
                alt="Wishzy logo"
                src="/logo/logo_black.png"
                width={100}
                height={45}
              />
            </Link>
          </div>

          <div className="flex flex-col w-[388px] items-start gap-4">
            <p className="[font-family:'Be_Vietnam_Pro-Regular',Helvetica] font-normal text-[#191919] text-sm tracking-[0] leading-[normal]">
              Welcome to Estrella, where brilliance meets innovation! <br />
              We are a leading company dedicated to delivering exceptional
              products and services to cater to your needs.
            </p>
          </div>
        </div>

        <nav className="flex w-[871px] items-start justify-between">
          {footerColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="inline-flex flex-col items-start justify-center gap-2"
            >
              <h3 className="[font-family:'Be_Vietnam_Pro-Bold',Helvetica] font-bold text-[#191919] text-base tracking-[0] leading-[26px] whitespace-nowrap">
                {column.title}
              </h3>

              {column.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href="#"
                  className="[font-family:'Be_Vietnam_Pro-Regular',Helvetica] font-normal text-[#191919] text-sm tracking-[0] leading-[normal] hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
