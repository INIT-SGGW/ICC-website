
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