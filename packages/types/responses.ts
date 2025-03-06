export type RankingData = {
    nickname: string,
    indexNumber: number,
    points: number,
}

export type AccountStatsData = {
    ranking: number;
    score: number;
    taskScores: number[];
}

export type LoginResponseBody = {
    status: number,
    userId: string
}

export type UserResponse = {
    userId: string,
    emails: string[],
    firstName: string,
    lastName: string,
    birthDate: Date,
    aggrement: boolean,
}

export type RegisterUserResponse = {
    status: string;
    error?: string;
}