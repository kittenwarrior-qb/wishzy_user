"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function ExamTakePage() {
  const params = useParams<{ locale: string; examId: string }>();
  const examId = params?.examId as string;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [result, setResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!examId) return;
    fetch(`${API_BASE.replace(/\/$/, "")}/exams/questions/${encodeURIComponent(examId)}`)
      .then((res) => res.json())
      .then((data: { questions?: Question[] }) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch((err) => console.error("Lỗi fetch câu hỏi:", err));
  }, [examId, API_BASE]);

  const handleSingleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleMultiToggle = (index: number, value: string, checked: boolean) => {
    setAnswers((prev) => {
      const current = prev[index];
      const arr = Array.isArray(current) ? current : [];
      const next = checked ? Array.from(new Set([...arr, value])) : arr.filter((v) => v !== value);
      return { ...prev, [index]: next };
    });
  };

  const handleSubmit = async () => {
    if (!examId) return;
    const userAnswers: SubmitAnswer[] = Object.entries(answers).map(([idx, ans]) => ({
      index: parseInt(idx, 10),
      answer: ans,
    }));
    const res = await fetch(`${API_BASE.replace(/\/$/, "")}/exams/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ examId, userAnswers }),
    });
    const data: ExamResult = await res.json();
    setResult(data);
  };

  if (!examId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="bg-white rounded-xl shadow p-6">Không tìm thấy mã đề.</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Đề thi</h1>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Đang tải...</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-40 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-24 mb-6" />
            <div className="h-6 bg-gray-200 rounded w-full mb-3" />
            <div className="h-6 bg-gray-200 rounded w-full mb-3" />
            <div className="h-6 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Đề thi trắc nghiệm</h1>
            <div className="text-sm text-gray-500">Mã đề: {String(examId).slice(-6)}</div>
          </div>
        </div>

        {questions.map((q, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 mb-4  border border-[#ff9500]">
            <div className="text-sm text-gray-500 mb-2">Câu hỏi {i + 1}</div>
            <p className="font-medium text-gray-900 mb-4">{q.question}</p>
            <div className="space-y-2 ">
              {q.options.map((opt: string) => {
                const letter = opt.match(/^[A-D]/)?.[0] || opt;
                const inferredMulti = /(chọn\s*\d+|chọn nhiều|chọn tat ca|chọn tất cả)/i.test(q.question);
                const isMultiple = q.isMultiple ?? inferredMulti;
                const inputType = isMultiple ? "checkbox" : "radio";
                const selected = answers[i];
                return (
                  <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer  border border-[#ff9500]">
                    <input
                      className="h-4 w-4 accent-[#FFA500]"
                      type={inputType}
                      name={`q${i}`}
                      value={letter}
                      checked={isMultiple ? Array.isArray(selected) && selected.includes(letter) : selected === letter}
                      onChange={(e) => (isMultiple ? handleMultiToggle(i, letter, e.currentTarget.checked) : handleSingleAnswerChange(i, letter))}
                    />
                    <span className="text-gray-800">{opt}</span>
                  </label>
                );
              })}
            </div>
            {(() => {
              const inferredMulti = /(chọn\s*\d+|chọn nhiều|chọn tat ca|chọn tất cả)/i.test(q.question);
              const isMultiple = q.isMultiple ?? inferredMulti;
              return isMultiple ? <div className="text-xs text-gray-500 italic mt-2">Có thể chọn nhiều đáp án</div> : null;
            })()}
          </div>
        ))}

        <div className="mt-6">
          <button onClick={handleSubmit} className="px-5 py-2 bg-[#ffa500] hover:bg-[#ff9500] text-black rounded font-medium">
            Nộp bài
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-white rounded-xl shadow p-6  border border-[#ff9500]">
            <div className="font-semibold mb-4">
              Kết quả: {result.percentage}% ({result.score}/{result.total} đúng)
            </div>
            {result.results.map((r: ExamResultItem, i: number) => (
              <div key={i} className="border-t first:border-t-0 py-3">
                <div className="font-semibold mb-1 ">
                  {i + 1}. {r.question}
                </div>
                <div className="text-sm">
                  Bạn chọn: {" "}
                  <span className={r.isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {Array.isArray(r.userAnswer) ? r.userAnswer.join(", ") : r.userAnswer}
                  </span>
                  {" "}· Đáp án đúng: <strong>{Array.isArray(r.correctAnswer) ? r.correctAnswer.join(", ") : r.correctAnswer}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
