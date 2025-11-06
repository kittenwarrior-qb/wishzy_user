"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Mic, Search, BookOpen, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import { gsap } from "gsap";
import { CourseList } from "@/types/schema/course.schema";
import { CourseService, GetCourseListParams } from "@/services/course.service";

interface SearchComponentProps {
  variant: "sticky" | "normal";
  activeDropdown?: string | null;
  className?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  variant,
  activeDropdown,
  className = "",
}) => {
  const [courses, setCourses] = useState<CourseList[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchQuery.trim();
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      } else {
        router.push('/search');
      }
      setIsSearchDropdownOpen(false);
    }
  };

  const fetchCourses = useCallback(async (query: string = "") => {
    try {
      setLoading(true);
      const params: GetCourseListParams = {
        courseName: query,
        limit: 8,
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

  const debouncedFetch = useCallback(
    debounce((query: string) => {
      fetchCourses(query);
    }, 500),
    [fetchCourses]
  );

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (dropdownRef.current && isSearchDropdownOpen) {
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
  }, [isSearchDropdownOpen]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedFetch(value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setIsSearchActive(true);
    setIsSearchDropdownOpen(true);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    setIsSearchActive(false);
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearchDropdownOpen(false);
    }, 200);
  };

  const handleSearchDropdownMouseEnter = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const handleSearchDropdownMouseLeave = () => {
    if (!isSearchFocused) {
      searchTimeoutRef.current = setTimeout(() => {
        setIsSearchDropdownOpen(false);
      }, 200);
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  const stickyClasses = "flex-1 h-[48px] px-4";
  const normalClasses = `w-[70%] h-[48px] px-5 transition-opacity duration-300 ${
    activeDropdown ? "opacity-0 invisible" : "opacity-100 visible"
  }`;

  return (
    <div className={`relative w-full ${className} `}>
      <div
        className={`flex items-center justify-between py-0 bg-[#fff] border border-[#ccc] rounded-[50px] transition-colors ${
          isSearchActive
            ? "border-[#939393]"
            : " hover:border-[#939393]"
        } ${variant === "sticky" ? stickyClasses : normalClasses}`}
      >
        <div className="flex items-center gap-[33px] flex-1 min-w-0">
          <Button
            variant="ghost"
            className="h-auto gap-[9px] px-0 hover:bg-transparent hidden sm:inline-flex"
          >
            <span className="font-normal text-[#000] text-sm">Tất cả</span>
            <ChevronDown className="w-2.5 h-2.5 text-[#000]" />
          </Button>
          <div className="w-px h-6 bg-zinc-600 hidden sm:block" />
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Search className="w-4 h-4 text-[#000] flex-shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học, tài liệu,..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={handleEnterPress}
              className="w-full h-full bg-transparent text-sm text-white placeholder:text-[#cccccc] focus:outline-none"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 p-0 hover:bg-transparent"
        >
          <Mic className="w-6 h-6 text-[#ffffff]" />
        </Button>
      </div>

      {isSearchDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-96 overflow-y-auto"
          style={{ opacity: 0 }}
          onMouseEnter={handleSearchDropdownMouseEnter}
          onMouseLeave={handleSearchDropdownMouseLeave}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                {searchQuery
                  ? `Kết quả cho "${searchQuery}"`
                  : "Khóa học phổ biến"}
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
                <span className="ml-2 text-sm text-gray-500">
                  Đang tìm kiếm...
                </span>
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
                    href={`/course/${course.courseName}`}
                    className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                  >
                    <div className="flex items-start gap-3">
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
                          <Image
                            src={"/logo/bg_logo_black.png"}
                            alt={course.courseName}
                            className="w-full h-full object-cover"
                            width={30}
                            height={30}
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 transition-colors line-clamp-1">
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
                            <span className="text-sm font-semibold text-[#f76d1d]">
                              {course.price.toLocaleString("vi-VN")}đ
                            </span>
                          )}

                          <div className="flex items-center gap-1">
                            {course.rating && (
                              <>
                                <Star
                                  size={12}
                                  className="text-yellow-400 fill-current"
                                />
                                <span className="text-xs text-gray-600">
                                  {course.rating}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
