import { Degree, Faculty } from "./enums.js"

export type LoginRequest = {
    email: string
    password: string
}

export type VerifyEmailRequest = {
    email: string
    verificationToken: string
}

export type RegisterRequest = {
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

export type RegisterAdminRequest = {
    email: string;
}

export type VerifyAdminRequest = {
    discordUsername: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    verificationToken: string
}

export type UpdateAdminRequest = {
    firstName: string,
    lastName: string,
    email: string
    discordUsername: string
}

export type CreateTaskRequest = {
    title: string
    releaseDate: Date
    partA: File
    partB: File
    answers: File
}

export type SendAnswerTaskRequest = {
    answer: string
}

export type UpdateUserRequest = {
    firstName: string
    lastName: string
    emails: string[]
    academicYear: number
    faculty: Faculty
    degree: Degree
}