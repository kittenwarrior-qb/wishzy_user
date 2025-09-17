"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface BannerSectionProps {
  images: string[];
}

const BannerSection = ({ images }: BannerSectionProps) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto relative overflow-hidden">
      <div className="relative w-full aspect-[16/5] sm:aspect-[16/6] md:aspect-[32/10]">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src={src}
                  alt={`Banner ${index + 1}`}
                  className="object-cover object-center w-full h-full"
                  width={1200}
                  height={400}
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full z-10" />
          <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full z-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default BannerSection;
