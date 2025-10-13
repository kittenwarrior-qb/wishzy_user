"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import debounce from "lodash/debounce";
import { Search, BookOpen, Clock, Star } from "lucide-react";
import { gsap } from "gsap";
import { CourseList } from "@/types/schema/course.schema";
import { CourseService, GetCourseListParams } from "@/services/course.service";
import Image from "next/image";

interface SearchDropdownProps {
  children: React.ReactNode;
}

export const SearchDropdown = ({ children }: SearchDropdownProps) => {
  const [courses, setCourses] = useState<CourseList[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch courses with search query
  const fetchCourses = useCallback(async (query: string = "") => {
    try {
      setLoading(true);
      const params: GetCourseListParams = {
        courseName: query,
        limit: 8, // Limit results for dropdown
        page: 1,
      };
      
      const data = await CourseService.getCourseList(params);
      setCourses(data?.courses || []);
    } catch (error) {
      console.error("fetchCourses error:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search function
  const debouncedFetch = useCallback(
    debounce((query: string) => {
      fetchCourses(query);
    }, 500),
    [fetchCourses]
  );

  // Initial load - fetch popular courses
  useEffect(() => {
    fetchCourses(); // Load initial popular courses
  }, [fetchCourses]);

  // GSAP Animation for dropdown
  useEffect(() => {
    if (dropdownRef.current && isOpen) {
      gsap.fromTo(
        dropdownRef.current,
        {
          opacity: 0,
          y: -10,
          scale: 0.98,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [isOpen]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedFetch(value);
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Handle blur with delay
  const handleBlur = () => {
    setIsFocused(false);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Handle dropdown mouse enter/leave
  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isFocused) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f76d1d] focus:border-transparent"
        />
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-96 overflow-y-auto"
          style={{ opacity: 0 }}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                {searchQuery ? `Kết quả cho "${searchQuery}"` : "Khóa học phổ biến"}
              </h3>
              {courses.length > 0 && (
                <span className="text-xs text-gray-500">
                  {courses.length} khóa học
                </span>
              )}
            </div>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#f76d1d]"></div>
                <span className="ml-2 text-sm text-gray-500">Đang tìm kiếm...</span>
              </div>
            )}

            {!loading && courses.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <BookOpen size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Không tìm thấy khóa học nào cho &quot;{searchQuery}&quot;
                </p>
              </div>
            )}

            {!loading && courses.length > 0 && (
              <div className="space-y-2">
                {courses.map((course) => (
                  <Link
                    key={course._id}
                    href={`/course/${course.slug}`}
                    className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Course Image */}
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex-shrink-0 overflow-hidden">
                        {course.thumbnail ? (
                          <Image
                            src={course.thumbnail}
                            alt={course.courseName}
                            className="w-full h-full object-cover"
                            width={30}
                            height={30}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen size={16} className="text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Course Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100  transition-colors line-clamp-1">
                          {course.courseName}
                        </h4>
                        
                        <div className="flex items-center gap-2 mt-1">
                          {course.createdBy?.fullName && (
                            <span className="text-xs text-gray-500">
                              {course.createdBy?.fullName}
                            </span>
                          )}
                          
                          
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {course.price && (
                            <span className="text-sm font-semibold ">
                              {course.price.toLocaleString('vi-VN')}đ
                            </span>
                          )}
                          
                          
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* View All Results */}
            {!loading && courses.length > 0 && searchQuery && (
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                <Link
                  href={`/courses?search=${encodeURIComponent(searchQuery)}`}
                  className="block text-center py-2 text-sm font-medium text-[#f76d1d] hover:text-[#e55a0f] transition-colors"
                >
                  Xem tất cả kết quả cho &quot;{searchQuery}&quot;
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};