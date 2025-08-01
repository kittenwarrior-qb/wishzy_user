import { courseResponse } from "@/types/api/courseResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const CourseService = {
    getHotCourse: async():Promise<courseResponse> => {
        try {
            const res = await fetch(`${apiUrl}/course/hot-course`, {
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


