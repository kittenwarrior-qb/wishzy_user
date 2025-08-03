// components/sections/HotListSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import CourseList from "@/components/shared/course-list";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseService } from "@/services/course.service";
import { Course } from "@/types/models/course";

const HotListSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CourseService.getHotCourse();
        setCourses(data?.courses || []);
        console.log("Hot courses fetched:", data?.courses);
      } catch (error) {
        console.error("Error fetching hot courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return <CourseList courses={courses} />;
};

export default HotListSection;
