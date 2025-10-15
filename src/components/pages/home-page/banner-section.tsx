import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ListChecks, Tv, Volume2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const bannerData = {
  // image hiện đang rỗng, gây ra lỗi
  image: "",
  title: "Banner Khuyến Mãi",
  alt: "Wishzy Banner"
};

const features = [
  {
    icon: ListChecks,
    text: "Hơn 10+ triệu khóa học",
  },
  {
    icon: BookOpen,
    text: "Giảng viên cao cấp",
  },
  {
    icon: Tv,
    text: "Từ cơ bản tới nâng cao",
  },
  {
    icon: Volume2,
    text: "Hỗ trợ và thảo luận forum",
  },
];

export default function Banner() {
  return (
    <section className="flex h-auto items-center justify-center gap-[51px] px-[35px] py-8 bg-[#fff5ed]">
      <div className="flex items-center gap-[25px] w-full max-w-[2400px] ">
        <div className="flex-1 h-[285px] rounded-[20px] relative overflow-hidden bg-black">
          {bannerData.image && (
            <Image
              src={bannerData.image}
              alt={bannerData.alt}
              fill
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 flex top-10 left-10">
            <div className=" text-white">
              <h1 className="text-4xl font-bold mb-2">NHẬN ƯU ĐÃI KHI MUA<br/> KHÓA HỌC</h1>
              <p className="text-xl mb-1">tới 2/2026</p>
              <p className="text-2xl font-semibold">Học ngay hôm nay nhé</p>
            </div>
          </div>
        </div>

        <Card className="w-[297px] bg-white rounded-[20px] border border-gray-1 shadow-none">
          <CardContent className="flex flex-col items-start gap-3.5 p-8">
            <div className="flex flex-col items-start">
              <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-xs tracking-[0] leading-[18px]">
                Chỉ từ
              </p>

              <div className="flex items-center">
                <h2 className="[font-family:'Inter-Bold',Helvetica] font-bold text-lg leading-[27px] text-black tracking-[0]">
                  200.000đ
                </h2>
                <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-xs tracking-[0] leading-[18px]">
                  /khóa học
                </span>
              </div>
            </div>

            <ul className="flex flex-col items-start gap-px">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <li key={index} className="flex items-center gap-[21px]">
                    <div className="w-6 h-[26.34px] flex items-center justify-center">
                      <IconComponent className="w-[18px] h-[18px] text-black" />
                    </div>
                    <span className="[font-family:'Be_Vietnam_Pro-Regular',Helvetica] font-normal text-en-nht text-base tracking-[0] leading-6 whitespace-nowrap">
                      {feature.text}
                    </span>
                  </li>
                );
              })}
            </ul>

            <Button className="h-10 w-full bg-[#ffa500] hover:bg-[#ff9500] text-black rounded-[5px] [font-family:'Be_Vietnam_Pro-Medium',Helvetica] font-medium text-base leading-6">
              Khám phá khóa học
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}