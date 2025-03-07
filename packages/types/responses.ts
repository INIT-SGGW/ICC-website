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

export type FindTaskResponse = {
    task?: string
}

export type FindOpenTasksResponse = {
    tasks: {
        taskId: number,
        isOpen: boolean
    }[]
}

export type AnswerTaskResponse = {
    isCorrect: boolean
    previousAnswers: {
        date: Date,
        answer: string,
    }[]
    correctAnswer?: string
    cooldown?: number
    points?: number
}
