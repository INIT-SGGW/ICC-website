export type ServerError = {
    title: string,
    status: string,
    detail: string,
    errors?: {
        message: string,
    }[]
}