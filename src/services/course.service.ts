import {
  courseListResponseSchema,
  courseDetailResponseSchema,
  CourseListResponse,
  CourseDetailResponse,
} from "@/types/schema/course.schema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type GetCourseListParams = {
  courseName?: string;
  page?: number;
  limit?: number;
  grade?: string;
  maxPrice?: number;
  minPrice?: number;
  rating?: number;
  level?: string;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
  orderDate?: number;
  subjects?: string[];
};

export const CourseService = {
  getHotCourse: async (): Promise<CourseListResponse> => {
    try {
      const res = await fetch(`${apiUrl}/course/hot-course`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch hot courses: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return courseListResponseSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Hot courses service error: ${error.message}`);
      }
      throw new Error("Unknown error occurred while fetching hot courses");
    }
  },

  getCourseList: async (
    params?: GetCourseListParams
  ): Promise<CourseListResponse> => {
    try {
      const query = new URLSearchParams();
      
      Object.entries(params ?? {})
        .filter(([, v]) => v !== undefined && v !== null && v !== "")
        .forEach(([k, v]) => {
          if (k === 'subjects' && Array.isArray(v)) {
            v.forEach(subject => query.append('subjects', subject));
          } else {
            query.append(k, String(v));
          }
        });

      const url = `${apiUrl}/course${
        query.toString() ? `?${query.toString()}` : ""
      }`;

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch course list: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return courseListResponseSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Course list service error: ${error.message}`);
      }
      throw new Error("Unknown error occurred while fetching course list");
    }
  },

  getCourseBySlug: async (slug: string): Promise<CourseDetailResponse> => {
    try {
      if (!slug || slug.trim() === "") {
        throw new Error("Course slug is required");
      }

      const res = await fetch(`${apiUrl}/course/${encodeURIComponent(slug)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch course "${slug}": ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return courseDetailResponseSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Course detail service error: ${error.message}`);
      }
      throw new Error(`Unknown error occurred while fetching course: ${slug}`);
    }
  },
};
