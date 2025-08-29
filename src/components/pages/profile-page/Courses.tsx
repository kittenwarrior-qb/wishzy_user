"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import aiw from "@/assets/aiw.png";

interface CoursesProps {
  courses: { 
    name: string; 
    progress: number; 
    status?: "In Progress" | "Completed"; 
    image: string;
  }[];
}

export default function Courses({ courses }: CoursesProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <BookOpen className="text-amber-500" size={20} />
        <h2 className="text-lg font-semibold">Học tiếp</h2>
      </div>

      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 p-2 min-w-max">
          {courses.map((course, idx) => (
            <Card
              key={idx}
              className="rounded-2xl shadow-sm shadow-white overflow-hidden active:scale-[0.98] transition-all min-w-[250px] flex-shrink-0"
            >
              <CardHeader className="p-0 relative">
                <div className="relative w-full h-36">
                  <Image
                    src={aiw.src || "/default-course.jpg"}
                    alt={course.name}
                    fill
                    className="object-cover"
                  />
                  {course.status && (
                    <span
                      className={`absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full text-white backdrop-blur ${
                        course.status === "Completed"
                          ? "bg-green-500/90"
                          : "bg-yellow-500/90"
                      }`}
                    >
                      {course.status}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3">
                <CardTitle className="font-semibold line-clamp-2 text-base">
                  {course.name}
                </CardTitle>

                <div>
                  <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        course.status === "Completed"
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : "bg-gradient-to-r from-indigo-400 to-indigo-600"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-right font-medium">
                    {course.progress}%
                  </p>
                </div>
              </CardContent>

              {course.status !== "Completed" && (
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full flex items-center gap-1">
                    Tiếp tục học
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
