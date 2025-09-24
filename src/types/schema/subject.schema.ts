import { z } from "zod";
import { msgSchema, paginationSchema } from "./base.schema";

const gradeRefSchema = z.object({
  _id: z.string(),
  gradeName: z.string(),
  slug: z.string()
});

export const subjectSchema = z.object({
  _id: z.string(),
  subjectName: z.string(),
  status: z.boolean(),
  grade: gradeRefSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  slug: z.string(),
});

export const subjectListResponseSchema = msgSchema.extend({
  subjects: z.array(subjectSchema),
  pagination: paginationSchema
});

export const subjectDetailResponseSchema = msgSchema.extend({
  subject: subjectSchema
});

export type Subject = z.infer<typeof subjectSchema>;
export type SubjectListResponse = z.infer<typeof subjectListResponseSchema>;
export type SubjectDetailResponse = z.infer<typeof subjectDetailResponseSchema>;
export type GradeRef = z.infer<typeof gradeRefSchema>;