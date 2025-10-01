import React from 'react';
import { notFound } from 'next/navigation';
import { ChapterService } from '@/services/chapter.service';
import LearningPageLayout from '@/components/pages/learning-page/LearningPageLayout';

interface LearningPageProps {
  params: Promise<{
    courseSlug: string;
    chapterSlug: string;
    lectureSlug: string;
    locale: string;
  }>;
}

const LearningPage = async ({ params }: LearningPageProps) => {
  const { courseSlug, chapterSlug, lectureSlug } = await params;
  
  try {
    console.log('Fetching chapters for course:', courseSlug);
    const chapterData = await ChapterService.getChapterBySlug(courseSlug);
    
    if (!chapterData.chapters || chapterData.chapters.length === 0) {
      console.log('No chapters found for course');
      notFound();
    }

    // Find the specific chapter by slug
    const currentChapter = chapterData.chapters.find(ch => ch.slug === chapterSlug);
    if (!currentChapter) {
      console.log('Chapter not found:', chapterSlug);
      notFound();
    }

    // Find the specific lecture by slug
    const currentLecture = currentChapter.lectures?.find(
      lecture => lecture.slug === lectureSlug
    );

    if (!currentLecture) {
      console.log('Lecture not found:', lectureSlug);
      console.log('Available lectures:', currentChapter.lectures?.map(l => l.slug));
      notFound();
    }

    return (
      <LearningPageLayout 
        chapters={chapterData.chapters}
        currentChapter={currentChapter}
        currentLecture={currentLecture}
      />
    );
  } catch (error) {
    console.error('Error in learning page:', error);
    notFound();
  }
};

export default LearningPage;
