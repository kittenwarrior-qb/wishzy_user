import React from 'react';
import { redirect, notFound } from 'next/navigation';
import { ChapterService } from '@/services/chapter.service';

interface CoursePageProps {
  params: Promise<{
    courseSlug: string;
    locale: string;
  }>;
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const { courseSlug } = await params;
  
  try {
    const chapterData = await ChapterService.getChapterBySlug(courseSlug);
    
    if (!chapterData.chapters || chapterData.chapters.length === 0) {
      notFound();
    }

    // Get first chapter
    const firstChapter = chapterData.chapters[0];
    const firstLecture = firstChapter.lectures?.[0];

    if (!firstLecture) {
      notFound();
    }

    // Redirect to the first chapter and lecture
    redirect(`/learning/${courseSlug}/${firstChapter.slug}/${firstLecture.slug}`);
  } catch (error) {
    console.error('Error fetching course data:', error);
    notFound();
  }
};

export default CoursePage;
