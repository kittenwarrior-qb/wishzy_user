import { CourseService } from '@/services/course.service'
import CourseDetailLayout from '@/components/pages/detail-page/course-detail-layout';
import { notFound } from 'next/navigation'

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  try {
    const res = await CourseService.getCourseBySlug(slug)
    if (!res || !res.course) {
      return notFound()
    }

    return <CourseDetailLayout course={res.course} />
  } catch (err) {
    console.error('Failed to fetch course:', err)
    return notFound()
  }
}
