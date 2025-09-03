// 'use client'

// import React from "react";
// import { Instructor } from "@/types/schema/course.schema";

// interface InstructorsSectionProps {
//   instructors: Instructor[];
// }

// // const InstructorsSection = ({ instructors }: InstructorsSectionProps) => {
// //   return (
// //     <div className="p-6 border-b border-gray-200">
// //       <h2 className="text-xl font-semibold mb-4">Giảng viên</h2>
// //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //         {instructors.map((instructor) => (
// //           <div key={instructor.id} className="text-center">
// //             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
// //               {instructor.avatar ? (
// //                 <img 
// //                   src={instructor.avatar} 
// //                   alt={instructor.name}
// //                   className="w-full h-full rounded-full object-cover"
// //                 />
// //               ) : (
// //                 <span className="text-blue-500 text-xl font-semibold">
// //                   {instructor.name.charAt(0)}
// //                 </span>
// //               )}
// //             </div>
// //             <h3 className="font-medium">{instructor.name}</h3>
// //             <p className="text-sm text-gray-600">{instructor.specialty}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };


// // const InstructorsSection = ({ instructors }: InstructorsSectionProps) => {
// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-6 text-center">Giảng viên</h2>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //         {instructors.map((instructor) => (
// //           <div
// //             key={instructor.id}
// //             className="bg-white rounded-2xl shadow-md p-6 text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl"
// //           >
// //             <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-blue-200 overflow-hidden">
// //               {instructor.avatar ? (
// //                 <img
// //                   src={instructor.avatar}
// //                   alt={instructor.name}
// //                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
// //                 />
// //               ) : (
// //                 <span className="flex items-center justify-center w-full h-full text-blue-500 text-2xl font-bold">
// //                   {instructor.name.charAt(0)}
// //                 </span>
// //               )}
// //             </div>
// //             <h3 className="text-lg font-semibold text-gray-800">{instructor.name}</h3>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };



// const InstructorsSection = ({ instructors }: InstructorsSectionProps) => {
//   if (!instructors || instructors.length === 0) return null;

//   const instructor = instructors[0]; // chỉ lấy giảng viên đầu tiên

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">Giảng viên</h2>
//       <div className="flex justify-center">
//         <div className="bg-white rounded-2xl shadow-md p-6 text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl max-w-xs">
//           <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-blue-200 overflow-hidden">
//             {instructor.avatar ? (
//               <img
//                 src={instructor.avatar}
//                 alt={instructor.name}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//               />
//             ) : (
//               <span className="flex items-center justify-center w-full h-full text-blue-500 text-2xl font-bold">
//                 {instructor.name.charAt(0)}
//               </span>
//             )}
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800">{instructor.name}</h3>
//           {instructor.specialty && (
//             <p className="text-sm text-gray-600">{instructor.specialty}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorsSection;


"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
export default function GiangVienPage() {
  // vì chỉ có 1 giảng viên nên hardcode hoặc fetch cũng được
  const giangVien = {
    ten: "Huỳnh Duy Ánh",
    chuyenMon: "Lập trình Web Fullstack",
    kinhNghiem: "5 năm giảng dạy",
    moTa: "Giảng viên tận tâm, chuyên đào tạo các khóa về React, Node.js, MongoDB.",
  }

  return (
    <div className="max-w-lg mx-auto ">
      <Card className="border rounded-2xl shadow-md p-4 bg-white">
        <img src="https://aobongda.net/pic/Images/Module/News/images/t2.jpg" alt="" />
        <CardHeader>
          <CardTitle className="text-xl font-bold">{giangVien.ten}</CardTitle>
          <CardDescription className="text-gray-500">{giangVien.chuyenMon}</CardDescription>
        </CardHeader>
        <CardContent className="mt-2 space-y-2">
          <p><span className="font-medium">Kinh nghiệm:</span> {giangVien.kinhNghiem}</p>
          <p><span className="font-medium">Giới thiệu:</span> {giangVien.moTa}</p>
        </CardContent>
        <CardFooter className="mt-4 flex justify-end">
          <Button>Liên hệ</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
