// 'use client'

// import React from "react";
// import { BookOpen, Database, Cloud } from "lucide-react";
// import { RelatedCourse } from "@/types/schema/course.schema";

// interface RelatedCoursesSectionProps {
//   relatedCourses: RelatedCourse[];
// }

// const RelatedCoursesSection = ({ relatedCourses }: RelatedCoursesSectionProps) => {
//   const getIcon = (index: number) => {
//     const icons = [BookOpen, Database, Cloud];
//     return icons[index % icons.length];
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Khóa học liên quan</h2>
//       <div className="space-y-4">
//         {relatedCourses.map((course, index) => {
//           const IconComponent = getIcon(index);
//           return (
//             <div key={course.id} className="flex items-center p-4 border border-gray-200 rounded-md">
//               <div className="text-primary text-xl mr-4">
//                 <IconComponent size={24} />
//               </div>
//               <div>
//                 <h3 className="font-semibold">{course.name}</h3>
//                 <p className="text-gray-600 text-sm">{course.info}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default RelatedCoursesSection;


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function KhoaHocLienQuan() {
  const courses = [
    {
      id: "1",
      name: "React Native Mobile Development",
      info: "Cùng giảng viên • 45 giờ học",
      img: "https://techvccloud.mediacdn.vn/2020/7/13/137-1594616701190893786687-crop-15946167118531494150206.png",
    },
    {
      id: "2",
      name: "Database Design & Optimization",
      info: "Cùng chủ đề • 35 giờ học",
      img: "https://3.imimg.com/data3/LY/NP/MY-14896812/javascript-500x500.png",
    },
    {
      id: "3",
      name: "Cloud Computing với AWS",
      info: "Cùng chủ đề • 40 giờ học",
      img: "https://cdn.martech.zone/wp-content/uploads/2018/12/how-big-is-amazon-aws.png",
    },
    {
      id: "4",
      name: "React Native Mobile Development",
      info: "Cùng giảng viên • 45 giờ học",
      img: "https://t4.ftcdn.net/jpg/07/22/56/33/360_F_722563317_xmq0wN26xtwWWS5Bpo6cWg9xnPv0hhjU.webp",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Tiêu đề section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📚 Khóa học liên quan
      </h2>

      {/* Grid 4 cột */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="border rounded-2xl shadow-md hover:shadow-lg transition p-3">
            <img
              src={course.img}
              alt={course.name}
              className="w-full h-40 object-cover rounded-xl"
            />
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{course.name}</CardTitle>
              <CardDescription className="text-gray-500 text-sm">{course.info}</CardDescription>
            </CardHeader>
            <CardContent>
            <Button className="w-35 bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
              Xem chi tiết
            </Button>  
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
