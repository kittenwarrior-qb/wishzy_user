import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { CourseDetail } from "@/types/schema/course.schema";
import { AnimatedLink } from "./animated-link";

const CourseCard = ({ course }: { course: CourseDetail }) => {
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
      <AnimatedLink href={`/course/${slug}`} className="flex-shrink-0">
        <div className="relative w-[120px] h-[120px] sm:w-full sm:h-[185px] bg-muted overflow-hidden">
          <Image
            src={
              thumbnail ||
              "https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png"
            }
            alt={courseName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 ease-in-out"
          />
          {/* Badge + Rating chỉ hiện ở sm trở lên */}
          <div className="hidden sm:flex absolute top-2 right-2 gap-2">
            <Button variant={"outline"} className="!text-[12px]">
              {subject?.subjectName}
            </Button>
            <Button variant={"outline"} className="!text-[12px]">
              {level}
            </Button>
          </div>
          <div className="hidden sm:flex absolute bottom-[10px] left-[10px] items-center gap-2 px-3 py-[5px] bg-white rounded">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "text-yellow-500" : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-muted-foreground text-xs">
              ({ratingCount})
            </span>
          </div>
        </div>
      </AnimatedLink>

      <CardContent className="flex flex-col gap-[10px] p-3 flex-1">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[7px]">
            <Avatar className="w-6 h-6 bg-neutral-200" />
            <span className="text-muted-foreground text-sm">
              {createdBy.fullName || "Tác giả"}
            </span>
          </div>
          <span className="text-muted-foreground text-xs sm:text-sm">
            {publishedDate}
          </span>
        </div>

        <AnimatedLink href={`/course/${slug}`}>
          <h3 className="font-semibold text-foreground text-sm sm:text-base leading-5 sm:leading-6 line-clamp-2 hover:underline">
            {courseName}
          </h3>
        </AnimatedLink>

        <p className="text-xs sm:text-sm leading-[18px] sm:leading-[21px] flex-1">
          <span className="text-foreground line-clamp-2 sm:line-clamp-3 block">
            {description}
          </span>
        </p>

        <div className="flex items-center justify-between w-full mt-auto">
          <span className="font-medium text-foreground text-sm">
            {price.toLocaleString("vi-VN")} đ
          </span>
          <Button
            variant="outline"
            size="sm"
            className="px-2 py-1 sm:px-3 sm:py-2"
          >
            <span className="text-foreground text-xs sm:text-sm">
              Thêm vào giỏ hàng
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
