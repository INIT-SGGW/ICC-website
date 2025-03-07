import { UserResponse } from "./responses";

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