'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import banner_img from '@/assets/bannerpng.png'
const images = [
  'https://placehold.co/1280x400',
  'https://placehold.co/1280x400',
  'https://placehold.co/1280x400',
]

const BannerSection = () => {
  return (
    <div className="w-full max-w-[1280px] aspect-[32/10] mx-auto relative overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <Image
                src={banner_img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
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
