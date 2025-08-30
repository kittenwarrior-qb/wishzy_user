"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CourseService } from "@/services/course.service";
import { CourseList } from "@/types/schema/course.schema";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const filterButtons = [
  { text: "Tất cả", active: true },
  { text: "Toán", active: false },
  { text: "Ngữ văn", active: false },
  { text: "Ngoại ngữ", active: false },
  { text: "Khoa học tự nhiên", active: false },
];

const CourseDecision = () => {
  const [courses, setCourses] = useState<CourseList[]>([]);
  const [loading, setLoading] = useState(true);
  const [gradeId, setGradeId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const limit = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await CourseService.getCourseList({
          grade: gradeId || undefined,
          page,
          limit,
        });
        setCourses(data?.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gradeId, page]);

  return (
    <div className="flex flex-col md:flex-row max-w-[1280px] w-full mx-auto gap-6 py-8 md:py-10 min-h-[583px] bg-[#f2f5fa] rounded-[20px] px-4 sm:px-6 md:px-10">
      {/* Sidebar */}
      <aside className="flex flex-col w-full md:max-w-[235px] items-start gap-4 md:gap-6">
        <h2 className="font-semibold text-black text-2xl md:text-[28px] leading-[36px] md:leading-[42px]">
          Chọn môn học phù hợp
        </h2>
        <p className="text-base text-black leading-6">
          Có được kiến thức và kỹ năng bạn cần.
        </p>
        <Button
          variant="outline"
          className="h-11 md:h-12 px-4 md:px-[15px] text-sm md:text-base"
        >
          Khám phá tất cả
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-4">
        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Select onValueChange={(val) => setGradeId(val)}>
            <SelectTrigger className="h-10 px-3 w-[140px] sm:w-[160px] text-sm sm:text-base">
              <SelectValue placeholder="Chọn khối" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Khối 1</SelectItem>
              <SelectItem value="2">Khối 2</SelectItem>
              <SelectItem value="3">Khối 3</SelectItem>
              <SelectItem value="4">Khối 4</SelectItem>
            </SelectContent>
          </Select>

          <Separator
            orientation="vertical"
            className="hidden md:block h-10 w-px bg-gradient-to-b from-white via-gray-400 to-white"
          />

          {/* Filter buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {filterButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.active ? "default" : "outline"}
                className={`h-9 sm:h-10 px-3 sm:px-[11px] rounded-[12px] sm:rounded-[15px] ${
                  button.active ? "border border-base-content/30" : ""
                }`}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className="w-full h-[250px] rounded-2xl bg-gray-200 animate-pulse"
              />
            ))
          ) : courses.length > 0 ? (
            courses.map((card, index) => (
              <Card
                key={index}
                className="flex flex-col w-full rounded-2xl border border-gray-200"
              >
                <CardContent className="p-2.5">
                  <div className="w-full h-[160px] sm:h-[195px] rounded-2xl bg-gray-200 mb-2" />

                  <div className="flex flex-col gap-3 px-2 sm:px-3 py-2">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-black text-base leading-6 line-clamp-1">
                        {card.courseName}
                      </h3>
                      <p className="font-normal text-[#6f6f6f] text-sm leading-[21px] line-clamp-3">
                        {card.description}
                      </p>
                    </div>

                    <div className="text-sm leading-[21px]">
                      <span className="font-semibold text-black">
                        Nếu bạn thích:{" "}
                      </span>
                      <span className="text-[#6f6f6f]">Đang cập nhật</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h4 className="font-semibold text-black text-sm leading-[21px]">
                        Thông tin
                      </h4>
                      <div className="flex flex-col gap-0.5 text-[#6f6f6f] text-sm leading-[21px]">
                        <div>{card.subject?.subjectName || "Chưa có môn"}</div>
                        <div>{card.createdBy?.fullName || "Chưa có GV"}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>Không có khóa học nào</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-3 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Trang trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={courses.length < limit}
          >
            Trang sau
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CourseDecision;
