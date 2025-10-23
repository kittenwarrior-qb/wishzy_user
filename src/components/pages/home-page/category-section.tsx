'use client';

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { GradeService } from "@/services/grade.service";
import { Grade } from "@/types/schema/grade.schema";

const ListCard = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGrades = useCallback(async () => {
    try {
      setLoading(true);
      const data = await GradeService.getGrades();
      setGrades(data.grades || []);
    } catch (error) {
      console.error('Error fetching grades:', error);
      setGrades([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  if (loading) {
    return (
      <div className="py-10 max-w-[2400px] mx-auto">
        <div className="mb-6 px-[35px]">
          <p className="font-semibold text-[22px] mb-2">Khóa học theo lớp</p>
          <p className="text-[18px]">Khám phá các khóa học theo từng lớp</p>
        </div>
        <div className="flex justify-center items-center py-16">
          <span className="text-lg">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-[2400px] mx-auto">
      <div className="mb-6 px-[35px]">
        <p className="font-semibold text-[22px] mb-2">Khóa học theo lớp</p>
        <p className="text-[18px]">Khám phá các khóa học theo từng lớp</p>
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
            {grades.map((grade) => (
              <CarouselItem key={grade._id} className="pl-3.5 basis-auto">
                <Link
                  href={`/search?grade=${encodeURIComponent(grade.gradeName)}`}
                  className="block"
                >
                  <Card className="w-[220px] flex-shrink-0 flex flex-col items-start border-0 shadow-none bg-transparent">
                    <CardContent className="p-0 w-full">
                      <div className="h-[220px] w-full relative mb-3 overflow-hidden bg-white border border-solid border-black">
                        <Image
                          src="/logo/bg_logo_black.png"
                          alt={grade.gradeName}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-black text-lg mb-1">
                          {grade.gradeName}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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

export default ListCard;