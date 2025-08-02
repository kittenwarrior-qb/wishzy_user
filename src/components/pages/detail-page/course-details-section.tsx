'use client'

import { Calendar, Eye, Heart, Share2, Star } from "lucide-react";
import React from "react";
import { Course } from "@/types/models/course";

export const CourseDetailsSection = ({ course }: { course: Course }) => {
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
      <div className="text-base text-[#1b1b1be6]">
        {course.subject?.subjectName ?? "Danh mục chưa có"}
      </div>

      <h1 className="text-[32px] font-bold text-black leading-[42px]">
        {course.courseName}
      </h1>

      <div className="flex items-center gap-2.5">
        <div className="text-base text-black">
          {course.createdBy?.fullName ?? "Giảng viên chưa cập nhật"}
        </div>

        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-4 h-4 fill-yellow-400" />
          <span className="text-xs text-[#777]">
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
                <span className="text-sm text-black">{stat.text}</span>
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
