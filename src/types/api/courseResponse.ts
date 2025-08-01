import { Course } from "../models/course"

export interface courseResponse extends dataResponse{
    courses?: [Course]
}