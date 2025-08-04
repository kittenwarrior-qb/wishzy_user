'use client'

import React from 'react'
import CourseCard from '@/components/shared/course-card'
import { CourseList } from '@/types/schema/course.schema'

const CourseListCard = ({ courses }: { courses: CourseList[] }) => {
  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {courses.map((c) => (
        <CourseCard key={c._id} course={c} />
      ))}
    </div>
  )
}

export default CourseListCard
