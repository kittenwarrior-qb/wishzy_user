'use client'

import React from "react";
import { Clock, Users, Flag, Star } from "lucide-react";

interface CourseDetail {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  duration: string;
  level: string;
  studyFormat: string;
  price: number;
  image: string;
}

const CourseHeader = ({ course }: { course: CourseDetail }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                  className={i < Math.floor(course.rating) ? "" : "text-yellow-400"}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {course.rating} ({course.totalReviews} đánh giá)
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-2" />
              <span>{course.studyFormat}</span>
            </div>
            <div className="flex items-center">
              <Flag size={16} className="mr-2" />
              <span>Trình độ: {course.level}</span>
            </div>
          </div>
        </div>
        <div className="text-primary text-2xl font-bold mt-4 md:mt-0">
          {course.price.toLocaleString('vi-VN')}₫
        </div>
      </div>
      <img 
        src={course.image} 
        alt={course.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <button className="w-full bg-primary text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
        Đăng ký khóa học
      </button>
    </div>
  );
};

export default CourseHeader;