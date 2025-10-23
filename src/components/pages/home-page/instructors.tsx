import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
import { User } from "@/types/schema/user.schema";

const instructorsData: User[] = [
  { 
    _id: "1", 
    email: "instructor1@wishzy.com", 
    fullName: "Cô Nguyễn Thị Lan", 
    avatar: "", 
    role: "instructor" as const,
    phone: "0901234567"
  },
  { 
    _id: "2", 
    email: "instructor2@wishzy.com", 
    fullName: "Thầy Trần Văn Nam", 
    avatar: "", 
    role: "instructor" as const,
    phone: "0901234568"
  },
  { 
    _id: "3", 
    email: "instructor3@wishzy.com", 
    fullName: "Cô Lê Thị Hạnh", 
    avatar: "", 
    role: "instructor" as const,
    phone: "0901234569"
  },
  { 
    _id: "4", 
    email: "instructor4@wishzy.com", 
    fullName: "Thầy Phạm Minh Tuấn", 
    avatar: "", 
    role: "instructor" as const,
    phone: "0901234570"
  },
  { 
    _id: "5", 
    email: "instructor5@wishzy.com", 
    fullName: "Cô Võ Thị Mai", 
    avatar: "", 
    role: "instructor" as const,
    phone: "0901234571"
  },
  { 
    _id: "6", 
    email: "instructor6@wishzy.com", 
    fullName: "Thầy Hoàng Văn Đức", 
    avatar: "", 
    role: "instructor" as const,
    phone: "0901234572"
  },
  { 
    _id: "7", 
    email: "instructor7@wishzy.com", 
    fullName: "Cô Đặng Thị Linh", 
    avatar: "", 
    role: "instructor" as const,
    phone: "0901234573"
  },
  { 
    _id: "8", 
    email: "instructor8@wishzy.com", 
    fullName: "Thầy Bùi Quốc Anh", 
    avatar: "", 
    role: "instructor" as const,
    phone: "0901234574"
  },
];

const Property = () => {
  return (
    <div className="py-10 max-w-[2400px] mx-auto">
      <div className="mb-6 px-[35px]">
        <p className="font-semibold text-[22px] mb-2">Giảng viên</p>
        <p className="text-[18px]">Khám phá giáo viên toàn quốc</p>
      </div>

      <div className="px-[35px] relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3.5">
            {instructorsData.map((instructor) => (
              <CarouselItem key={instructor._id} className="pl-3.5 basis-auto">
                <Card className="w-[220px] flex-shrink-0 flex flex-col items-start border-0 shadow-none bg-transparent group">
                  <CardContent className="p-0 w-full">
                    <div className="h-[220px] w-full relative mb-3  overflow-hidden">
                      <Image
                        src={instructor.avatar || "/logo/bg_logo_black.png"}
                        alt={instructor.fullName}
                        fill
                        sizes="220px"
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />

                      <div
                        className="
                          absolute inset-0 bg-white/70
                          origin-center
                          transition-transform duration-700 ease-in-out
                          group-hover:scale-[5]
                        "
                        style={{
                          maskImage: 'radial-gradient(circle at center, transparent 100px, black 100px)',
                          WebkitMaskImage: 'radial-gradient(circle at center, transparent 100px, black 100px)',
                        }}
                      />
                    </div>

                    <h3 className="font-semibold text-black text-base">
                      {instructor.fullName}
                    </h3>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-[-10px] z-10" />
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-[-10px] z-10" />
          
        </Carousel>
      </div>
    </div>
  );
};

export default Property;