'use client'

import React from "react";
import { Clock } from "lucide-react";
import { CourseModule } from "@/types/schema/course.schema";

interface ModulesSectionProps {
  services: CourseModule[];
}

const ModulesSection = ({ services }: ModulesSectionProps) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Nội dung khóa học</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((module) => (
          <div key={module.id} className="border border-gray-200 rounded-md p-4">
            <div className="font-semibold">{module.name}</div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Clock size={14} className="mr-1" />
              <span>{module.lessons} bài giảng • {module.duration}</span>
            </div>
            <div className={`font-semibold mt-2 ${
              module.price === 0 ? 'text-green-600' : 'text-primary'
            }`}>
              {module.price === 0 ? 'Miễn phí' : 'Có phí'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesSection;