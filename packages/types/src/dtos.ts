import { Semester } from "./enums.js";
import { UserResponse } from "./responses.js";

export type User = UserResponse

export type LoginFormDTO = {
    email: string
    password: string
}

export type RegisterFormDTO = {
    firstName: string
    lastName: string
    email: string
    password: string
    dateOfBirth: Date
    academicYear: number
    faculity: string
    degree: string
    studentIndex: string
    aggrement: boolean
}

export type CreateTaskFormDTO = {
    title: string
    semester: Semester
    taskNumber: number
    releaseDate: Date
    partA: File | null
    partB: File | null
    answers: File | null
}