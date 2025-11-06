'use client'

import React, { useEffect, useState, useRef } from "react";
import CourseListCard from "@/components/shared/course-list-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseService } from "@/services/course.service";
import { CourseList } from "@/types/schema/course.schema";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HotListSection = () => {
  const [courses, setCourses] = useState<CourseList[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5); 
  const t = useTranslations("HomePage");

  const listRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CourseService.getHotCourse();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Error fetching hot courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowMore = () => {
    if (visibleCount >= courses.length) {
      setVisibleCount(5);
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setVisibleCount((prev) => Math.min(prev + 5, courses.length));
    }
  };

  const remaining = courses.length - visibleCount;
  const showMoreLabel =
    remaining > 0
      ? `Hiển thị thêm ${remaining >= 5 ? 5 : remaining}`
      : "Hiện ít hơn";

  return (
    <div ref={listRef} className="py-10 max-w-[2400px] mx-auto ">
      <div className="mb-6  px-[35px] ">
        <p className="font-semibold text-[22px] mb-2">{t("HotListSection.name")}</p>
        <p className="font-semibold text-[30px] mb-2">{t("HotListSection.title")}</p>
        <p className="text-[18px]">{t("HotListSection.description")}</p>
      </div>

      {loading ? (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-col max-md:flex-row max-md:items-center max-md:h-[140px] rounded-2xl border overflow-hidden"
        >
          <Skeleton className="w-full md:w-full max-md:w-[40%] h-[160px] max-md:h-full rounded-l-2xl" />
          <div className="p-3 flex flex-col gap-2 flex-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <CourseListCard courses={courses.slice(0, visibleCount)} />
  )}


      {courses.length > 5 && (
        <div className="flex gap-3 mt-6   px-[35px]">
          <Button onClick={handleShowMore} variant="default" className="text-[14px]">
            {showMoreLabel}
          </Button>
          <Button variant="outline" className="text-[14px]">
          <Link href="/search">
            {t("HotListSection.viewAll") || "Xem tất cả"}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotListSection;
