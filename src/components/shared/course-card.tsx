'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { CourseList } from "@/types/schema/course.schema";
import AddToCartForCourseDetail from "../cart/AddToCartForCourseDetail";
import { formatDuration, mapLevel } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

const CourseCard = ({ course }: { course: CourseList }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [popupPosition, setPopupPosition] = useState<'left' | 'right'>('right');
  const cardRef = useRef<HTMLDivElement>(null);

  const calculatePopupPosition = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const popupWidth = 320; 
      const viewportPadding = 16;
      
      const spaceRight = window.innerWidth - rect.right - viewportPadding;
      const spaceLeft = rect.left - viewportPadding;

      if (spaceRight < popupWidth && spaceLeft >= popupWidth) {
        setPopupPosition('left');
      } else {
        setPopupPosition('right');
      }
    }
  };

  useEffect(() => {
    if (!course) return; 
    
    calculatePopupPosition();
    
    const handleResize = () => {
      calculatePopupPosition();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [course]);

  if (!course) return null;

  const {
    courseName, thumbnail, price, rating, level,
    createdBy, createdAt, slug, totalDuration, numberOfStudents, description,
  } = course;

  const ratingCount = 10;
  const publishedDate = new Date(createdAt).toLocaleDateString("vi-VN");

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);

    // Recalculate position on hover for dynamic updates
    calculatePopupPosition();

    const timeout = setTimeout(() => {
      setIsHovered(true);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className="w-full overflow-hidden
        transition-transform duration-300 ease-in-out 
        flex flex-row sm:flex-col group hover:scale-104"
      >
        <Link href={`/course/${slug}`} className="flex-shrink-0">
          <div className="relative w-[120px] h-[120px] sm:w-full sm:h-[185px] bg-muted overflow-hidden">
            <Image
              src={thumbnail || "/logo/bg_logo_black.png"}
              alt={courseName}
              fill
              sizes="(max-width: 768px) 120px, 300px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 ease-in-out" />
          </div>
        </Link>

        <CardContent className="flex flex-col gap-[10px] py-3 flex-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[7px]">
              <Users className="h-3 w-3 text-muted-foreground sm:hidden" />
              <span className="text-muted-foreground text-xs sm:text-sm">
                {numberOfStudents || 0} học sinh
              </span>
            </div>
            <span className="text-muted-foreground text-xs sm:text-sm">
              {formatDuration(totalDuration) || "0h"}
            </span>
          </div>

          <Link href={`/course/${slug}`}>
            <h3 className="font-semibold text-foreground text-sm sm:text-base leading-5 sm:leading-6 line-clamp-2 hover:underline">
              {courseName}
            </h3>
          </Link>

          <div className="flex items-center justify-between w-full mt-auto">
            <span className="font-bold text-foreground text-base">
              {price.toLocaleString("vi-VN")} đ
            </span>
          </div>
        </CardContent>
      </Card>

      {/* --- Popup chi tiết --- */}
      <div className={`
        absolute top-1/2 -translate-y-1/2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4
        hidden lg:block transition-opacity duration-200
        ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        ${popupPosition === 'right' ? 'left-full' : 'right-full'}
        
        before:content-[''] before:absolute before:w-0 before:h-0
        before:border-t-[6px] before:border-b-[6px] before:border-t-transparent before:border-b-transparent
        before:top-1/2 before:-translate-y-1/2
        ${popupPosition === 'right' 
          ? 'before:border-r-[6px] before:border-r-white before:-left-[6px]' 
          : 'before:border-l-[6px] before:border-l-white before:-right-[6px]'
        }
        
        after:content-[''] after:absolute after:w-0 after:h-0
        after:border-t-[7px] after:border-b-[7px] after:border-t-transparent after:border-b-transparent
        after:top-1/2 after:-translate-y-1/2
        ${popupPosition === 'right' 
          ? 'after:border-r-[7px] after:border-r-gray-200 after:-left-[7px] after:-z-10' 
          : 'after:border-l-[7px] after:border-l-gray-200 after:-right-[7px] after:-z-10'
        }
      `}>
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-900 leading-6">
              {courseName}
            </h3>

            {description && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(totalDuration) || "0h"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{numberOfStudents || 0} học sinh</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{mapLevel(level)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
              <span className="text-sm text-gray-600">({ratingCount} đánh giá)</span>
            </div>

            {createdBy && (
              <div className="flex items-center gap-2 pt-2">
                <Avatar className="h-8 w-8">
                  {createdBy.avatar ? (
                    <Image
                      src={createdBy.avatar}
                      alt={createdBy.fullName || "Instructor"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                      {(createdBy.fullName || "GV").charAt(0).toUpperCase()}
                    </div>
                  )}
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {createdBy.fullName || "Giảng viên"}
                  </p>
                  <p className="text-xs text-gray-600">Được tạo: {publishedDate}</p>
                </div>
              </div>
            )}
            
            <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                        {price.toLocaleString("vi-VN")} đ
                    </span>
                </div>
                <AddToCartForCourseDetail
                    course={course}
                    label="Thêm vào giỏ hàng"
                    inCartLabel="Đã thêm vào giỏ hàng"
                    className="w-full"
                />
            </div>
          </div>
        </div>
    </div>
  );
};

export default CourseCard;