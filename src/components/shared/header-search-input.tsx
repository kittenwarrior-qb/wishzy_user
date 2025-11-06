'use client'

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatedLink } from "../shared/animated-link";
import { CourseService } from "@/services/course.service";
import { CourseList } from "@/types/schema/course.schema";

export const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CourseList[]>([]);
  const [courses, setCourses] = useState<CourseList[]>([]);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const keywordList = ["ReactJS", "React Native", "Redux", "Next.js", "Node.js", "Typescript"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await CourseService.getCourseList();
        setCourses(data.courses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = debounce((q: string) => {
    if (!q) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const keywordFiltered = keywordList.filter((k) =>
      k.toLowerCase().includes(q.toLowerCase())
    );
    setSuggestions(keywordFiltered);

    const filtered = courses.filter(
      (c) =>
        c.courseName.toLowerCase().includes(q.toLowerCase()) ||
        (c.createdBy?.fullName?.toLowerCase().includes(q.toLowerCase()) ?? false)
    );
    setResults(filtered);
  }, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
    setOpen(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uniqueInstructors = Array.from(
    new Map(
      results
        .filter((c) => c.createdBy?.fullName)
        .map((c) => [c.createdBy!.fullName, c])
    ).values()
  );

  const allItems = [
    ...suggestions.map((s) => ({ type: "suggestion" as const, value: s })),
    ...results.map((c) => ({ type: "course" as const, value: c })),
    ...uniqueInstructors.map((i) => ({ type: "instructor" as const, value: i })),
  ].slice(0, 10); // giới hạn 10 item

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Search courses or instructors..."
          className="pl-10 pr-4 w-64"
          onFocus={() => setOpen(true)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      {open && query && allItems.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 w-[24rem] bg-white shadow-lg rounded-lg border border-base-300 z-50">
          {allItems.map((item, idx) => {
            if (item.type === "suggestion") {
              return (
                <li
                  key={`suggest-${item.value}-${idx}`}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-neutral/10 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-gray-500" />
                  <AnimatedLink
                    href={`/search?query=${encodeURIComponent(item.value)}`}
                    className="text-sm text-gray-700"
                  >
                    {item.value}
                  </AnimatedLink>
                </li>
              );
            }

            if (item.type === "course") {
              const course = item.value as CourseList;
              return (
                <li
                  key={`course-${course._id}`}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-neutral/10 cursor-pointer"
                >
                  <Image
                    src={course.thumbnail || "https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png"}
                    alt={course.courseName}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <AnimatedLink
                      href={`/courses/${course.slug}`}
                      className="font-medium text-sm"
                    >
                      {course.courseName}
                    </AnimatedLink>
                    <p className="text-xs text-gray-500">Khóa học</p>
                  </div>
                </li>
              );
            }

            if (item.type === "instructor") {
              const inst = item.value as CourseList;
              if (!inst.createdBy) return null;
              return (
                <li
                  key={`instructor-${inst.createdBy.email}`}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-neutral/10 cursor-pointer"
                >
                  <Image
                    src={"https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png"}
                    alt={inst.createdBy.fullName}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <AnimatedLink
                      href={`/instructors/${inst.createdBy.email}`}
                      className="text-sm font-medium text-gray-700"
                    >
                      {inst.createdBy.fullName}
                    </AnimatedLink>
                    <p className="text-xs text-gray-500">Giảng viên</p>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
};
