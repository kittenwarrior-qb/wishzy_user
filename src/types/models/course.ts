import { Subject } from "./subject"

export interface Course {
  _id: string
  courseName: string
  description?:string
  thumbnail:any
  price: number
  sale?:any
  status: boolean
  rating: number
  numberOfStudents: number
  level: string
  requirements?: any[]
  totalDuration: number
  subject: any
  grade: any
  createdBy: any
  createdAt: Date
  updatedAt: Date
  slug: string
  // grade?: 
}

