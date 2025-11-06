'use client'

import React from "react";
import { Clock, ChevronDown, Users, BookOpen, Award, BarChart3 } from "lucide-react";
import { CourseModule } from "@/types/schema/course.schema";

interface ModulesSectionProps {
  services: CourseModule[];
}

const ModulesSection = ({ services }: ModulesSectionProps) => {
  const [expandedModule, setExpandedModule] = React.useState<number | null>(null);

  const toggleExpand = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };
  
  if (!services || !Array.isArray(services)) {
    return <div>Không tìm thấy nội dung khóa học.</div>;
  }

  const moduleDetails = {
    '1': [
      { id: 1, title: 'Bài 1: Giới thiệu khóa học', duration: '5 phút' },
      { id: 2, title: 'Bài 2: Hướng dẫn sử dụng nền tảng', duration: '10 phút' },
    ],
    '2': [
      { id: 3, title: 'Bài 1: Kiến thức nền tảng về Toán học', duration: '15 phút' },
      { id: 4, title: 'Bài 2: Các khái niệm cơ bản', duration: '20 phút' },
      { id: 5, title: 'Bài 3: Thực hành với các phép tính', duration: '30 phút' },
    ],
    '3': [
      { id: 6, title: 'Bài 1: Tổng kết khóa học', duration: '10 phút' },
      { id: 7, title: 'Bài 2: Thi cuối khóa', duration: '45 phút' },
    ],
    '4': [
      { id: 8, title: 'Bài 1: Tạo nội dung với ChatGPT', duration: '12 phút' },
      { id: 9, title: 'Bài 2: Tối ưu hóa prompt', duration: '18 phút' },
    ],
    '5': [
      { id: 10, title: 'Bài 1: Công cụ AI trong marketing', duration: '15 phút' },
      { id: 11, title: 'Bài 2: Case study thực tế', duration: '25 phút' },
    ],
    '6': [
      { id: 12, title: 'Bài 1: Phân tích dữ liệu với AI', duration: '20 phút' },
      { id: 13, title: 'Bài 2: Báo cáo tự động', duration: '15 phút' },
    ]
  };

  // Thêm 2 module mới vào services
  const enhancedServices = [
    ...services,
    {
      id: 5,
      name: "Công cụ AI Marketing",
      lessons: 2,
      duration: "40 phút",
      price: 0
    },
    {
      id: 6,
      name: "Phân tích và Báo cáo",
      lessons: 2,
      duration: "35 phút",
      price: 199000
    }
  ];

  return (

    <div className="p-6">
  <h2 className="text-xl font-semibold mb-4">Nội dung khóa học</h2>

  {/* Thêm space-y-4 để có khoảng cách giữa các module */}
  <div className="space-y-4">
    {services.map((module) => (
      <div
        key={module.id}
        className="border border-gray-200 rounded-md p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 shadow-sm hover:shadow-md"
        onClick={() => toggleExpand(module.id)}
      >
        <div className="flex justify-between items-center">
          <div className="font-semibold">{module.name}</div>
          <ChevronDown
            size={20}
            className={`transform transition-transform duration-300 ${
              expandedModule === module.id ? "rotate-180" : ""
            }`}
          />
        </div>

        <div className="flex items-center text-sm text-gray-600 mt-1 mb-4">
          <Clock size={14} className="mr-1" />
          <span>
            {module.lessons} bài giảng • {module.duration}
          </span>
        </div>

        <div
          className={`font-semibold mt-2 ${
            module.price === 0 ? "text-green-600" : "text-blue-600"
          }`}
        >
          {module.price === 0 ? "Miễn phí" : "Có phí"}
        </div>

        {/* Nội dung chi tiết chỉ hiển thị khi module được bung ra */}
        {expandedModule === module.id && (
          <div className="mt-4 text-gray-700">
            <ul className="list-none space-y-2">
              {moduleDetails[String(module.id) as keyof typeof moduleDetails]?.map((lesson) => (
                <li key={lesson.id} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  <span className="flex-1">{lesson.title}</span>
                  <span className="text-gray-500 ml-4">{lesson.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
</div>
  );
};

export default ModulesSection;