import CustomError from "@/utils/CustomError";
import type { FetcherArgs } from "@/types/types";
import type { ServerError } from "@repo/types";
import { getApiUrl } from "@/utils/GetApiUrl";

export const fetcher = async <R, T>(url: string, { arg }: { arg?: FetcherArgs<R> }): Promise<T> => {
    const fullUrl = getApiUrl(false) + url;
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
    const fullUrl = getApiUrl(true) + url;
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