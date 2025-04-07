import CustomError from "../utils/CustomError";
import type { FetcherArgs } from "../types/types";
import type { ServerError } from "@repo/types";
import { getApiUrl } from "../utils/GetApiUrl";
import { getApiKey } from "../utils/GetApiKey";
import type { HttpMethods } from "../types/enums";

export const fetcher = async <R, T>(url: string, { arg }: { arg?: FetcherArgs<R> }): Promise<T> => {
    const fullUrl = getApiUrl(false) + url;
    const response = await fetch(fullUrl, {
        method: arg?.method || "GET",
        headers: {
            "Content-Type": "application/json",
            "X-INIT-ADMIN-API-KEY": getApiKey(),
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
            res.errors.length > 0
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
        let message = "Wystąpił błąd podczas komunikacji z serwerem.";

        if (response.status === 401) {
            localStorage.removeItem("userId");
        }

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

    if (response.status === 204) return {} as Promise<T>;
    return response.json() as Promise<T>;
};

export const fetcherICCFile = async (url: string, { arg }: { arg: { body: FormData, method: HttpMethods } }): Promise<void> => {
    const fullUrl = getApiUrl(true) + url;

    const response = await fetch(fullUrl, {
        method: arg.method,
        credentials: "include",
        body: arg.body,
    })

    if (!response.ok) {
        const res = await response.json() as ServerError;
        let message = "Wystąpił błąd podczas komunikacji z serwerem.";

        if (response.status === 401) {
            localStorage.removeItem("userId");
        }

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
}