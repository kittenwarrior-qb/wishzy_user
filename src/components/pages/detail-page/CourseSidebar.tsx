'use client'

import React, { useEffect, useState } from 'react'
import {
  Clock,
  Users,
  BookOpen,
  Award,
  Download,
  Infinity,
  Heart,
  Share2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AddToCartForCourseDetail from '@/components/cart/AddToCartForCourseDetail'
import type { CourseDetail } from '@/types/schema/course.schema'
import { formatDuration } from '@/lib/utils'
import { isWishlisted, toggleWishlist } from '@/lib/wishlist'

interface CourseSidebarProps {
  course: CourseDetail
}

const mapLevel = (level: string) => {
  const levelMap: Record<string, string> = {
    beginner: 'Cơ bản',
    intermediate: 'Trung bình',
    advanced: 'Nâng cao'
  }
  return levelMap[level] || level
}

const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    // Initialize wishlist state on mount
    setLiked(isWishlisted(course._id))
  }, [course._id])

  const courseFeatures = [
    {
      icon: Clock,
      text: `${formatDuration(course.totalDuration)} học`
    },
    {
      icon: Users,
      text: `${course.numberOfStudents} học viên`
    },
    {
      icon: BookOpen,
      text: `Trình độ ${mapLevel(course.level)}`
    },
    {
      icon: Award,
      text: 'Cấp chứng chỉ'
    },
    {
      icon: Download,
      text: 'Tài liệu tải về'
    },
    {
      icon: Infinity,
      text: 'Truy cập trọn đời'
    }
  ]

  return (
    <Card className='flex flex-col w-full max-w-[404px] items-start gap-[21px] px-[18px] py-[43px] rounded-[15px] border border-gray-300'>
      <CardContent className='p-0 w-full flex flex-col gap-[21px]'>
        <div className='flex flex-col items-start gap-px'>
          <span className="[font-family:'Be_Vietnam_Pro-Bold',Helvetica] font-bold text-black text-2xl leading-[31px]">
            {course.price.toLocaleString('vi-VN')}đ
          </span>
        </div>

        <div className='flex flex-col items-start gap-2.5'>
          <AddToCartForCourseDetail
            course={course}
            label='Thêm vào giỏ hàng'
            inCartLabel='Đã thêm vào giỏ hàng'
            className='w-full bg-[#ff9500] text-black rounded-[5px]'
          />
        </div>
        <div className='flex items-center justify-between gap-4 relative'>
          <div
            className='flex items-center gap-3 cursor-pointer'
            onClick={() => setLiked(toggleWishlist(course._id))}
          >
            <Heart
              className={`!relative !w-6 !h-6 ${
                liked ? 'text-red-500 fill-red-500' : 'text-gray-800'
              } transition-colors`}
            />
            <span>{liked ? 'Đã yêu thích' : 'Yêu thích'}</span>
          </div>
          <Share2 className='!relative !w-6 !h-6 cursor-pointer hover:text-gray-600 transition-colors' />
        </div>

        <div className='flex flex-col items-start gap-2.5'>
          {courseFeatures.map((feature, index) => (
            <div key={index} className='flex items-center gap-4'>
              <div className='w-6 h-6 flex items-center justify-center'>
                <feature.icon className='w-5 h-5' />
              </div>
              <span className="[font-family:'Be_Vietnam_Pro-Regular',Helvetica] font-normal text-gray-700 text-base leading-6">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseSidebar
