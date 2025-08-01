import { Grade } from "./grade"

export interface Subject {
  _id: string
  subjectName: string
  status?: boolean
  grade: Grade
  createdAt: Date
  updatedAt: Date
  slug: string
}

