'use client'

import React from 'react'
import CourseCard from '@/components/shared/course-card'
import { CourseList } from '@/types/schema/course.schema'

interface CourseListCardProps {
  courses: CourseList[]
  loading?: boolean
  showFilters?: boolean
}

const CourseListCard = ({ courses, loading = false, showFilters = false }: CourseListCardProps) => {
  if (loading) {
    return (
      <div className={`max-w-[2400px] px-[35px] mx-auto grid gap-10 ${
        showFilters 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6'
      }`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-[300px] bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    )
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="max-w-[2400px]  px-[35px] mx-auto flex items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">Không có khóa học nào</p>
      </div>
    )
  }

  return (
    <div className={`max-w-[2400px] px-[35px] mx-auto grid gap-10 ${
      showFilters 
        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4' 
        : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
        // : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
    }`}>
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  )
}

export default CourseListCard
