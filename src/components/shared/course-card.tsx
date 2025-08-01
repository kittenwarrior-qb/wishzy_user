import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Course } from "@/types/models/course";


const CourseCard = ({ course }: { course: Course }) => {
  const {
    courseName,
    description,
    thumbnail,
    price,
    rating,
    subject,
    createdBy,
    createdAt,
    grade
  } = course;

  const ratingCount = 10; 

  const publishedDate = new Date(createdAt).toLocaleDateString("vi-VN");

  return (
    <Card className="w-[300px] rounded-lg overflow-hidden border border-gray-200">
      <div className="relative w-full h-[185px] bg-[#dddddd]">
        <Image
          src={thumbnail}
          alt={courseName}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge className="bg-white text-black hover:bg-white text-[14px]">
            {subject.subjectName}
          </Badge>
        </div>
        <div className="absolute bottom-[10px] left-[10px] flex items-center gap-2 px-3 py-[5px] bg-white border-t border-gray-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
            />
          ))}
          <span className="text-[#777777] text-xs">({ratingCount})</span>
        </div>
      </div>

      <CardContent className="flex flex-col gap-[15px] p-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[7px]">
            <Avatar className="w-6 h-6 bg-[#d9d9d9]" />
            <span className="text-[#7b7b7b] text-sm">
              {createdBy?.name || "Tác giả"}
            </span>
          </div>
          <span className="text-[#7b7b7b] text-sm">{publishedDate}</span>
        </div>

        <h3 className="font-semibold text-black text-base leading-6 line-clamp-2 min-h-[35px]">
          {courseName}
        </h3>

       <p className="text-sm leading-[21px]">
        <span className="text-black line-clamp-3 block h-[63px]">
          {description}
        </span>
      </p>


        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-black text-sm">
            {price.toLocaleString("vi-VN")} đ
          </span>
          <Button
            variant="threeD"
            className="bg-white text-primary border border-primary"
          >
            <span className="text-black text-sm">Thêm vào giỏ hàng</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
