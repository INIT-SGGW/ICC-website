export type ServerError = {
    title: string,
    status: number,
    detail: string,
    errors?: {
        message: string,
    }[]
}