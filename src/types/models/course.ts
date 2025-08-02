export type Course = {
  _id: string
  courseName: string
  price: number
  status: boolean
  rating: number
  numberOfStudents: number
  level: string
  totalDuration: number
  slug: string
  createdAt: string
  updatedAt?: string
  subject: {
    subjectName: string
    slug: string
  }
  grade?: {
    gradeName: string
  }
  createdBy: {
    fullName: string
    email: string
  }
}
