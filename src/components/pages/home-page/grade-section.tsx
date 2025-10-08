'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Grade } from '@/types/schema/grade.schema'
import { GradeService } from '@/services/grade.service'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

const CategoryCard = ({ grade }: { grade: Grade }) => {
  return (
    <Card
      className="w-full rounded-lg overflow-hidden border border-base-content/30
      transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03]
      flex flex-col p-4 bg-white dark:bg-gray-800"
    >
      <Link href={`/courses?gradeId=${grade._id}`}>
        <Image
          src={'https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png'}
          alt={grade.gradeName}
          width={200}
          height={200}
          className="rounded-lg w-full h-[150px] object-cover mb-4"
        />
        <div className='flex items-center justify-between'>
          <div>
            <p className='font-bold text-[16px] hover:underline'>{grade.gradeName}</p>
            <p className='text-[14px] text-gray-600 dark:text-gray-400'>100 khóa học</p>
          </div>
          <ArrowRight className="w-5 h-5 text-primary" />
        </div>
      </Link>
    </Card>
  );
};

const CategorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [grades, setGrades] = useState<Grade[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GradeService.getGrades()
        setGrades(data?.grades || [])
      } catch (error) {
        console.error('Error loading grades:', error)
      }
    }
    fetchData()
  }, [])

 

  return (
    <div ref={sectionRef} className='mx-auto max-w-[1280px] mb-10'>
      <h2 className='font-semibold text-[30px] mb-12 px-3 lg:px-0'>Khám phá khóa học tại Wishzy.</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  px-3 lg:px-0">
        {grades.map((grade) => (
          <div key={grade._id} className="category-card">
            <CategoryCard grade={grade} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;