import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CourseList } from "@/types/schema/course.schema";
import AddToCartForCourseDetail from "../cart/AddToCartForCourseDetail";
import { mapLevel } from "@/lib/utils";

const CourseCard = ({ course }: { course: CourseList }) => {
  if (!course) return null;

  const {
    courseName,
    description,
    thumbnail,
    price,
    rating,
    level,
    subject,
    createdBy,
    createdAt,
    slug,
  } = course;

  const ratingCount = 10;
  const publishedDate = new Date(createdAt).toLocaleDateString("vi-VN");

  return (
    <Card
      className="w-full rounded-lg overflow-hidden border border-base-content/30
  transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:scale-103
  flex flex-row sm:flex-col"
    >
      <Link href={`/course/${slug}`} className="flex-shrink-0">
        <div className="relative w-[120px] h-[120px] sm:w-full sm:h-[185px] bg-muted overflow-hidden">
          <Image
            src={
              thumbnail ||
              "https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png"
            }
            alt={courseName}
            fill
            sizes="(max-width: 768px) 120px, 300px"
            className="object-cover transition-transform duration-300 ease-in-out"
          />
          {/* Badge + Rating chỉ hiện ở sm trở lên */}
          <div className="hidden sm:flex absolute top-2 right-2 gap-2">
            {subject?.subjectName && (
              <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium">
                {subject.subjectName}
              </div>
            )}
            <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium">
              {mapLevel(level)}
            </div>
          </div>
          
        </div>
      </Link>

      <CardContent className="flex flex-col gap-[10px] p-3 flex-1">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[7px]">
            <Avatar className="w-6 h-6 bg-neutral-200" />
            <span className="text-muted-foreground text-sm">
              {createdBy?.fullName || "Tác giả"}
            </span>
          </div>
          <span className="text-muted-foreground text-xs sm:text-sm">
            {publishedDate}
          </span>
        </div>

        <Link href={`/course/${slug}`}>
          <h3 className="font-semibold text-foreground text-sm sm:text-base leading-5 sm:leading-6 line-clamp-2 hover:underline">
            {courseName}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm leading-[18px] sm:leading-[21px] flex-1">
          <span className="text-foreground line-clamp-2 sm:line-clamp-3 block">
            {description || "Không có mô tả"}
          </span>
        </p>

        <div className="flex items-center justify-between w-full mt-auto">
          <span className="font-medium text-foreground text-sm">
            {price.toLocaleString("vi-VN")} đ
          </span>
          <div className="flex-shrink-0">
            <AddToCartForCourseDetail 
              course={course} 
              label="Thêm vào giỏ hàng" 
              inCartLabel="Đã thêm vào giỏ hàng" 
              className="" 
            />
          </div>
        </div>

        <div className="flex sm:hidden items-center gap-2 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < rating ? "text-yellow-500" : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-muted-foreground text-xs">({ratingCount})</span>
          {subject?.subjectName && (
            <span className="ml-auto px-2 py-1 bg-gray-100 rounded text-xs">
              {subject.subjectName}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;