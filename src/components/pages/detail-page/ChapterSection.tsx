'use client'

import React from "react";
import { Clock, ChevronDown, BookOpen, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Chapter, Lecture } from "@/types/schema/chapter.schema";
import { formatDuration } from "@/lib/utils";

interface ChapterSectionProps {
  chapters: Chapter[];
}

const ChapterSection = ({ chapters }: ChapterSectionProps) => {
  const router = useRouter();
  const [expandedChapters, setExpandedChapters] = React.useState<Set<string>>(new Set());

  const toggleExpand = (chapterId: string) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const handleLectureClick = (chapter: Chapter, lecture: Lecture, event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(`/learning/${chapter.course.slug}/${chapter.slug}/${lecture.slug}`);
  };
  
  if (!chapters || !Array.isArray(chapters)) {
    return <div>Không tìm thấy nội dung khóa học.</div>;
  }

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Nội dung khóa học</h2>

      <div className="space-y-4">
        {chapters.map((chapter) => (
          <div
            key={chapter._id}
            className="border border-gray-200 rounded-md p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 shadow-sm hover:shadow-md"
            onClick={() => toggleExpand(chapter._id)}
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold">{chapter.chapterName}</div>
              <ChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  expandedChapters.has(chapter._id) ? "rotate-180" : ""
                }`}
              />
            </div>

            <div className="flex items-center text-sm text-gray-600 mt-1 mb-4">
              <Clock size={14} className="mr-1" />
              <span>
                {chapter.totalLesson} bài giảng • {formatDuration(chapter.chapterDuration)}
              </span>
            </div>

            {expandedChapters.has(chapter._id) && (
              <div className="mt-4 text-gray-700">
                <ul className="list-none space-y-2">
                  {chapter.lectures?.map((lecture, index) => (
                    <li 
                      key={lecture._id} 
                      className="flex items-center justify-between text-sm py-2 px-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={(e) => handleLectureClick(chapter,lecture, e)}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                        <Play size={12} className="mr-2 text-gray-500" />
                        <span className="font-medium">
                          Bài {index + 1}: {lecture.lectureName}
                        </span>
                        {lecture.isPreview && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                            Xem trước
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock size={12} className="mr-1" />
                        <span>{formatDuration(lecture.duration)}</span>
                      </div>
                    </li>
                  )) || (
                    <li className="text-sm text-gray-500 italic">
                      Chưa có bài giảng nào
                    </li>
                  )}
                </ul>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <BookOpen size={14} className="mr-1" />
                      Tổng cộng: {chapter.lectures?.length || 0} bài giảng
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {formatDuration(chapter.chapterDuration)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {chapters.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-gray-800">
              Tổng khóa học: {chapters.length} chương
            </span>
            <span className="text-gray-600">
              {chapters.reduce((total, chapter) => total + chapter.totalLesson, 0)} bài giảng • {' '}
              {formatDuration(chapters.reduce((total, chapter) => total + chapter.chapterDuration, 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterSection;