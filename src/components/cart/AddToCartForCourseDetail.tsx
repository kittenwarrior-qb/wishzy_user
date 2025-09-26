'use client';

import AddToCartButton from '@/components/cart/AddToCartButton';
import type { CartItem } from '@/store/slices/cart';

interface Props {
  course: {
    id: string;
    name: string;
    price: number;
    image: string;
    level: string;
    duration: string; // ví dụ: "60 giờ học"
  };
  label?: string;
  inCartLabel?: string;
  className?: string;
}

export default function AddToCartForCourseDetail({ course, label = 'Đăng ký khoá học', inCartLabel = 'Đã đăng ký', className = '' }: Props) {
  const product: Omit<CartItem, 'quantity'> = {
    _id: course.id,
    courseName: course.name,
    instructor: 'Giảng viên',
    price: course.price,
    originalPrice: Math.round(course.price * 1.2),
    thumbnail: course.image,
    slug: course.name.toLowerCase().replace(/\s+/g, '-'),
    level: course.level,
    numberOfStudents: 0,
    totalDuration: parseInt(String(course.duration).replace(/\D/g, '')) || 0,
    createdBy: {
      _id: 'instructor-1',
      fullName: 'Giảng viên',
      email: 'instructor@example.com',
      avatar: undefined,
    },
    subject: {
      _id: 'subject-1',
      subjectName: 'Chung',
      slug: 'chung',
    },
    grade: {
      _id: 'grade-1',
      gradeName: 'Tất cả',
    },
  };

  return (
    <AddToCartButton product={product} variant="primary" size="lg" label={label} inCartLabel={inCartLabel} className={className} />
  );
}
