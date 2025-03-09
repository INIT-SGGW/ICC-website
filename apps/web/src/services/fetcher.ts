import CustomError from "@/utils/CustomError";
import type { FetcherArgs } from "@/types/types";
import type { ServerError } from "@repo/types";
import { STATUS_CODES } from "http";

export const fetcher = async <R, T>(url: string, { arg }: { arg?: FetcherArgs<R> }): Promise<T> => {
    const api_url = process.env.NEXT_PUBLIC_INIT_API_URL || "https://initcodingchallenge.pl/api/v1";

    const fullUrl = api_url + url;
    const response = await fetch(fullUrl, {
        method: arg?.method || "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: arg?.credentials ? "include" : "omit",
        body: JSON.stringify(arg?.body),
    })

    if (!response.ok) {
        const res = await response.json() as ServerError;

        if (response.status === 401) {
            localStorage.removeItem("userId");
        }

        let message = "Wystąpił błąd podczas komunikacji z serwerem.";
        if (
            res.errors &&
            res.errors.length > 0 &&
            res.errors[0].message
        ) message = res.errors[0].message
        else if (res.detail) message = res.detail
        else if (res.status) message = res.status

        const error = new CustomError(message)
        error.status = response.status
        throw error
    }

    return response.json() as Promise<T>;
};

export const fetcherICC = async <R, T>(url: string, { arg }: { arg?: FetcherArgs<R> }): Promise<T> => {
    const api_url = process.env.NEXT_PUBLIC_ICC_API_URL || "https://initcodingchallenge.pl/";

    const fullUrl = api_url + url;
    const response = await fetch(fullUrl, {
        method: arg?.method || "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: arg?.credentials ? "include" : "omit",
        body: JSON.stringify(arg?.body),
    })

    if (!response.ok) {
        const res = await response.json() as ServerError;

        if (response.status === 401) {
            localStorage.removeItem("userId");
        }

        let message = "Wystąpił błąd podczas komunikacji z serwerem.";
        if (
            res.errors &&
            res.errors.length > 0 &&
            res.errors[0].message
        ) message = res.errors[0].message
        else if (res.detail) message = res.detail
        else if (res.status) message = res.status

        const error = new CustomError(message)
        error.status = response.status
        throw error
    }

    return response.json() as Promise<T>;
};