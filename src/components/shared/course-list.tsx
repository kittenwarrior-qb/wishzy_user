// components/shared/CourseList.tsx
'use client'

import React from 'react'
import CourseCard from '@/components/shared/course-card'
import { Course } from '@/types/models/course'

const CourseList = ({ courses }: { courses: Course[] }) => {
  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {courses.map((c) => (
        <CourseCard key={c._id} course={c} />
      ))}
    </div>
  )
}

export default CourseList
