import { z } from "zod";
import { msgSchema, paginationSchema } from "./base.schema";

export const courseListSchema = z.object({
  _id: z.string(),
  courseName: z.string(),
  price: z.number(),
  status: z.boolean(),
  rating: z.number(),
  description: z.string().optional(), 
  thumbnail: z.string().optional(),
  numberOfStudents: z.number(),
  level: z.string(),
  totalDuration: z.number(),
  subject: z.object({
    subjectName: z.string(),
    slug: z.string()
  }),
  grade: z.object({
    gradeName: z.string()
  }),
  createdBy: z.object({
    email: z.string(),
    fullName: z.string()
  }),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  slug: z.string()
});

export const courseDetailSchema = z.object({
  _id: z.string(),
  courseName: z.string(),
  price: z.number(),
  status: z.boolean(),
  rating: z.number(),
  description: z.string().optional(), 
  thumbnail: z.string().optional(),
  numberOfStudents: z.number(),
  level: z.string(),
  requirements: z.array(z.string()).optional(),
  totalDuration: z.number(),
  subject: z.object({
    _id: z.string().optional(),
    subjectName: z.string(),
    grade: z.object({
      _id: z.string(),
      gradeName: z.string()
    }).optional(),
    slug: z.string()
  }),
  createdBy: z.object({
    _id: z.string().optional(),
    email: z.string(),
    fullName: z.string()
  }),
  createdAt: z.string(),
  slug: z.string()
});

export const courseListResponseSchema = msgSchema.extend({
  courses: z.array(courseListSchema),
  pagination: paginationSchema
});

export const courseDetailResponseSchema = msgSchema.extend({
  course: courseDetailSchema
});

export type CourseList = z.infer<typeof courseListSchema>;
// export type CourseDetail = z.infer<typeof courseDetailSchema>;

export type CourseListResponse = z.infer<typeof courseListResponseSchema>;
export type CourseDetailResponse = z.infer<typeof courseDetailResponseSchema>;


export interface CourseDetail {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  duration: string;
  level: string;
  studyFormat: string;
  price: number;
  image: string;
  description: string;
  modules: CourseModule[];
  instructors: Instructor[];
  reviews: Review[];
  relatedCourses: RelatedCourse[];
}

export interface CourseModule {
  id: string;
  name: string;
  lessons: number;
  duration: string;
  price: number;
}

export interface Instructor {
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export interface RelatedCourse {
  id: string;
  name: string;
  info: string;
}