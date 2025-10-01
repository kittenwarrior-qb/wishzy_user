import { z } from "zod";
import { msgSchema} from "./base.schema";

export const courseRefSchema = z.object({
  _id: z.string(),
  courseName: z.string(),
  slug: z.string(),
});

export const lectureSchema = z.object({
  _id: z.string(),
  lectureName: z.string(),
  videoUrl: z.string(),
  duration: z.number(),
  chapter: z.string(),
  isPreview: z.boolean(),
  status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  slug: z.string(),
  __v: z.number(),
});

export const chapterSchema = z.object({
  _id: z.string(),
  chapterName: z.string(),
  totalLesson: z.number(),
  chapterDuration: z.number(),
  status: z.boolean(),
  course: courseRefSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  slug: z.string(),
  __v: z.number(),
  lectures: z.array(lectureSchema),
});

export const chapterListResponseSchema = z.object({
  msg: z.string().optional(),
  chapters: z.array(chapterSchema),
});

export type CourseRef = z.infer<typeof courseRefSchema>;
export type Lecture = z.infer<typeof lectureSchema>;
export type Chapter = z.infer<typeof chapterSchema>;
export type ChapterListResponse = z.infer<typeof chapterListResponseSchema>;
