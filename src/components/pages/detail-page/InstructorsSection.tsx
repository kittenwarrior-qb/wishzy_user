'use client'

import React from "react";
import { Instructor } from "@/types/schema/course.schema";

interface InstructorsSectionProps {
  instructors: Instructor[];
}

const InstructorsSection = ({ instructors }: InstructorsSectionProps) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Giảng viên</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              {instructor.avatar ? (
                <img 
                  src={instructor.avatar} 
                  alt={instructor.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-blue-500 text-xl font-semibold">
                  {instructor.name.charAt(0)}
                </span>
              )}
            </div>
            <h3 className="font-medium">{instructor.name}</h3>
            <p className="text-sm text-gray-600">{instructor.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorsSection;