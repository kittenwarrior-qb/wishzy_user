import { z } from "zod";

export const msgSchema = z.object({
  msg: z.string(),
});

export const paginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  pageSizes: z.number(),
  totalItems: z.number(),
});
