import React from "react";
import CourseHeader from "./CourseHeader";
import AboutSection from "./AboutSection";
import CourseSidebar from "./CourseSidebar";
import type { CourseDetail } from "@/types/schema/course.schema";
import type { Chapter } from "@/types/schema/chapter.schema";
import ChapterSection from "./ChapterSection";

const CourseDetailLayout = ({ course, chapters }: { course: CourseDetail; chapters: Chapter[] }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto mt-10  ">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 flex flex-col gap-8">
          <CourseHeader course={course} />

          <AboutSection description={course.description || "không có mô tả"} />

          <ChapterSection chapters={chapters} />
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="sticky top-24">
            <CourseSidebar course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailLayout;
