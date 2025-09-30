"use client";

import React, { useEffect, useState } from "react";
import CourseDetailLayout from "../../../../components/pages/detail-page/CourseDetailLayout";
import { CourseService } from "@/services/course.service";
import { useParams } from "next/navigation";

// UI model mà layout hiện đang dùng (đơn giản hoá)
type UICourseDetail = {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  duration: string; // ví dụ: "60 giờ học"
  level: string;
  studyFormat: string;
  price: number;
  image: string;
  description?: string;
  modules: Array<{ id: string; name: string; lessons?: number; duration?: string; price?: number }>;
  instructors: Array<{ id: string; name: string; specialty?: string; avatar?: string }>;
  reviews: Array<{ id: string; rating: number; content: string; author: string; date: string }>;
  relatedCourses: Array<{ id: string; name: string; info: string; img: string }>;
};

export default function CourseDetailPage() {
  const params = useParams<{ slug: string; locale: string }>();
  const slug = params?.slug;

  const [course, setCourse] = useState<UICourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError(null);
        const res = await CourseService.getCourseBySlug(slug);
        const c = res.course; // schema: baseCourse fields (no modules/instructors/reviews/relatedCourses)

        // Map API -> UI model
        const ui: UICourseDetail = {
          id: c._id,
          name: c.courseName,
          rating: c.rating ?? c.averageRating ?? 0,
          totalReviews: 0,
          duration: `${c.totalDuration} giờ học`,
          level: c.level,
          studyFormat: "Học mọi lúc",
          price: c.price,
          image: c.thumbnail || "/placeholder-course.jpg",
          description: c.description ?? "",
          modules: [],
          instructors:
            c.createdBy && typeof c.createdBy._id === 'string'
              ? [{ id: c.createdBy._id, name: c.createdBy.fullName, avatar: c.createdBy.avatar }]
              : [],
          reviews: [],
          relatedCourses: [],
        };

        setCourse(ui);
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
      <div className="max-w-[1280px] mx-auto px-4 xl:px-0 py-10">
        <p className="text-red-600">{error || "Không tìm thấy khoá học"}</p>
      </div>
    );
  }

  // Truyền dữ liệu thật đã map sang layout
  return (
    <div className="max-w-[1280px] mx-auto px-4 xl:px-0">
      <CourseDetailLayout course={course} />
    </div>
  );
}
