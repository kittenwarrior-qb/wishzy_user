'use client'

import React from "react";
import { Star } from "lucide-react";
import { Review } from "@/types/schema/course.schema";

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  totalReviews: number;
}

const ReviewsSection = ({ reviews, rating, totalReviews }: ReviewsSectionProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Đánh giá</h2>
      
      <div className="flex items-center mb-6">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              fill={i < fullStars ? "currentColor" : (hasHalfStar && i === fullStars ? "currentColor" : "none")}
              className={i < fullStars || (hasHalfStar && i === fullStars) ? "" : "text-yellow-400"}
            />
          ))}
        </div>
        <span className="ml-2 text-gray-600 text-lg">
          {rating} ({totalReviews})
        </span>
      </div>
      
      {reviews.slice(0, 2).map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:mb-0">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">{review.author}</span>
            <span className="text-gray-600">{review.date}</span>
          </div>
          <div className="flex text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < review.rating ? "currentColor" : "none"}
                className={i < review.rating ? "" : "text-yellow-400"}
              />
            ))}
          </div>
          <p>{review.content}</p>
        </div>
      ))}
      
      {reviews.length > 2 && (
        <button className="text-blue-600 font-medium flex items-center mt-4">
          Xem tất cả đánh giá <span className="ml-2">↓</span>
        </button>
      )}
    </div>
  );
};

export default ReviewsSection;