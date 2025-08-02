'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
const images = [
  'https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif',
  'https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif',
  'https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif',
]

const BannerSection = () => {
  return (
    <div className="w-full max-w-[1280px] aspect-[32/10] mx-auto relative overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="w-full h-[400px] flex items-center justify-center">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                className="object-cover object-center w-full h-full"
                width={1200}
                height={400}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-[48%] rounded-full z-10" />
        <CarouselNext className="absolute right-4 top-[48%] rounded-full z-10" />
      </Carousel>
    </div>
  )
}

export default BannerSection
