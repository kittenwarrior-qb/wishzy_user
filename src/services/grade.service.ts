import {
  gradeListResponseSchema,
  GradeListResponse
} from "@/types/schema/grade.schema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const GradeService = {
  getGrades: async (): Promise<GradeListResponse> => {
    const res = await fetch(`${apiUrl}/Grade`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch grades");

    const data = await res.json();
    return gradeListResponseSchema.parse(data);
  },
};
