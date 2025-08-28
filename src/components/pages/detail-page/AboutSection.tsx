'use client'

import React from "react";

interface AboutSectionProps {
  description: string;
}

const AboutSection = ({ description }: AboutSectionProps) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Giới thiệu khóa học</h2>
      <div className="prose max-w-none">
        <p className="whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
};

export default AboutSection;