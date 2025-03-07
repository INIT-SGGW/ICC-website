import CustomError from "@/utils/CustomError";
import type { FetcherArgs } from "@/types/types";
import type { ServerError } from "@repo/types";

export const fetcher = async <R, T>(url: string, { arg }: { arg?: FetcherArgs<R> }): Promise<T> => {
    const api_key = process.env.NEXT_PUBLIC_ICC_API_KEY || "0b1cd31926e67d44a01727abcdcdd044f939d1373b16f8daec2e91007faf14f92b3";
    const api_url = process.env.NEXT_PUBLIC_ICC_API_URL || "https://initcodingchallenge.pl/api/v1";

    const fullUrl = api_url + url;
    const response = await fetch(fullUrl, {
        method: arg?.method || "GET",
        headers: {
            "Content-Type": "application/json",
            "X-ICC-API-KEY": api_key,
        },
        credentials: arg?.credentials ? "include" : "omit",
        body: JSON.stringify(arg?.body),
    })

    if (!response.ok) {
        const error = new CustomError('Wystąpił błąd podczas pobierania danych.')
        error.info = await response.json() as ServerError
        error.status = response.status
        throw error
    }

    return response.json() as Promise<T>;
};
