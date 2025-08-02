import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Course } from "@/types/models/course";
import { useLocale } from "next-intl";

const CourseCard = ({ course }: { course: Course }) => {
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
  // const locale = useLocale(); 

  return (
    <Card className="w-[300px] rounded-lg overflow-hidden border border-gray-200">
      <Link href={`/course/${slug}`}>
        <div className="relative w-full h-[185px] bg-muted">
          <Image
            src={thumbnail || "https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png"}
            alt={courseName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge className="bg-white text-base-content text-[14px]">
              {subject?.subjectName}
            </Badge>
            <Badge className="bg-white text-base-content text-[14px]">
              {level}
            </Badge>
          </div>
          <div className="absolute bottom-[10px] left-[10px] flex items-center gap-2 px-3 py-[5px] bg-white">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "text-yellow-500" : "text-muted-foreground"}`}
              />
            ))}
            <span className="text-muted-foreground text-xs">({ratingCount})</span>
          </div>
        </div>
      </Link>

      <CardContent className="flex flex-col gap-[15px] p-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[7px]">
            <Avatar className="w-6 h-6 bg-neutral-200" />
            <span className="text-muted-foreground text-sm">
              {createdBy?.name || "Tác giả"}
            </span>
          </div>
          <span className="text-muted-foreground text-sm">{publishedDate}</span>
        </div>

        <Link href={`course/${slug}`}>
          <h3 className="font-semibold text-foreground text-base leading-6 line-clamp-2 min-h-[35px] hover:underline">
            {courseName}
          </h3>
        </Link>

        <p className="text-sm leading-[21px]">
          <span className="text-foreground line-clamp-3 block h-[63px]">
            {description}
          </span>
        </p>

        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-foreground text-sm">
            {price.toLocaleString("vi-VN")} đ
          </span>
          <Button variant="default">
            <span className="text-foreground text-sm">Thêm vào giỏ hàng</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
