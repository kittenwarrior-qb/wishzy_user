'use client'

import React from "react";
import { Clock, Users, Flag, Star, Eye, Calendar, Heart, Share2 } from "lucide-react";
import type { CourseDetail } from "@/types/schema/course.schema";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatDuration } from "@/lib/utils";
import { mapLevel } from "@/lib/utils";


const CourseHeader = ({ course }: { course: CourseDetail }) => {
  const courseStats = [
    {
      icon: Eye,
      text: `${course.numberOfStudents} lượt xem`,
    },
    {
      icon: Calendar,
      text: new Date(course.createdAt).toLocaleDateString('vi-VN'),
    },
  ];

  const actionIcons = [Heart, Share2];

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="flex flex-col-reverse md:items-start md:gap-12">
        
        <div className="w-full mb-6 md:mb-0">
          <Image 
            src={course.thumbnail || ""} 
            alt={course.courseName} 
            height={400} 
            width={600} 
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg" 
          />
        </div>

        <div className="w-full flex flex-col">
          <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/course">Khóa học</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {course.subject?.subjectName || 'Development'}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {mapLevel(course.level)}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="relative w-fit [font-family:'Be_Vietnam_Pro-Bold',Helvetica] font-bold text-black text-[32px] tracking-[0] leading-[42px]">
              {course.courseName}
            </div>

            <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Be_Vietnam_Pro-Regular',Helvetica] font-normal text-black text-base tracking-[0] leading-6 whitespace-nowrap">
                {course.createdBy?.fullName || 'Giảng viên'}
              </div>

              <div className="flex items-center justify-center gap-2.5 relative">
                <Star className="relative flex-[0_0_auto] w-4 h-4 fill-yellow-400 text-yellow-400" />
                <div className="mt-[-1.00px] [font-family:'Be_Vietnam_Pro-Regular',Helvetica] font-normal text-[#777777] text-xs leading-[18px] relative w-fit tracking-[0] whitespace-nowrap">
                  ({course.averageRating || course.rating})
                </div>
              </div>
            </div>

            <div className="flex w-full items-start justify-between relative flex-[0_0_auto] mt-4">
              <div className="inline-flex items-center gap-[25px] relative flex-[0_0_auto]">
                {courseStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 relative"
                    >
                      <IconComponent className="!relative !w-6 !h-6" />
                      <div className="relative w-fit [font-family:'Be_Vietnam_Pro-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                        {stat.text}
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center gap-2">
                  <Clock className="!relative !w-6 !h-6" />
                  <div className="relative w-fit [font-family:'Be_Vietnam_Pro-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                    {formatDuration(course.totalDuration)} phút
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 relative">
                {actionIcons.map((IconComponent, index) => (
                  <IconComponent
                    key={index}
                    className="!relative !w-6 !h-6 cursor-pointer hover:text-gray-600 transition-colors"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
