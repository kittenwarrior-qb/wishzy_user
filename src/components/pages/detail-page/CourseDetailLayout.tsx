


         



'use client'

import React from "react";
import CourseHeader from "./CourseHeader";
import ServicesSection from "./ModulesSection";
import StaffSection from "./InstructorsSection";
import ReviewsSection from "./ReviewSection";
import AboutSection from "./AboutSection";
import NearbyLocationsSection from "./RelatedCoursesSection";
import { CourseDetail } from "@/types/schema/course.schema";

const CourseDetailLayout = ({ course }: { course: CourseDetail }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto lg-p-0 ">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 flex flex-col gap-8">
          <CourseHeader course={course} />

          <AboutSection description={course.description} />

          <ServicesSection services={course.modules} />
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="sticky top-24">
            <StaffSection />
          </div>
        </div>
      </div>
      <ReviewsSection 
            reviews={course.reviews} 
            rating={course.rating} 
            totalReviews={course.totalReviews} 
          />

          <NearbyLocationsSection relatedCourses={course.relatedCourses} />
    </div>
  );
};

export default CourseDetailLayout;
