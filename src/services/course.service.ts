import {
  courseListResponseSchema,
  courseDetailResponseSchema,
  CourseListResponse,
  CourseDetailResponse,
} from "@/types/schema/course.schema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// const apiUrl = "http://localhost:8000/api";

export const CourseService = {
  getHotCourse: async (): Promise<CourseListResponse> => {
    const res = await fetch(`${apiUrl}/course/hot-course`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch hot courses");

    const data = await res.json();
    return courseListResponseSchema.parse(data);
  },

  getCourseList: async (): Promise<CourseListResponse> => {
    const res = await fetch(`${apiUrl}/course`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch course list");

    const data = await res.json();
    return courseListResponseSchema.parse(data);
  },

  getCourseBySlug: async (slug: string): Promise<CourseDetailResponse> => {
    debugger
    const res = await fetch(`${apiUrl}/course/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Failed to fetch course: ${slug}`);

    const data = await res.json();
    return courseDetailResponseSchema.parse(data);
  },
};
