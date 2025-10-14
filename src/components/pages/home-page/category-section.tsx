'use client';

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image from "next/image";

const cardData = [
  { id: 1, title: "Tiểu học", count: "10k+", image: "/placeholder.jpg" },
  { id: 2, title: "THCS", count: "8k+", image: "/placeholder.jpg" },
  { id: 3, title: "THPT", count: "15k+", image: "/placeholder.jpg" },
  { id: 4, title: "ĐGNL", count: "20k+", image: "/placeholder.jpg" },
  { id: 5, title: "Luyện đề", count: "30k+", image: "/placeholder.jpg" },
  { id: 6, title: "Thi thử", count: "50k+", image: "/placeholder.jpg" },
  { id: 7, "title": "Trắc nghiệm", "count": "100k+", "image": "/placeholder.jpg" },
  { id: 8, title: "Tài liệu", count: "5k+", image: "/placeholder.jpg" },
  { id: 9, title: "Lớp 10", count: "7k+", image: "/placeholder.jpg" },
  { id: 10, title: "Lớp 11", count: "8k+", image: "/placeholder.log.jpg" },
  { id: 11, title: "Lớp 12", count: "12k+", image: "/placeholder.jpg" },
  { id: 12, title: "Khác", count: "2k+", image: "/placeholder.jpg" },
];

const ListCard = () => {
  return (
    <div className="w-full bg-[#FFF5ED] px-[35px] py-[30px]">
      <div className="w-full max-w-[2400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-6 md:gap-8 pt-8 pb-16">
          {cardData.map((card, index) => (
            <Card
              key={card.id}
              className={`flex flex-col bg-white rounded-[16px] border border-solid border-black overflow-hidden transition-transform duration-300 group
                ${
                  index % 2 === 0 ? '-translate-y-[25px]' : 'translate-y-[25px]'
                }`
              }
            >
              <CardContent className="flex flex-col flex-1 pt-[24px] px-[16px] pb-[16px]">
                <div className="">
                  <h2 className="font-semibold text-black text-xl md:text-2xl tracking-tight leading-tight ">
                    {card.title}
                  </h2>
                  <p className="font-normal text-[#191919] text-sm md:text-base mt-1">
                    {card.count} học viên
                  </p>
                </div>

                <div className="mt-auto aspect-square bg-[#dddddd] relative overflow-hidden rounded-[16px]">
                  <Image 
                    src={card.image} 
                    alt={card.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCard;