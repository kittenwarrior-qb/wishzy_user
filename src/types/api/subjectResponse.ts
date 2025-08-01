import { Subject } from "../models/subject"

export interface subjectResponse extends dataResponse{
    subject?: [Subject]
}