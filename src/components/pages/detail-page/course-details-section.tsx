'use client'

import { Calendar, Eye, Heart, Share2, Star } from "lucide-react";
import React from "react";
import { CourseDetail } from "@/types/schema/course.schema";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; 
export const CourseDetailsSection = ({ course }: { course: CourseDetail }) => {
  const courseStats = [
    {
      icon: Eye,
      text: `${course.numberOfStudents ?? 0} học viên`,
    },
    {
      icon: Calendar,
      text: new Date(course.createdAt).toLocaleDateString("vi-VN"),
    },
  ];

  const actionIcons = [Heart, Share2];

  return (
    <div className="flex flex-col items-start gap-2.5 w-full">
      <div className="pb-4 my-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/subjects/${course.subject?.slug}`}>
              {course.subject?.subjectName || "Danh mục"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" aria-current="page">
              {course.courseName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      </div>

      <h1 className="text-[32px] font-bold leading-[42px]">
        {course.courseName}
      </h1>

      <div className="flex items-center gap-2.5">
        <div className="text-base">
          {course.createdBy?.fullName ?? "Giảng viên chưa cập nhật"}
        </div>

        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-current text-yellow-400" />
          <span className="text-xs">
            ({course.rating ?? 0})
          </span>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-[800px]">
        <div className="flex gap-6">
          {courseStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center gap-2 w-[140px]">
                <Icon className="w-6 h-6" />
                <span className="text-sm">{stat.text}</span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4">
          {actionIcons.map((Icon, index) => (
            <Icon key={index} className="w-6 h-6 cursor-pointer" />
          ))}
        </div>
      </div>
    </div>
  );
};
