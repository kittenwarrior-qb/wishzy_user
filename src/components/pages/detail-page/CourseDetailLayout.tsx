import React from "react";
import CourseHeader from "./CourseHeader";
import AboutSection from "./AboutSection";
import CourseSidebar from "./CourseSidebar";
import type { CourseDetail } from "@/types/schema/course.schema";
import type { Chapter } from "@/types/schema/chapter.schema";
import ChapterSection from "./ChapterSection";

const CourseDetailLayout = ({ course, chapters }: { course: CourseDetail; chapters: Chapter[] }) => {
  const description = course?.description || "Mô tả chi tiết khóa học này sẽ giúp bạn nắm vững các kiến thức nền tảng và nâng cao.";

  return (
    <div className=" min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <CourseHeader course={course} />

            <AboutSection description={description} />

            <ChapterSection chapters={chapters} />
          </div>
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="sticky top-8"> 
              <CourseSidebar course={course} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailLayout;