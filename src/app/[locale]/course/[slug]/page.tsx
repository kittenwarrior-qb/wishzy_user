// import { CourseService } from '@/services/course.service'
// import CourseDetailLayout from '@/components/pages/detail-page/course-detail-layout';
// import { notFound } from 'next/navigation'

// const mockCourseDetail = {
//   _id: "64f9a2c1b1234567890abcde",
//   courseName: "Toán Lớp 1 - Cơ Bản và Nâng Cao",
//   price: 500000,
//   status: true,
//   rating: 4.5,
//   description: "Khóa học giúp học sinh lớp 1 nắm vững kiến thức toán cơ bản và phát triển tư duy logic qua các bài tập nâng cao.",
//   thumbnail: "https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png",
//   numberOfStudents: 120,
//   level: "Beginner",
//   requirements: [
//     "Biết đọc và viết số từ 1 đến 100",
//     "Có khả năng tập trung trong 30 phút"
//   ],
//   totalDuration: 3600, // tính bằng phút hoặc giây tùy quy ước của bạn
//   subject: {
//     _id: "64f9a2c1b1234567890abcd1",
//     subjectName: "Toán học",
//     grade: {
//       _id: "64f9a2c1b1234567890abcd2",
//       gradeName: "Lớp 1"
//     },
//     slug: "toan-hoc-lop-1"
//   },
//   createdBy: {
//     _id: "64f9a2c1b1234567890abcd3",
//     email: "giaovien@example.com",
//     fullName: "Nguyễn Văn A"
//   },
//   createdAt: "2025-08-26T14:00:00.000Z",
//   slug: "toan-lop-1-co-ban-va-nang-cao"
// };

// export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
//   const { slug } = await params

//   try {
//     // const res = await CourseService.getCourseBySlug(slug)
//     // if (!res || !res.course) {
//     //   return notFound()
//     // }

//     return <CourseDetailLayout course={mockCourseDetail} />
//   } catch (err) {
//     console.error('Failed to fetch course:', err)
//     return notFound()
//   }
// }

'use client'

import React from "react";
import CourseDetailLayout from "../../../../components/pages/detail-page/CourseDetailLayout";
import { CourseDetail } from "@/types/schema/course.schema";

const CourseDetailPage = () => {

  const courseData: CourseDetail = {
    id: "1",
    name: "Lập trình Web Chuyên Sâu",
    rating: 4.8,
    totalReviews: 128,
    duration: "60 giờ học",
    level: "Trung cấp",
    studyFormat: "Học mọi lúc",
    price: 1299000,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: `Khóa học Lập trình Web Chuyên Sâu cung cấp cho bạn những kiến thức toàn diện về phát triển web hiện đại. Bạn sẽ học được cách xây dựng website từ cơ bản đến nâng cao sử dụng các công nghệ mới nhất.

Khóa học bao gồm:
- HTML5 & CSS3 nâng cao với Flexbox và Grid
- JavaScript hiện đại (ES6+) và các design pattern
- React.js với Hooks, Context API và Redux
- Node.js, Express.js và MongoDB
- Deploy ứng dụng lên cloud server

Sau khi hoàn thành khóa học, bạn sẽ có đủ kỹ năng để ứng tuyển vào các vị trí Frontend Developer, Backend Developer hoặc Fullstack Developer.`,
    modules: [
      { 
        id: "1", 
        name: "HTML5 & CSS3 Nâng cao", 
        lessons: 12, 
        duration: "8 giờ",
        price: 0
      },
      { 
        id: "2", 
        name: "JavaScript Hiện đại", 
        lessons: 18, 
        duration: "12 giờ",
        price: 500000
      },
      { 
        id: "3", 
        name: "React.js Framework", 
        lessons: 15, 
        duration: "10 giờ",
        price: 500000
      },
      { 
        id: "4", 
        name: "Node.js & Express", 
        lessons: 14, 
        duration: "9 giờ",
        price: 500000
      }
    ],
    instructors: [
      { 
        id: "1", 
        name: "Huỳnh Duy Ánh", 
        specialty: "Frontend Developer",
        avatar: "https://aobongda.net/pic/Images/Module/News/images/t2.jpg"
      },
      // { 
      //   id: "2", 
      //   name: "Huỳnh Đông Quân", 
      //   specialty: "Backend Developer",
      //   avatar: "https://aobongda.net/pic/Images/Module/News/images/t2.jpg"
      // },
      // { 
      //   id: "3", 
      //   name: "Lê Thị Phương Hoài", 
      //   specialty: "Fullstack Developer",
      //   avatar: "https://aobongda.net/pic/Images/Module/News/images/t2.jpg"
      // }
    ],
    reviews: [
      {
        id: "1",
        rating: 5,
        content: "Khóa học rất chi tiết và dễ hiểu. Giảng viên giải thích rõ ràng và có nhiều ví dụ thực tế. Mình đã học được rất nhiều kiến thức bổ ích.",
        author: "Nguyễn Minh Tú",
        date: "2 tuần trước"
      },
      {
        id: "2",
        rating: 5,
        content: "Nội dung khóa học phong phú, bài tập thực hành sát với thực tế. Mình đã áp dụng được ngay những kiến thức đã học vào công việc.",
        author: "Phạm Thu Hà",
        date: "1 tháng trước"
      }
    ],
    relatedCourses: [
      {
        id: "1",
        name: "React Native Mobile Development",
        info: "Cùng giảng viên • 45 giờ học"
      },
      {
        id: "2",
        name: "Database Design & Optimization",
        info: "Cùng chủ đề • 35 giờ học"
      },
      {
        id: "3",
        name: "Cloud Computing với AWS",
        info: "Cùng chủ đề • 40 giờ học"
      },
        {
        id: "4",
        name: "React Native Mobile Development",
        info: "Cùng giảng viên • 45 giờ học"
      },
    ]
  };

  return <CourseDetailLayout course={courseData} />;
};

export default CourseDetailPage;