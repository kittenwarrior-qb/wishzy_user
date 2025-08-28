'use client'

import { Button } from "@/components/ui/button";
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
      <Button className="text-base font-semibold gap-1 mt-2">
        Đăng Ký  
      </Button>
    </div>
  );
};

export default AboutSection;