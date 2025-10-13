import React from 'react';
import { redirect, notFound } from 'next/navigation';
import { ChapterService } from '@/services/chapter.service';

interface ChapterPageProps {
  params: Promise<{
    courseSlug: string;
    chapterSlug: string;
    locale: string;
  }>;
}

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const { courseSlug, chapterSlug } = await params;
  
  try {
    const chapterData = await ChapterService.getChapterBySlug(courseSlug);
    
    if (!chapterData.chapters || chapterData.chapters.length === 0) {
      notFound();
    }

    // Find the specific chapter
    const currentChapter = chapterData.chapters.find(ch => ch.slug === chapterSlug);
    if (!currentChapter) {
      notFound();
    }

    // Get first lecture
    const firstLecture = currentChapter.lectures?.[0];
    if (!firstLecture) {
      notFound();
    }

    // Redirect to the first lecture
    redirect(`/learning/${courseSlug}/${chapterSlug}/${firstLecture.slug}`);
  } catch (error) {
    console.error('Error fetching chapter data:', error);
    notFound();
  }
};

export default ChapterPage;
