import { Semester } from "./enums.js"

export type RankingData = {
    nickname: string
    indexNumber: number
    points: number
}

export type AccountStatsData = {
    ranking: number;
    score: number;
    taskScores: number[];
}

export type LoginResponseBody = {
    status: number
    userId: string
}

export type UserResponse = {
    userId: string
    emails: string[]
    firstName: string
    lastName: string
    birthDate: Date
    aggrement: boolean
}

export type RegisterResponse = {
    status: string;
    error?: string;
}

export type GetTaskUserResponse = {
    content: string,
    releaseDate: Date,
}

export type GetTaskAdminResponse = {
    title: string,
    taskNumber: number,
    releaseDate: Date,
    semester: Semester,
}
export type GetTaskUpdateResponse = {
    title: string,
    taskNumber: number,
    releaseDate: Date,
    semester: Semester,
}
export type GetAllTasksResponse = {
    tasks: {
        taskId: string,
        title: string,
        taskNumber: number,
        releaseDate: Date,
        isOpen: boolean
    }[]
}

export type GetTaskAnswersResponse = {
    isCorrect: boolean
    previousAnswers: {
        date: Date,
        answer: string,
    }[]
    input: string,
    cooldown: Date | null
    correctAnswer?: string
    points?: number
}

export type GetAllUsersResponse = {
    users: {
        userId: string;
        firstName: string;
        lastName: string;
        email: string;
    }[]
}


export type GetAllAdminsResponse = {
    admins: {
        userId: string;
        firstName: string;
        lastName: string;
        email: string;
    }[]
}

export type GetSingleAdminResponse = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export type GetNextTaskResponse = {
    taskId: string;
    releaseDate: Date;
}

export type SendAnswerTaskResponse = {
    isCorrect: boolean
    previousAnswers: {
        date: Date,
        answer: string,
    }[]
    cooldown: Date | null
    correctAnswer?: string
    points?: number
}

export type GetUserStatsResponse = {
    rankingPosition: number;
    pointsGeneral: number;
    pointsTask: number[];
}

export type Ranking = {
    firstName: string,
    lastName: string,
    indexNumber: number,
    points: number,
}[]

export type GetRankingResponse = {
    general: Ranking,
    perTask: Ranking[],
}

export type GetUserResponse = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}