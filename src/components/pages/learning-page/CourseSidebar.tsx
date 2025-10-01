'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Clock, BookOpen, CheckCircle } from 'lucide-react';
import type { Chapter, Lecture } from '@/types/schema/chapter.schema';
import { formatDuration } from '@/lib/utils';

interface CourseSidebarProps {
  chapters: Chapter[];
  currentChapter: Chapter;
  currentLecture?: Lecture;
  onLectureSelect: (chapter: Chapter, lecture: Lecture) => void;
  onChapterSelect: (chapter: Chapter) => void;
}

const CourseSidebar = ({
  chapters,
  currentChapter,
  currentLecture,
  onLectureSelect,
  onChapterSelect
}: CourseSidebarProps) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set([currentChapter._id])
  );

  const toggleChapterExpansion = (chapterId: string) => {
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

  const isLectureActive = (lecture: Lecture) => {
    return currentLecture?._id === lecture._id;
  };

  const isChapterActive = (chapter: Chapter) => {
    return currentChapter._id === chapter._id;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <h2 className="font-semibold text-lg text-gray-900 mb-1">
          {currentChapter.course.courseName}
        </h2>
        <div className="flex items-center text-sm text-gray-600">
          <BookOpen size={14} className="mr-1" />
          <span>{chapters.length} chương</span>
          <span className="mx-2">•</span>
          <span>
            {chapters.reduce((total, ch) => total + (ch.lectures?.length || 0), 0)} bài giảng
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 border-b">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Tiến độ học tập</span>
          <span>0%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="flex-1 overflow-y-auto">
        {chapters.map((chapter) => (
          <div key={chapter._id} className="border-b border-gray-100">
            <div
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                isChapterActive(chapter) ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
              }`}
              onClick={() => {
                toggleChapterExpansion(chapter._id);
                onChapterSelect(chapter);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className={`font-medium text-sm ${
                    isChapterActive(chapter) ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {chapter.chapterName}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock size={12} className="mr-1" />
                    <span>{chapter.totalLesson} bài • {formatDuration(chapter.chapterDuration)}</span>
                  </div>
                </div>
                <div className="ml-2">
                  {expandedChapters.has(chapter._id) ? (
                    <ChevronDown size={16} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Lectures List */}
            {expandedChapters.has(chapter._id) && (
              <div className="bg-gray-50">
                {chapter.lectures?.map((lecture, index) => (
                  <div
                    key={lecture._id}
                    className={`px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors border-l-4 ${
                      isLectureActive(lecture)
                        ? 'bg-blue-100 border-l-blue-600'
                        : 'border-l-transparent'
                    }`}
                    onClick={() => onLectureSelect(chapter, lecture)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center mr-3">
                          {isLectureActive(lecture) ? (
                            <Play size={14} className="text-blue-600" />
                          ) : (
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            isLectureActive(lecture) ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {index + 1}. {lecture.lectureName}
                          </p>
                          <div className="flex items-center mt-1">
                            {lecture.isPreview && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full mr-2">
                                Miễn phí
                              </span>
                            )}
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock size={10} className="mr-1" />
                              <span>{formatDuration(lecture.duration)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Completion Status */}
                      <div className="ml-2">
                        {/* You can add completion logic here */}
                        {false && (
                          <CheckCircle size={16} className="text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="px-6 py-4 text-sm text-gray-500 italic">
                    Chưa có bài giảng nào
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          Tiếp tục học để hoàn thành khóa học
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
