import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const ResultSection = () => {
  return (
    <section className="w-full py-12 px-4 bg-[#fdead7]">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div className="flex justify-center lg:justify-start">
          <Image
            className="rounded-xl object-cover"
            alt="Learning outcomes collage showing students in various educational and professional settings"
            src="https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png"
            width={456}
            height={416}
          />
        </div>

        <div className="flex flex-col items-start gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Kết quả học tập của học viên trên Wishzy
          </h2>

          <p className="text-base md:text-lg leading-relaxed max-w-xl">
            77% học viên trên Wishzy báo cáo rằng họ đã đạt được những lợi ích
            thiết thực trong sự nghiệp, bao gồm việc nâng cao kỹ năng, tăng thu
            nhập, và mở ra cơ hội nghề nghiệp mới.
          </p>

          <Button variant="outline">text here</Button>
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
