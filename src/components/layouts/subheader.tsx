'use client'

import React, { useEffect, useState } from 'react'
import { GradeService } from '@/services/grade.service'
import { Skeleton } from '@/components/ui/skeleton'
import type { Grade } from '@/types/schema/grade.schema'


const SubHeader = () => {
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
    <div className="hidden lg:flex min-h-[40px] justify-center items-center gap-6 ">
      {loading
        ? Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-15 rounded-md gap-6" />
          ))
        : grades.map((grade) => (
            <span className="text-[14px] font-medium text-base-content " key={grade._id}>
              {grade.gradeName}
            </span>
          ))}
    </div>
  )
}

export default SubHeader
