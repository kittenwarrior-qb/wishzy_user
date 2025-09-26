import { z } from "zod";
import { msgSchema, paginationSchema } from "./base.schema";

export const gradeSchema = z.object({
  _id: z.string(),
  gradeName: z.string(),
  status: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  slug: z.string().optional(),
});

export const gradeListResponseSchema = msgSchema.extend({
  grades: z.array(gradeSchema),
  pagination: paginationSchema
});

export const gradeDetailResponseSchema = msgSchema.extend({
  grade: gradeSchema
});

export type Grade = z.infer<typeof gradeSchema>;
export type GradeListResponse = z.infer<typeof gradeListResponseSchema>;
export type GradeDetailResponse = z.infer<typeof gradeDetailResponseSchema>;
