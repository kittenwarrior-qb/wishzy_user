'use client'

import React from "react";
import { BookOpen, Database, Cloud } from "lucide-react";
import { RelatedCourse } from "@/types/schema/course.schema";

interface RelatedCoursesSectionProps {
  relatedCourses: RelatedCourse[];
}

const RelatedCoursesSection = ({ relatedCourses }: RelatedCoursesSectionProps) => {
  const getIcon = (index: number) => {
    const icons = [BookOpen, Database, Cloud];
    return icons[index % icons.length];
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Khóa học liên quan</h2>
      <div className="space-y-4">
        {relatedCourses.map((course, index) => {
          const IconComponent = getIcon(index);
          return (
            <div key={course.id} className="flex items-center p-4 border border-gray-200 rounded-md">
              <div className="text-primary text-xl mr-4">
                <IconComponent size={24} />
              </div>
              <div>
                <h3 className="font-semibold">{course.name}</h3>
                <p className="text-gray-600 text-sm">{course.info}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedCoursesSection;