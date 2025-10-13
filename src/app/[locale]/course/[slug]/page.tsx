"use client";

import React, { useEffect, useState } from "react";
import CourseDetailLayout from "../../../../components/pages/detail-page/CourseDetailLayout";
import { CourseService } from "@/services/course.service";
import { useParams } from "next/navigation";
import type { CourseDetail } from "@/types/schema/course.schema";
import type { Chapter, ChapterListResponse } from "@/types/schema/chapter.schema";
import { ChapterService } from "@/services/chapter.service";

export default function CourseDetailPage() {
  const params = useParams<{ slug: string; locale: string }>();
  const slug = params?.slug;

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [chapters, setChapters] = useState<Chapter[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError(null);
        const courseDetailRes = await CourseService.getCourseBySlug(slug);
        const courseChaptersRes = await ChapterService.getChapterBySlug(slug);
        
        const courseDetailData = courseDetailRes.course;
        const courseChaptersData = courseChaptersRes.chapters;

        setCourse(courseDetailData);
        setChapters(courseChaptersData);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Không thể tải khoá học";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 xl:px-0 py-10">
        <p className="text-gray-600">Đang tải khoá học...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-[1280px] mx-auto px-3 lg:px-0 py-10">
        <p className="text-red-600">{error || "Không tìm thấy khoá học"}</p>
      </div>
    );
  }
  if (!chapters) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 xl:px-0 py-10">
        <p className="text-gray-600">Đang tải nội dung khoá học...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-3 lg:px-0">
      <CourseDetailLayout course={course} chapters={chapters} />
    </div>
  );
}
