import {
    subjectListResponseSchema,
    SubjectListResponse
  } from "@/types/schema/subject.schema";
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  export const SubjectService = {
    getAllSubjects: async (page: number = 1, limit: number = 20): Promise<SubjectListResponse> => {
      const res = await fetch(`${apiUrl}/subject?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) throw new Error("Failed to fetch subjects");
  
      const data = await res.json();
      return subjectListResponseSchema.parse(data);
    },
  
    getSubjectsByGrade: async (gradeId: string, page: number = 1, limit: number = 20): Promise<SubjectListResponse> => {
      const res = await fetch(`${apiUrl}/subject?grade=${gradeId}&page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) throw new Error("Failed to fetch subjects by grade");
  
      const data = await res.json();
      return subjectListResponseSchema.parse(data);
    },
  
    getSubjects: async (params: {
      page?: number;
      limit?: number;
      grade?: string;
      subjectName?: string;
      status?: boolean;
    } = {}): Promise<SubjectListResponse> => {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.grade) queryParams.append('grade', params.grade);
      if (params.subjectName) queryParams.append('subjectName', params.subjectName);
      if (params.status !== undefined) queryParams.append('status', params.status.toString());
  
      const res = await fetch(`${apiUrl}/subject?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) throw new Error("Failed to fetch subjects");
  
      const data = await res.json();
      return subjectListResponseSchema.parse(data);
    }
  };