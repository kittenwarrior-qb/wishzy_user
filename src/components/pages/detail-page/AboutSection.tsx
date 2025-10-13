'use client'

import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";

interface AboutSectionProps {
  description: string;
}

const AboutSection = ({ description }: AboutSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      // Check if content height exceeds 4 lines (approximately 120px)
      setShowReadMore(element.scrollHeight > 120);
    }
  }, [description]);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Giới thiệu khóa học</h2>
      <div className="prose max-w-none">
        <div 
          ref={contentRef}
          className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? 'max-h-none' : 'max-h-[120px]'
          }`}
          dangerouslySetInnerHTML={{ __html: description }} 
        />
        
        {showReadMore && (
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 p-0 h-auto text-gray-600 hover:text-gray-800 hover:bg-transparent font-medium"
          >
            {isExpanded ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AboutSection;