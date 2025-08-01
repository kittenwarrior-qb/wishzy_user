import { subjectResponse } from "@/types/api/subjectResponse";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const SubjectService = {
    getGrades: async():Promise<subjectResponse> => {
        try {
            const res = await fetch(`${apiUrl}/subject`, {
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


