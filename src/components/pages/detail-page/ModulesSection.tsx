// 'use client'

// import React from "react";
// import { Clock, ChevronDown } from "lucide-react";
// import { CourseModule } from "@/types/schema/course.schema";

// interface ModulesSectionProps {
//   services: CourseModule[];
// }

// const ModulesSection = ({ services }: ModulesSectionProps) => {
//   const [expandedModule, setExpandedModule] = React.useState<number | null >(null);

//   const toggleExpand = (moduleId: number) => {
//     setExpandedModule(expandedModule === moduleId ? null : moduleId);
//   };
//   if (!services || !Array.isArray(services)) {
//     return <div>Không tìm thấy nội dung khóa học.</div>;
//   }

//     const moduleDetails = {
//     '1': [
//       { id: 1, title: 'Bài 1: Giới thiệu khóa học', duration: '5 phút' },
//       { id: 2, title: 'Bài 2: Hướng dẫn sử dụng nền tảng', duration: '10 phút' },
//     ],
//     '2': [
//       { id: 3, title: 'Bài 1: Kiến thức nền tảng về Toán học', duration: '15 phút' },
//       { id: 4, title: 'Bài 2: Các khái niệm cơ bản', duration: '20 phút' },
//       { id: 5, title: 'Bài 3: Thực hành với các phép tính', duration: '30 phút' },
//     ],
//     '3': [
//       { id: 6, title: 'Bài 1: Tổng kết khóa học', duration: '10 phút' },
//       { id: 7, title: 'Bài 2: Thi cuối khóa', duration: '45 phút' },
//     ],
//      '4': [
//       { id: 1, title: 'Bài 1: Giới thiệu khóa học', duration: '5 phút' },
//       { id: 2, title: 'Bài 2: Hướng dẫn sử dụng nền tảng', duration: '10 phút' },
//     ],
//   };

//   return (
//     // <div className="p-6 border-b border-gray-200">
//     //   <h2 className="text-xl font-semibold mb-4">Nội dung khóa học</h2>
//     //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     //     {services.map((module) => (
//     //       <div key={module.id} className="border border-gray-200 rounded-md p-4">
//     //         <div className="font-semibold">{module.name}</div>
//     //         <div className="flex items-center text-sm text-gray-600 mt-1">
//     //           <Clock size={14} className="mr-1" />
//     //           <span>{module.lessons} bài giảng • {module.duration}</span>
//     //         </div>
//     //         <div className={`font-semibold mt-2 ${
//     //           module.price === 0 ? 'text-green-600' : 'text-primary'
//     //         }`}>
//     //           {module.price === 0 ? 'Miễn phí' : 'Có phí'}
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>

//   // <div className="p-6">
//   //     <h2 className="text-xl font-semibold mb-4">Nội dung khóa học</h2>
//   //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//   //       {services.map((module) => (
//   //         <div 
//   //           key={module.id} 
//   //           className="border border-gray-200 rounded-md p-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50"
//   //           onClick={() => toggleExpand(module.id)}
//   //         >
//   //           <div className="flex justify-between items-center">
//   //             <div className="font-semibold">{module.name}</div>
//   //             <ChevronDown 
//   //               size={20} 
//   //               className={`transform transition-transform duration-300 ${
//   //                 expandedModule === module.id ? 'rotate-180' : ''
//   //               }`}
//   //             />
//   //           </div>
//   //           <div className="flex items-center text-sm text-gray-600 mt-1">
//   //             <Clock size={14} className="mr-1" />
//   //             <span>{module.lessons} bài giảng • {module.duration}</span>
//   //           </div>
//   //           <div className={`font-semibold mt-2 ${
//   //             module.price === 0 ? 'text-green-600' : 'text-blue-600'
//   //           }`}>
//   //             {module.price === 0 ? 'Miễn phí' : 'Có phí'}
//   //           </div>

//   //           {/* Nội dung chi tiết chỉ hiển thị khi module được bung ra */}
//   //           {expandedModule === module.id && (
//   //             <div className="mt-4 text-gray-700">
//   //               <p>Đây là nội dung chi tiết của module {module.id}.</p>
//   //               <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
//   //                 <li>Bài 1: Giới thiệu</li>
//   //                 <li>Bài 2: Kiến thức nền tảng</li>
//   //                 <li>Bài 3: Thực hành dự án</li>
//   //               </ul>
//   //             </div>
//   //           )}
//   //         </div>
//   //       ))}
//   //     </div>
//   //   </div>

//       <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Nội dung khóa học</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {services.map((module) => (
//           <div 
//             key={module.id} 
//             className="border border-gray-200 rounded-md p-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50"
//             onClick={() => toggleExpand(module.id)}
//           >
//             <div className="flex justify-between items-center">
//               <div className="font-semibold">{module.name}</div>
//               <ChevronDown 
//                 size={20} 
//                 className={`transform transition-transform duration-300 ${
//                   expandedModule === module.id ? 'rotate-180' : ''
//                 }`}
//               />
//             </div>
//             <div className="flex items-center text-sm text-gray-600 mt-1">
//               <Clock size={14} className="mr-1" />
//               <span>{module.lessons} bài giảng • {module.duration}</span>
//             </div>
//             <div className={`font-semibold mt-2 ${
//               module.price === 0 ? 'text-green-600' : 'text-blue-600'
//             }`}>
//               {module.price === 0 ? 'Miễn phí' : 'Có phí'}
//             </div>

//             {/* Nội dung chi tiết chỉ hiển thị khi module được bung ra */}
//             {expandedModule === module.id && (
//               <div className="mt-4 text-gray-700">
//                 <ul className="list-none space-y-2">
//                   {moduleDetails[module.id]?.map(lesson => (
//                     <li key={lesson.id} className="flex items-center text-sm">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
//                       <span className="flex-1">{lesson.title}</span>
//                       <span className="text-gray-500 ml-4">{lesson.duration}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>

//   );
// };

// export default ModulesSection;





// 'use client'

// import React from "react";
// import { Clock, ChevronDown } from "lucide-react";
// import { CourseModule } from "@/types/schema/course.schema";

// interface ModulesSectionProps {
//   services: CourseModule[];
// }

// const ModulesSection = ({ services }: ModulesSectionProps) => {
//   const [expandedModule, setExpandedModule] = React.useState<number | null>(null);

//   const toggleExpand = (moduleId: number) => {
//     setExpandedModule(expandedModule === moduleId ? null : moduleId);
//   };
  
//   if (!services || !Array.isArray(services)) {
//     return <div>Không tìm thấy nội dung khóa học.</div>;
//   }

//   const moduleDetails = {
//     '1': [
//       { id: 1, title: 'Bài 1: Giới thiệu khóa học', duration: '5 phút' },
//       { id: 2, title: 'Bài 2: Hướng dẫn sử dụng nền tảng', duration: '10 phút' },
//     ],
//     '2': [
//       { id: 3, title: 'Bài 1: Kiến thức nền tảng về Toán học', duration: '15 phút' },
//       { id: 4, title: 'Bài 2: Các khái niệm cơ bản', duration: '20 phút' },
//       { id: 5, title: 'Bài 3: Thực hành với các phép tính', duration: '30 phút' },
//     ],
//     '3': [
//       { id: 6, title: 'Bài 1: Tổng kết khóa học', duration: '10 phút' },
//       { id: 7, title: 'Bài 2: Thi cuối khóa', duration: '45 phút' },
//     ],
//     '4': [
//       { id: 1, title: 'Bài 1: Giới thiệu khóa học', duration: '5 phút' },
//       { id: 2, title: 'Bài 2: Hướng dẫn sử dụng nền tảng', duration: '10 phút' },
//     ],
    
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Nội dung khóa học</h2>
//       <div className="grid grid-cols-1 gap-4">
//         {services.map((module) => (
//           <div 
//             key={module.id} 
//             className="border border-gray-200 rounded-md p-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50"
//             onClick={() => toggleExpand(module.id)}
//           >
//             <div className="flex justify-between items-center">
//               <div className="flex-1">
//                 <div className="font-semibold">{module.name}</div>
//                 <div className="flex items-center text-sm text-gray-600 mt-1">
//                   <Clock size={14} className="mr-1" />
//                   <span>{module.lessons} bài giảng • {module.duration}</span>
//                   <span className={`font-semibold ml-4 ${
//                     module.price === 0 ? 'text-green-600' : 'text-blue-600'
//                   }`}>
//                     {module.price === 0 ? 'Miễn phí' : 'Có phí'}
//                   </span>
//                 </div>
//               </div>
//               <ChevronDown 
//                 size={20} 
//                 className={`transform transition-transform duration-300 ${
//                   expandedModule === module.id ? 'rotate-180' : ''
//                 }`}
//               />
//             </div>

//             {/* Nội dung chi tiết chỉ hiển thị khi module được bung ra */}
//             {expandedModule === module.id && (
//               <div className="mt-4 text-gray-700">
//                 <ul className="list-none space-y-2">
//                   {moduleDetails[module.id]?.map(lesson => (
//                     <li key={lesson.id} className="flex items-center text-sm">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
//                       <span className="flex-1">{lesson.title}</span>
//                       <span className="text-gray-500 ml-4">{lesson.duration}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ModulesSection;

'use client'

import React from "react";
import { Clock, ChevronDown, Users, BookOpen, Award, BarChart3 } from "lucide-react";
import { CourseModule } from "@/types/schema/course.schema";

interface ModulesSectionProps {
  services: CourseModule[];
}

const ModulesSection = ({ services }: ModulesSectionProps) => {
  const [expandedModule, setExpandedModule] = React.useState<number | null>(null);

  const toggleExpand = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };
  
  if (!services || !Array.isArray(services)) {
    return <div>Không tìm thấy nội dung khóa học.</div>;
  }

  const moduleDetails = {
    '1': [
      { id: 1, title: 'Bài 1: Giới thiệu khóa học', duration: '5 phút' },
      { id: 2, title: 'Bài 2: Hướng dẫn sử dụng nền tảng', duration: '10 phút' },
    ],
    '2': [
      { id: 3, title: 'Bài 1: Kiến thức nền tảng về Toán học', duration: '15 phút' },
      { id: 4, title: 'Bài 2: Các khái niệm cơ bản', duration: '20 phút' },
      { id: 5, title: 'Bài 3: Thực hành với các phép tính', duration: '30 phút' },
    ],
    '3': [
      { id: 6, title: 'Bài 1: Tổng kết khóa học', duration: '10 phút' },
      { id: 7, title: 'Bài 2: Thi cuối khóa', duration: '45 phút' },
    ],
    '4': [
      { id: 8, title: 'Bài 1: Tạo nội dung với ChatGPT', duration: '12 phút' },
      { id: 9, title: 'Bài 2: Tối ưu hóa prompt', duration: '18 phút' },
    ],
    '5': [
      { id: 10, title: 'Bài 1: Công cụ AI trong marketing', duration: '15 phút' },
      { id: 11, title: 'Bài 2: Case study thực tế', duration: '25 phút' },
    ],
    '6': [
      { id: 12, title: 'Bài 1: Phân tích dữ liệu với AI', duration: '20 phút' },
      { id: 13, title: 'Bài 2: Báo cáo tự động', duration: '15 phút' },
    ]
  };

  // Thêm 2 module mới vào services
  const enhancedServices = [
    ...services,
    {
      id: 5,
      name: "Công cụ AI Marketing",
      lessons: 2,
      duration: "40 phút",
      price: 0
    },
    {
      id: 6,
      name: "Phân tích và Báo cáo",
      lessons: 2,
      duration: "35 phút",
      price: 199000
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Nội dung khóa học</h2>
      
      {/* Thông tin tổng quan về khóa học */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <BookOpen size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{enhancedServices.length} modules</h3>
            <p className="text-gray-600">Tổng số chương học</p>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Clock size={24} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">3 giờ 15 phút</h3>
            <p className="text-gray-600">Thời lượng khóa học</p>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <Award size={24} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Chứng nhận</h3>
            <p className="text-gray-600">Hoàn thành khóa học</p>
          </div>
        </div>
      </div>
      
      {/* Danh sách modules */}
      <div className="grid grid-cols-1 gap-4">
        {enhancedServices.map((module) => (
          <div 
            key={module.id} 
            className="border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-200"
            onClick={() => toggleExpand(module.id)}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="font-semibold text-lg flex items-center">
                  {module.id === 5 && <BarChart3 size={18} className="mr-2 text-blue-500" />}
                  {module.id === 6 && <Users size={18} className="mr-2 text-green-500" />}
                  {module.name}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Clock size={14} className="mr-1" />
                  <span>{module.lessons} bài giảng • {module.duration}</span>
                  <span className={`font-semibold ml-4 ${
                    module.price === 0 ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {module.price === 0 ? 'Miễn phí' : `${module.price.toLocaleString('vi-VN')} đ`}
                  </span>
                </div>
              </div>
              <ChevronDown 
                size={20} 
                className={`transform transition-transform duration-300 ${
                  expandedModule === module.id ? 'rotate-180' : ''
                }`}
              />
            </div>

            {/* Nội dung chi tiết chỉ hiển thị khi module được bung ra */}
            {expandedModule === module.id && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-800 mb-3">Nội dung chi tiết:</h4>
                <ul className="list-none space-y-2">
                  {moduleDetails[module.id]?.map(lesson => (
                    <li key={lesson.id} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="flex-1">{lesson.title}</span>
                      <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded text-xs">{lesson.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Thống kê cuối cùng */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Tổng cộng</h3>
            <p className="text-gray-600">Tất cả nội dung khóa học</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{enhancedServices.length} modules</p>
            <p className="text-gray-600">15 bài giảng • 3 giờ 15 phút</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulesSection;