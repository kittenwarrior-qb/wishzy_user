import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ListChecks, Tv, Volume2 } from "lucide-react";
import React from "react";

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
      <div className="flex items-center gap-[25px] w-full  max-w-[2400px] ">
        <div className="flex-1 h-[285px] rounded-[20px] bg-gray-400" />

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