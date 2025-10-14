import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeftCircle } from "lucide-react";
import React from "react";

const teachersData = [
  { id: 1, name: "Cô A" },
  { id: 2, name: "Cô A" },
  { id: 3, name: "Cô A" },
  { id: 4, name: "Cô A" },
  { id: 5, name: "Cô A" },
  { id: 6, name: "Cô A" },
  { id: 7, name: "Cô A" },
  { id: 8, name: "Cô A" },
];

const Property = () => {
  return (
    <section className="w-full max-w-[1280px] gap-3.5 px-[35px] py-0 flex flex-col items-start relative">
      <header className="flex justify-between self-stretch w-full flex-[0_0_auto] items-start relative">
        <div className="inline-flex flex-col h-[54px] justify-between flex-[0_0_auto] items-start relative">
          <h2 className="relative w-fit mt-[-1.00px] [font-family:'Be_Vietnam_Pro-SemiBold',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[30px] whitespace-nowrap">
            Giảng viên
          </h2>

          <p className="relative w-[276px] [font-family:'Be_Vietnam_Pro-Medium',Helvetica] font-medium text-black text-base tracking-[0] leading-6">
            Khám phá giáo viên toàn quốc
          </p>
        </div>

        <div className="inline-flex h-[54px] justify-around gap-3.5 flex-[0_0_auto] flex-col items-start relative">
          <Button
            className="relative w-fit [font-family:'Be_Vietnam_Pro-Medium',Helvetica] font-medium text-black text-base tracking-[0] leading-6 whitespace-nowrap p-0 h-auto"
          >
            Hiện tất cả
          </Button>
        </div>
      </header>

      <div className="relative self-stretch w-full">
          <div className="flex gap-3.5 w-full items-start pb-2">
            {teachersData.map((teacher) => (
              <Card
                key={teacher.id}
                className="w-[212px] flex-shrink-0 gap-3 flex flex-col items-start border-0 shadow-none bg-transparent"
              >
                <CardContent className="p-0 w-full">
                  <div className="flex h-[195px] gap-2 self-stretch w-full flex-col items-start relative mb-3">
                    <div className="relative flex-1 self-stretch w-full grow bg-[#dddddd] rounded" />
                  </div>

                  <h3 className="relative w-fit [font-family:'Be_Vietnam_Pro-SemiBold',Helvetica] font-semibold text-black text-base tracking-[0] leading-6 whitespace-nowrap">
                    {teacher.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-[68px] left-[-30px] w-[59px] h-[59px] rounded-full p-0 hover:bg-transparent"
          aria-label="Previous"
        >
          <ChevronLeftCircle className="w-[59px] h-[59px]" />
        </Button>
      </div>
    </section>
  );
};

export default Property;