import { z } from "zod";
import { msgSchema, paginationSchema } from "./base.schema";

export const gradeSchema = z.object({
  _id: z.string(),
  gradeName: z.string(),
  status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  slug: z.string(),
});

export const gradeListResponseSchema = msgSchema.extend({
  grades: z.array(gradeSchema),
  pagination: paginationSchema
});

export type Grade = z.infer<typeof gradeSchema>;
export type GradeListResponse = z.infer<typeof gradeListResponseSchema>;
