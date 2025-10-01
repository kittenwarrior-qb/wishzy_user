import {
  chapterListResponseSchema,
  ChapterListResponse,
} from "@/types/schema/chapter.schema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const ChapterService = {
  getChapterBySlug: async (slug: string): Promise<ChapterListResponse> => {
    const res = await fetch(`${apiUrl}/chapter/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch chapter");

    const data = await res.json();
    return chapterListResponseSchema.parse(data);
  },
};