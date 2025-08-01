import { Grade } from "../models/grade"

export interface gradeResponse extends dataResponse{
    grades?: [Grade]
}