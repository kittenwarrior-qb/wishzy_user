'use client';

import React from 'react';
import { Clock, Users, BookOpen, Award, Download, Infinity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AddToCartForCourseDetail from '@/components/cart/AddToCartForCourseDetail';
import type { CourseDetail } from '@/types/schema/course.schema';
import { formatDuration } from "@/lib/utils";

interface CourseSidebarProps {
  course: CourseDetail;
}

const mapLevel = (level: string) => {
  const levelMap: Record<string, string> = {
    'beginner': 'Cơ bản',
    'intermediate': 'Trung bình',
    'advanced': 'Nâng cao'
  };
  return levelMap[level] || level;
};

const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const courseFeatures = [
    {
      icon: Clock,
      text: `${formatDuration(course.totalDuration)} học`,
    },
    {
      icon: Users,
      text: `${course.numberOfStudents} học viên`,
    },
    {
      icon: BookOpen,
      text: `Trình độ ${mapLevel(course.level)}`,
    },
    {
      icon: Award,
      text: 'Cấp chứng chỉ',
    },
    {
      icon: Download,
      text: 'Tài liệu tải về',
    },
    {
      icon: Infinity,
      text: 'Truy cập trọn đời',
    },
  ];

  return (
    <Card className="flex flex-col w-full max-w-[404px] items-start gap-[21px] px-[18px] py-[43px] rounded-[15px] border border-gray-300">
      <CardContent className="p-0 w-full">
        <div className="flex flex-col items-start gap-px">
          <span className="[font-family:'Be_Vietnam_Pro-Bold',Helvetica] font-bold text-black text-2xl leading-[31px]">
            {course.price.toLocaleString('vi-VN')}đ
          </span>
        </div>

        <div className="flex flex-col items-start gap-2.5 mt-6 bg-[orange] w-full"> 
          <AddToCartForCourseDetail 
            course={course} 
            label="Thêm vào giỏ hàng" 
            inCartLabel="Đã thêm vào giỏ hàng" 
            className='w-full bg-[#ff9500] text-black rounded-[5px]' 
          />
           
        </div>

        <div className="flex flex-col items-start gap-2.5 mt-6">
          {courseFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-6 h-6 flex items-center justify-center">
                <feature.icon className="w-5 h-5" />
              </div>
              <span className="[font-family:'Be_Vietnam_Pro-Regular',Helvetica] font-normal text-gray-700 text-base leading-6">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSidebar;
