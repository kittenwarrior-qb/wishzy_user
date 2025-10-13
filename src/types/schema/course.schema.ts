import { z } from "zod";
import { msgSchema, paginationSchema } from "./base.schema";
import { gradeSchema } from "./grade.schema";
import { subjectSchema } from "./subject.schema";
import { userSchema } from "./user.schema";

const gradeRefSchema = gradeSchema.pick({
  _id: true,
  gradeName: true
});

const subjectRefSchema = subjectSchema.pick({
  _id: true,
  subjectName: true,
  slug: true
}).extend({
  grade: gradeRefSchema
}).partial();

const createdBySchema = userSchema.pick({
  _id: true,
  email: true,
  fullName: true
}).extend({
  avatar: z.string().optional()
});

const baseCourseSchema = z.object({
  _id: z.string(),
  courseName: z.string(),
  price: z.number(),
  status: z.boolean(),
  rating: z.number(),
  numberOfStudents: z.number(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  requirements: z.array(z.string()).optional(),
  totalDuration: z.number(),
  subject: subjectRefSchema.optional(),
  createdBy: createdBySchema.nullable(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  slug: z.string(),
  __v: z.number().optional(),
  averageRating: z.number().optional(),
});

export const courseListSchema = baseCourseSchema.extend({
  description: z.string().optional(),
  thumbnail: z.string().optional()
});

export const courseDetailSchema = baseCourseSchema.extend({
  description: z.string().optional(),
  thumbnail: z.string().optional()
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
export type CreatedBy = z.infer<typeof createdBySchema>;
export type SubjectRef = z.infer<typeof subjectRefSchema>;
export type GradeRef = z.infer<typeof gradeRefSchema>;