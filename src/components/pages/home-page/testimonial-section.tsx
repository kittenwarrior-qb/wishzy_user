import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import React from "react";

const teacherData = [
  {
    id: 1,
    image: "https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png",
    subject: "Giáo viên Toán",
    name: "Thầy A.",
    description:
      "Tên khóa học line-clamp 3 lorem ipsum ipsum have to be a been have to be a been have to be a bee",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png",
    subject: "Giáo viên Lý",
    name: "Cô B.",
    description:
      "Tên khóa học line-clamp 3 lorem ipsum ipsum have to be a been have to be a been have to be a bee",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png",
    subject: "Giáo viên Hóa",
    name: "Thầy C.",
    description:
      "Tên khóa học line-clamp 3 lorem ipsum ipsum have to be a been have to be a been have to be a bee",
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png",
    subject: "Giáo viên Văn",
    name: "Cô D.",
    description:
      "Tên khóa học line-clamp 3 lorem ipsum ipsum have to be a been have to be a been have to be a bee",
  },
];

export default function TestimonialSection() {
  return (
    <section className="flex flex-col w-full items-center py-14 px-4 bg-[#fdead7]">
      <div className="flex flex-col w-full  max-w-[1280px]  items-center gap-6">
        <h2 className="font-semibold text-2xl md:text-3xl text-black text-center">
          Học Kỹ Năng Từ Các Chuyên Gia Giỏi Nhất
        </h2>

        <p className="text-lg md:text-xl text-gray-700 text-center">
          Hơn 10.000 giáo viên toàn quốc
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-6">
          {teacherData.map((teacher) => (
            <Card
              key={teacher.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <CardContent className="flex items-start gap-6 p-6">
                <img
                  className="w-40 h-40 object-cover rounded-full bg-gray-200"
                  alt="Teacher profile"
                  src={teacher.image || "/placeholder-teacher.png"}
                />

                <div className="flex flex-col gap-4 flex-1">
                  <p className="text-gray-600 text-base">{teacher.subject}</p>

                  <h3 className="font-semibold text-xl text-black">
                    {teacher.name}
                  </h3>

                  <p className="text-gray-600 text-base line-clamp-3">
                    {teacher.description}
                  </p>

                  <div className="flex gap-4 mt-2">
                    <Instagram className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-500" />
                    <Facebook className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
                    <MessageCircle className="w-6 h-6 text-gray-600 cursor-pointer hover:text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
