'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Chapter, Lecture } from '@/types/schema/chapter.schema';
import VideoPlayer from './VideoPlayer';
import CourseSidebar from './CourseSidebar';

interface LearningPageLayoutProps {
  chapters: Chapter[];
  currentChapter: Chapter;
  currentLecture?: Lecture;
}

const LearningPageLayout = ({ 
  chapters, 
  currentChapter, 
  currentLecture 
}: LearningPageLayoutProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedLecture, setSelectedLecture] = useState<Lecture | undefined>(currentLecture);

  const handleLectureSelect = (chapter: Chapter, lecture: Lecture) => {
    setSelectedLecture(lecture);
    router.push(`/learning/${chapter.course.slug}/${chapter.slug}/${lecture.slug}`);
  };

  const handleChapterSelect = (chapter: Chapter) => {
    const firstLecture = chapter.lectures?.[0];
    if (firstLecture) {
      setSelectedLecture(firstLecture);
      router.push(`/learning/${chapter.course.slug}/${chapter.slug}/${firstLecture.slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="bg-black">
            <VideoPlayer 
              lecture={selectedLecture}
              onNext={() => {
                // Logic to go to next lecture
                const allLectures = chapters.flatMap(ch => ch.lectures || []);
                const currentIndex = allLectures.findIndex(l => l._id === selectedLecture?._id);
                if (currentIndex < allLectures.length - 1) {
                  const nextLecture = allLectures[currentIndex + 1];
                  const nextChapter = chapters.find(ch => 
                    ch.lectures?.some(l => l._id === nextLecture._id)
                  );
                  if (nextChapter) {
                    handleLectureSelect(nextChapter, nextLecture);
                  }
                }
              }}
              onPrevious={() => {
                // Logic to go to previous lecture
                const allLectures = chapters.flatMap(ch => ch.lectures || []);
                const currentIndex = allLectures.findIndex(l => l._id === selectedLecture?._id);
                if (currentIndex > 0) {
                  const prevLecture = allLectures[currentIndex - 1];
                  const prevChapter = chapters.find(ch => 
                    ch.lectures?.some(l => l._id === prevLecture._id)
                  );
                  if (prevChapter) {
                    handleLectureSelect(prevChapter, prevLecture);
                  }
                }
              }}
            />
          </div>

          {/* Lecture Info */}
          <div className="bg-white p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedLecture?.lectureName || 'Chọn bài giảng'}
            </h1>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-4">
                Chương: {currentChapter.chapterName}
              </span>
              <span>
                Khóa học: {currentChapter.course.courseName}
              </span>
            </div>
          </div>

          {/* Additional Content Area */}
          <div className="flex-1 p-6 bg-white">
            <div className="max-w-4xl">
              <h2 className="text-lg font-semibold mb-4">Mô tả bài giảng</h2>
              <p className="text-gray-700">
                {selectedLecture 
                  ? `Bài giảng: ${selectedLecture.lectureName}` 
                  : 'Chọn một bài giảng để xem nội dung chi tiết.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <CourseSidebar
            chapters={chapters}
            currentChapter={currentChapter}
            currentLecture={selectedLecture}
            onLectureSelect={handleLectureSelect}
            onChapterSelect={handleChapterSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default LearningPageLayout;
