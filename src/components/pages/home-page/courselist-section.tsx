'use client'

import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/shared/course-card';
import { CourseService } from '@/services/course.service';
import { CourseList } from '@/types/schema/course.schema';
// import { Skeleton } from '@/components/ui/skeleton'

const CourselistSection = ({ courseList }: {courseList: CourseList[]}) => {
  const [course, setCourse] = useState<CourseList[]>([])
  const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await CourseService.getHotCourse()
          console.log(data)
          setCourse(data?.courses || [])
        } catch (error) {
          console.error('Error loading grades:', error)
        } finally {
          setLoading(false)
        }
      }
  
      fetchData()
    }, [])

  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
      {course.map((c) => (
        <CourseCard key={c._id} course={c} />
      ))}
    </div>
  );
};

export default CourselistSection;
