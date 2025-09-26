'use client'

import React from "react";
import CourseHeader from "./CourseHeader";
import ServicesSection from "./ModulesSection";
import InstructorsInfo from "./InstructorsInfo";
import ReviewsSection from "./ReviewSection";
import AboutSection from "./AboutSection";
import NearbyLocationsSection from "./RelatedCoursesSection";
// UI-friendly type used by this layout and its children
type LayoutCourse = {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  duration: string;
  level: string;
  studyFormat: string;
  price: number;
  image: string;
  description?: string;
  modules?: Array<{ id: string; name: string; lessons?: number; duration?: string; price?: number }>;
  reviews?: Array<{ id: string; rating: number; content: string; author: string; date: string }>;
  relatedCourses?: Array<{ id: string; name: string; info: string; img: string }>;
  instructors?: Array<{ id: string; name: string; specialty?: string; avatar?: string }>;
};

const CourseDetailLayout = ({ course }: { course: LayoutCourse }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto lg-p-0 ">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 flex flex-col gap-8">
          <CourseHeader course={course} />

          <AboutSection description={course.description} />

          <ServicesSection services={course.modules || []} />
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="sticky top-24">
            <InstructorsInfo instructors={course.instructors || []} />
          </div>
        </div>
      </div>
      <ReviewsSection 
            reviews={course.reviews || []} 
            rating={course.rating} 
            totalReviews={course.totalReviews} 
          />

          <NearbyLocationsSection />
    </div>
  );
};

export default CourseDetailLayout;
