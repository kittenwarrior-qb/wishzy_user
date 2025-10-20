
"use client";
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { CourseService } from '@/services/course.service';
import CourseListCard from '@/components/shared/course-list-card';
import { CourseList } from '@/types/schema/course.schema';
import { Button } from '@/components/ui/button';

// Chưa xác định nên xét type tạm 
interface Question {
  question: string;
  options: string[];
  isMultiple?: boolean;
}

type AnswerValue = string | string[];

interface SubmitAnswer {
  index: number;
  answer: AnswerValue; 
}

interface ExamResultItem {
  question: string;
  userAnswer: AnswerValue;
  correctAnswer: AnswerValue;
  isCorrect: boolean;
}

interface ExamResult {
  percentage: number;
  score: number;
  total: number;
  results: ExamResultItem[];
}

export default function ExamPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split('/')?.[1] || 'vi';
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

  const [inputCourseId, setInputCourseId] = useState<string>(searchParams.get('courseId') || '');
  const [loadingByCourse, setLoadingByCourse] = useState<boolean>(false);
  const [exam, setExam] = useState<{ examId: string; title?: string; questionsCount: number } | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<CourseList[]>([]);
  const [exams, setExams] = useState<Array<{ _id: string; courseId: string; title: string; questions?: any[] }>>([])
  const [loadingExams, setLoadingExams] = useState<boolean>(false)
  const [visibleCount, setVisibleCount] = useState<number>(6)

  useEffect(() => {
    CourseService.getHotCourse()
      .then(res => setRelatedCourses((res as any).courses || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoadingExams(true)
    fetch(`${API_BASE.replace(/\/$/, '')}/exams/getAllExams`)
      .then(async res => {
        if (!res.ok) throw new Error(await res.text())
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data)) setExams(data)
        else if (Array.isArray((data as any).exams)) setExams((data as any).exams)
        else setExams([])
      })
      .catch(() => setExams([]))
      .finally(() => setLoadingExams(false))
  }, [API_BASE])

  // Fetch exam by courseId (optional quick search)
  useEffect(() => {
    const courseId = searchParams.get('courseId') || '';
    if (!courseId) {
      setExam(null);
      return;
    }
    setLoadingByCourse(true)
    fetch(`${API_BASE.replace(/\/$/, '')}/exams/questions?courseId=${encodeURIComponent(courseId)}`)
      .then(async res => {
        if (!res.ok) throw new Error(await res.text())
        return res.json()
      })
      .then((data: { examId?: string; questions?: unknown[]; title?: string }) => {
        if (data?.examId) {
          setExam({ examId: data.examId, title: data.title, questionsCount: (data.questions?.length ?? 0) as number })
        } else {
          setExam(null)
        }
      })
      .catch(() => setExam(null))
      .finally(() => setLoadingByCourse(false))
  }, [searchParams, API_BASE])

  const handleSearch = () => {
    const v = inputCourseId.trim()
    router.push(`/${locale}/exam${v ? `?courseId=${encodeURIComponent(v)}` : ''}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Đề thi</h1>
          <p className="text-gray-600">Chọn khóa học để xem danh sách đề thi</p>
        </div>


        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Danh sách đề thi</h2>
          </div>

          {loadingExams ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-40 mb-3" />
              <div className="h-16 bg-gray-200 rounded w-full" />
            </div>
          ) : exams.length === 0 ? (
            <div className="text-gray-600">Chưa có đề thi.</div>
          ) : (
            <div className="space-y-3">
              {exams.slice(0, visibleCount).map((e) => (
                <div key={e._id}
                className="border border-[#ff9500] rounded-lg p-4 flex items-center justify-between transition duration-200 hover:shadow-md hover:bg-orange-50">
                  <div>
                    <div className="text-sm text-gray-500">Môn/Khóa học: <span className="font-medium">{e.courseId}</span></div>
                    <div className="font-medium">{e.title || 'Đề thi trắc nghiệm'}</div>
                  </div>
                  <Button
                    onClick={() => router.push(`/${locale}/exam/${encodeURIComponent(e._id)}`)}
                    className=' h-10 p-[11px] bg-[#ffa500] hover:bg-[#ff9500] rounded-[5px] font-medium text-black text-base leading-6 transition-colors'
                  >
                    Thi thử
                  </Button>
                </div>
              ))}
            </div>
          )}

          {exams.length > 6 && (
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => setVisibleCount(c => (c >= exams.length ? 6 : exams.length))}
               className='w-[200px] h-10 p-[11px] bg-[#ffa500] hover:bg-[#ff9500] rounded-[5px] font-medium text-black text-base leading-6 transition-colors'
              >
                {visibleCount >= exams.length ? 'Thu gọn' : 'Xem thêm'}
              </Button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Khóa học liên quan</h2>
          <CourseListCard courses={relatedCourses.slice(0, 5)} loading={false} showFilters={false} />
        </div>
      </div>
    </div>
  )
}