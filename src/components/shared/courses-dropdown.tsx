// src/components/layouts/courses-dropdown.tsx

"use client";

import React, { useState } from "react";
import { ChevronDown, BookOpen, TrendingUp, Star } from "lucide-react";

export const CoursesDropdown = () => {

  return (
    <div
      className="relative group text-[15px]"
    >
      <button className="flex items-center gap-1 px-3 py-2 text-base-content hover:text-primary transition-colors duration-200 font-medium">
        Khóa học
        <ChevronDown
          size={16}
          className={`transition-transform duration-200`}
        />
      </button>

    </div>
  );
};