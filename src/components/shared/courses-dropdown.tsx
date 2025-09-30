// src/components/layouts/courses-dropdown.tsx

"use client";

import React, { useState } from "react";
import { ChevronDown, BookOpen, TrendingUp, Star } from "lucide-react";
import { AnimatedLink } from "@/components/shared/animated-link";

const dropdownItems = [
  { label: "Tất cả khóa học", href: "/courses", icon: BookOpen },
  { label: "Khóa học hot", href: "/courses/hot", icon: TrendingUp },
  { label: "Khóa học đánh giá cao", href: "/courses/top-rated", icon: Star },
];

export const CoursesDropdown = () => {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  return (
    <div
      className="relative group text-[15px]"
      onMouseEnter={() => setCoursesDropdownOpen(true)}
      onMouseLeave={() => setCoursesDropdownOpen(false)}
    >
      <button className="flex items-center gap-1 px-3 py-2 text-base-content hover:text-primary transition-colors duration-200 font-medium">
        Khóa học
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            coursesDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {coursesDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {dropdownItems.map((item) => (
            <AnimatedLink
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 text-base-content hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors duration-200"
            >
              <item.icon size={16} />
              {item.label}
            </AnimatedLink>
          ))}
        </div>
      )}
    </div>
  );
};