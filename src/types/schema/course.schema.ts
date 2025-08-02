import { z } from "zod";
import { msgSchema, paginationSchema } from "./base.schema";

export const courseListSchema = z.object({
  _id: z.string(),
  courseName: z.string(),
  price: z.number(),
  status: z.boolean(),
  rating: z.number(),
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
  slug: z.string()
});

export const courseDetailSchema = z.object({
  _id: z.string(),
  courseName: z.string(),
  price: z.number(),
  status: z.boolean(),
  rating: z.number(),
  numberOfStudents: z.number(),
  level: z.string(),
  requirements: z.array(z.unknown()),
  totalDuration: z.number(),
  subject: z.object({
    _id: z.string(),
    subjectName: z.string(),
    grade: z.object({
      _id: z.string(),
      gradeName: z.string()
    }),
    slug: z.string()
  }),
  createdBy: z.object({
    _id: z.string(),
    email: z.string(),
    fullName: z.string()
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
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
export type CourseDetail = z.infer<typeof courseDetailSchema>;

export type CourseListResponse = z.infer<typeof courseListResponseSchema>;
export type CourseDetailResponse = z.infer<typeof courseDetailResponseSchema>;
