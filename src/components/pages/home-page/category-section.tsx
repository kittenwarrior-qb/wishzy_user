'use client'

import React, { useEffect, useState } from 'react'
import { Grade } from '@/types/schema/grade.schema'
import { GradeService } from '@/services/grade.service'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'


const CategorySection = () => {
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GradeService.getGrades()
        console.log(data)
        setGrades(data?.grades || [])
      } catch (error) {
        console.error('Error loading grades:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <div className='mx-auto max-w-[1280px]'>
        <p className='font-semibold text-[30px]'>Khám phá khóa học tại Wishzy.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-15 rounded-md gap-6" />
              ))
            : grades.map((grade) => (
                <div className="w-full h-[100px] flex gap-2 items-center" key={grade._id}>
                  <Image src={'https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png'} alt={grade.gradeName} width={100} height={100} className="rounded-md mb-2" />
                  <div>
                    <p className='font-semibold'>{grade.gradeName}</p>
                    <p className='text-[14px] text-gray-600'>100 khóa học</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  )
}

export default CategorySection