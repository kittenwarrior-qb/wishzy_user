import { gradeResponse } from "@/types/api/gradeResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const GradeService = {
    getGrades: async():Promise<gradeResponse> => {
        try {
            const res = await fetch(`${apiUrl}/Grade`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.json()
        } catch (err){
            throw err
        }
    }


}


