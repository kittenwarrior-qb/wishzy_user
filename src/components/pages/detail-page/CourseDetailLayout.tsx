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
    <div className="w-full bg-white shadow-md">
      <CourseHeader course={course} />
      <ServicesSection services={course.modules} />
      <StaffSection instructors={course.instructors} />
      <ReviewsSection 
        reviews={course.reviews} 
        rating={course.rating} 
        totalReviews={course.totalReviews} 
      />
      <AboutSection description={course.description} />
      <NearbyLocationsSection relatedCourses={course.relatedCourses} />
    </div>
  );
};

export default CourseDetailLayout;