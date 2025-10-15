'use client';

import { Card, CardContent } from "@/components/ui/card";
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
      <div className="w-full bg-[#FFF5ED] px-[35px] py-[30px]">
        <div className="w-full max-w-[2400px] mx-auto">
          <div className="flex justify-center items-center py-16">
            <span className="text-lg">Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFF5ED] px-[35px] py-[30px]">
      <div className="w-full max-w-[2400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-6 md:gap-8 pt-8 pb-16">
          {grades.map((grade, index) => {
            return (
              <Link
                key={grade._id}
                href={`/search?grade=${encodeURIComponent(grade.gradeName)}`}
                className="block"
              >
                <Card
                  className={`
                    flex flex-col bg-white rounded-[16px] border border-solid border-black overflow-hidden 
                    transition-transform duration-300 group cursor-pointer
                    ${index % 2 === 0 ? '-translate-y-[25px]' : 'translate-y-[25px]'}
                    lg:hover:scale-105
                    ${index % 4 < 2 ? 'lg:hover:-translate-x-2' : 'lg:hover:translate-x-2'}
                    ${index % 6 < 3 ? '2xl:hover:-translate-x-2' : '2xl:hover:translate-x-2'}
                  `}
                >
                  <CardContent className="flex flex-col flex-1 pt-[24px] px-[16px] pb-[16px]">
                    <div className="">
                      <h2 className="font-semibold text-black text-xl md:text-2xl tracking-tight leading-tight ">
                        {grade.gradeName}
                      </h2>
                      <p className="font-normal text-[#191919] text-sm md:text-base mt-1">
                        10k+ học viên
                      </p>
                    </div>

                    <div className="mt-auto aspect-square bg-[#dddddd] relative overflow-hidden rounded-[16px]">
                      <Image 
                        src="/logo/bg_logo_black.png" 
                        alt={grade.gradeName} 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListCard;