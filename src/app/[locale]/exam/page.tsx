
"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

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
  const examId = searchParams.get('examId');
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [result, setResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!examId) return;
    fetch(`${API_BASE.replace(/\/$/, '')}/exams/questions/${encodeURIComponent(examId)}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then((data: { questions?: Question[] }) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch(err => console.error('Lỗi fetch câu hỏi:', err));
  }, [examId, API_BASE]);

  // Handle single-answer question (radio)
  const handleSingleAnswerChange = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  // Handle multi-answer question (checkbox toggle)
  const handleMultiToggle = (index: number, value: string, checked: boolean) => {
    setAnswers(prev => {
      const current = prev[index];
      const arr = Array.isArray(current) ? current : [];
      const next = checked ? Array.from(new Set([...arr, value])) : arr.filter(v => v !== value);
      return { ...prev, [index]: next };
    });
  };

  const handleSubmit = async () => {
    if (!examId) return;
    const userAnswers: SubmitAnswer[] = Object.entries(answers).map(([idx, ans]) => ({
      index: parseInt(idx, 10), 
      answer: ans,
    }));
    const res = await fetch(`${API_BASE.replace(/\/$/, '')}/exams/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ examId, userAnswers }),
    });
    const data: ExamResult = await res.json();
    setResult(data);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Đề thi</h1>
            <span className={styles.badge}>Đang tải...</span>
          </div>
          <div className={styles.examCard}>
            <div className={styles.meta}>
              <span className={styles.skeleton} style={{ width: 160 }} />
              <span className={styles.skeleton} style={{ width: 100 }} />
            </div>
            <div className={styles.skeleton} />
            <div style={{ height: 10 }} />
            <div className={styles.skeleton} />
            <div style={{ height: 10 }} />
            <div className={styles.skeleton} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Đề thi trắc nghiệm</h1>
          {examId && <span className={styles.badge}>Mã đề: {examId.slice(-6)}</span>}
        </div>

        {questions.map((q, i) => (
          <div key={i} className={styles.examCard} style={{ marginBottom: 16 }}>
            <div className={styles.meta}>Câu hỏi {i + 1}</div>
            <p className={styles.question}>{q.question}</p>
            <div className={styles.options}>
              {q.options.map((opt: string) => {
                const letter = (opt.match(/^[A-D]/)?.[0]) || opt;
                // Suy luận cho câu hỏi chọn nhiều nếu backend không cung cấp isMultiple
                const inferredMulti = /(chọn\s*\d+|chọn nhiều|chọn tat ca|chọn tất cả)/i.test(q.question);
                const isMultiple = q.isMultiple ?? inferredMulti;
                const inputType = isMultiple ? 'checkbox' : 'radio';
                const selected = answers[i];
                return (
                  <label key={opt} className={styles.option}>
                    <input
                      className={styles.radio}
                      type={inputType}
                      name={`q${i}`}
                      value={letter}
                      checked={
                        isMultiple
                          ? Array.isArray(selected) && selected.includes(letter)
                          : selected === letter
                      }
                      onChange={(e) =>
                        isMultiple
                          ? handleMultiToggle(i, letter, e.currentTarget.checked)
                          : handleSingleAnswerChange(i, letter)
                      }
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
            {(() => {
              const inferredMulti = /(chọn\s*\d+|chọn nhiều|chọn tat ca|chọn tất cả)/i.test(q.question);
              const isMultiple = q.isMultiple ?? inferredMulti;
              return isMultiple ? (
                <div className={styles.meta} style={{ marginTop: 8, fontStyle: 'italic' }}>
                  Có thể chọn nhiều đáp án
                </div>
              ) : null;
            })()}
          </div>
        ))}

        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.primary}`} onClick={handleSubmit}>Nộp bài</button>
        </div>

        {result && (
          <div className={styles.result}>
            <div className={styles.scoreLine}>
              Kết quả: {result.percentage}% ({result.score}/{result.total} đúng)
            </div>
            {result.results.map((r: ExamResultItem, i: number) => (
              <div key={i} className={styles.resultItem}>
                <div style={{ fontWeight: 600 }}>{i + 1}. {r.question}</div>
                <div>
                  Bạn chọn: {' '}
                  <span className={r.isCorrect ? styles.correct : styles.incorrect}>
                    {Array.isArray(r.userAnswer) ? r.userAnswer.join(', ') : r.userAnswer}
                  </span>
                  {' '}· Đáp án đúng: <strong>{Array.isArray(r.correctAnswer) ? r.correctAnswer.join(', ') : r.correctAnswer}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}