"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search as SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { GradeService } from "@/services/grade.service";
import { Grade } from "@/types/schema/grade.schema";
import { CourseService } from "@/services/course.service";
import { CourseList } from "@/types/schema/course.schema";

const SearchSection = () => {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const [grades, setGrades] = useState<Grade[]>([]);
  const [courses, setCourses] = useState<CourseList[]>([]);
  const [grade, setGrade] = useState<string | null>(null);
  const [course, setCourse] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const data = await GradeService.getGrades();
        setGrades(data.grades);
      } catch (err) {
        console.error("Failed to fetch grades:", err);
      }
    };
    fetchGrades();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!grade) {
        setCourses([]);
        return;
      }
      try {
        const data = await CourseService.getCourseList({ grade });
        setCourses(data.courses);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
    setCourse(null); // reset course khi đổi grade
  }, [grade]);

  const handleSearch = () => {
    if (!grade || !course) return;
    const params = new URLSearchParams();
    params.append("grade", grade);
    params.append("course", course);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="py-10">
      <h1 className="text-primary font-bold text-3xl text-center mb-5">
        {t("title")}
      </h1>

      <div className="flex w-full h-[60px] items-center justify-between px-6 relative rounded-[15px] overflow-hidden border border-solid border-base-content/30 bg-base-100 gap-3">
        <div className="flex gap-3">
          <Select value={grade || undefined} onValueChange={setGrade}>
            <SelectTrigger className="w-[180px] h-[44px]">
              <SelectValue placeholder="1. Chọn khối lớp" />
            </SelectTrigger>
            <SelectContent className="bg-base-100">
              {grades.map((g) => (
                <SelectItem
                  key={g._id}
                  value={g._id}
                  className="bg-base-100 text-base-content cursor-pointer 
                             data-[highlighted]:bg-base-300
                             data-[state=checked]:bg-base-200"
                >
                  {g.gradeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={course || undefined}
            onValueChange={setCourse}
            disabled={!grade}
          >
            <SelectTrigger className="w-[220px] h-[44px]">
              <SelectValue placeholder="2. Chọn khóa học" />
            </SelectTrigger>
            <SelectContent className="bg-base-100">
              {courses.map((c) => (
                <SelectItem
                  key={c._id}
                  value={c._id}
                  className="bg-base-100 text-base-content cursor-pointer
                             data-[highlighted]:bg-base-300
                             data-[state=checked]:bg-base-200"
                >
                  {c.courseName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-[120px] h-[44px] flex items-center gap-2 bg-primary text-white font-bold"
          onClick={handleSearch}
          disabled={!course}
        >
          <SearchIcon className="w-4 h-4" />
          <span>Tìm ngay</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchSection;
