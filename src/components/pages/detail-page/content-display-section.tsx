// 'use client'

// import React from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//   BookOpen,
//   ChevronDown,
//   Clock,
//   Facebook,
//   Image as LucideImage,
//   List,
//   Monitor,
//   Play,
//   Twitter,
//   Users,
//   Volume2,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { CourseDetail } from "@/types/schema/course.schema";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";

// const tabsData = [
//   { value: "info", label: "Thông tin" },
//   { value: "reviews", label: "Đánh giá" },
//   { value: "faq", label: "FAQ" },
// ];

// const instructorStats = [
//   { icon: Play, text: "0 xếp hạng" },
//   { icon: LucideImage, text: "Chưa có đánh giá" },
//   { icon: Users, text: "0 học viên" },
//   { icon: BookOpen, text: "1 khóa học" },
// ];

// const courseFeatures = [
//   { icon: List, text: "Số chương: (chưa có)" },
//   { icon: Monitor, text: "Bài học: (chưa có)" },
//   { icon: Clock, text: "Thời lượng: đang cập nhật" },
//   { icon: Volume2, text: "Ngôn ngữ: Tiếng Việt" },
// ];

// const socialIcons = [Facebook, Twitter];

// export default function ContentDisplaySection({ course }: { course: CourseDetail }) {
//   return (
//     <div className="flex w-full items-start justify-between gap-6">
//       {/* Left side */}
//       <div className="flex flex-col w-full max-w-[800px] gap-6">
//         <div className="w-full h-[400px] rounded-[16px] overflow-hidden border">
//           <Image
//             src={
//               course.thumbnail ||
//               "https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png"
//             }
//             alt={course.courseName}
//             className="w-full h-full object-cover object-center"
//             width={800}
//             height={400}
//           />
//         </div>

//         <Tabs defaultValue="info" className="rounded-[16px]">
//           <TabsList className="w-full justify-start gap-6 border">
//             {tabsData.map((tab) => (
//               <TabsTrigger key={tab.value} value={tab.value}>
//                 {tab.label}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           <TabsContent value="info" className="space-y-8 mt-6">
//             {/* Mô tả */}
//             <section>
//               <h3 className="text-lg font-semibold">Mô tả</h3>
//               <p className="text-base leading-6 whitespace-pre-line">
//                 {course.description || "Chưa có mô tả cho khóa học này."}
//               </p>
//               <Button className="text-base font-semibold gap-1 mt-2">
//                 Hiện thêm <ChevronDown className="w-4 h-4" />
//               </Button>
//             </section>

//             {/* Yêu cầu */}
//             <section>
//               <h3 className="text-lg font-semibold">Yêu cầu</h3>
//               <p className="text-base leading-6 whitespace-pre-line">
//                 {course.requirements?.length
//                   ? course.requirements.join("\n")
//                   : "- Có thiết bị kết nối Internet\n- Tinh thần tự học"}
//               </p>
//             </section>

//             {/* Nội dung */}
//             <section>
//               <h3 className="text-lg font-semibold">Nội dung khóa học</h3>
//               <p className="text-sm">Nội dung đang được cập nhật.</p>
//             </section>
//           </TabsContent>
//         </Tabs>

//         {/* Giảng viên */}
//         <Card className="rounded-xl border-none shadow-none">
//           <CardContent className="p-0 space-y-6">
//             <h3 className="text-lg font-semibold">Giảng viên</h3>
//             <div className="flex items-center gap-6">
//               <Avatar className="w-[123px] h-[123px]">
//                 <AvatarFallback className="text-lg border">GV</AvatarFallback>
//               </Avatar>
//               <div className="space-y-2">
//                 <h4 className="font-semibold text-base">
//                   {course.createdBy?.fullName ?? "Giảng viên chưa cập nhật"}
//                 </h4>
//                 <p className="text-sm">Giáo viên bộ môn</p>
//                 <ul className="space-y-1">
//                   {instructorStats.map((stat, index) => (
//                     <li key={index} className="flex items-center gap-2">
//                       <stat.icon className="w-5 h-5" />
//                       <span>{stat.text}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               {socialIcons.map((Icon, index) => (
//                 <Button key={index} size="icon" className="w-8 h-8 p-0">
//                   <Icon className="w-5 h-5" />
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Right sidebar */}
//       <Card className="w-[450px] p-6 rounded-[16px] sticky top-[150px] border">
//         <CardContent className="space-y-6">
//           <div className="space-y-1">
//             <div className="text-2xl font-bold">
//               {course.price.toLocaleString('vi-VN')}đ
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Button variant="outline" className="w-full">
//               Thêm vào giỏ hàng
//             </Button>
//             <Button className="w-full">Mua ngay</Button>
//           </div>

//           <div className="space-y-3">
//             {courseFeatures.map((feature, index) => (
//               <div key={index} className="flex items-center gap-4">
//                 <feature.icon className="w-5 h-5" />
//                 <span className="text-base">{feature.text}</span>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
