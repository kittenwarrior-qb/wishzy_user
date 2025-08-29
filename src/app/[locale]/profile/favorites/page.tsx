"use client";

import { Heart, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import aiw from "@/assets/aiw.png";

const initialFavorites = [
  { 
    id: 1,
    title: "React Hooks Deep Dive", 
    description: "Hiểu rõ về useState, useEffect và custom hooks", 
    image: "/images/react-hooks.jpg",
    status: "Mới"
  },
  { 
    id: 2,
    title: "CSS Grid Layout", 
    description: "Thiết kế layout hiện đại với CSS Grid", 
    image: "/images/css-grid.jpg",
    status: "Đã hoàn thành"
  },
  { 
    id: 3,
    title: "Node.js Basics", 
    description: "Xây dựng backend với Node.js và Express", 
    image: "/images/nodejs.jpg",
    status: "Mới"
  },
  { 
    id: 4,
    title: "TypeScript Essentials", 
    description: "Nắm vững TS để code an toàn và chuẩn", 
    image: "/images/typescript.jpg",
    status: "Đang học"
  },
];

export default function ProfileFavorites() {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemove = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const handleGoToCourse = (title: string) => {
    alert(`Đi tới khóa học: ${title}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Heart className="text-pink-500" size={28} />
        <h1 className="text-2xl font-bold ">Favorites</h1>
      </div>
      <p>
        Đây là các khóa học hoặc tài liệu bạn đã lưu lại để học sau.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="shadow-white rounded-2xl shadow-md border overflow-hidden flex flex-col hover:shadow-lg "
          >
            <div className="relative w-full h-44">
              <Image
                src={aiw.src || "/default-course.jpg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* Badge trạng thái */}
              <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full text-white
                ${item.status === "Mới" ? "bg-green-500" :
                  item.status === "Đang học" ? "bg-yellow-500" :
                  "bg-blue-500"}`}>
                {item.status}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold ">{item.title}</h2>
                <p className="text-sm ">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => handleGoToCourse(item.title)}
                >
                  Đi tới khóa học
                  <ArrowRight size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2 text-red-600 border-red-300"
                  onClick={() => handleRemove(item.id)}
                >
                  Bỏ yêu thích
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
