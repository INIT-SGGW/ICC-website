import { fetcher, fetcherICC } from "./fetcher";
import type { Key, SWRResponse } from "swr";
import useSWRMutation, { type SWRMutationResponse } from "swr/mutation";
import type { GetAllTasksResponse, GetAllUsersResponse, GetTaskAdminResponse, LoginRequest, LoginResponseBody, RegisterRequest, RegisterResponse, UserResponse, VerifyEmailRequest } from "@repo/types";
import type { FetcherArgs } from "../types/types";
import { HttpMethods } from "../types/enums";
import useSWR from "swr";
import type CustomError from "../utils/CustomError";

export function useUser(url: string): SWRMutationResponse<UserResponse, unknown, Key, FetcherArgs<null> | undefined> {
    return useSWRMutation(url, () => fetcher(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useRegister(): SWRMutationResponse<RegisterResponse, unknown, Key, FetcherArgs<RegisterRequest> | undefined> {
    return useSWRMutation(`/register/admin`, fetcher<RegisterRequest, RegisterResponse>);
}

export function useLogin(): SWRMutationResponse<LoginResponseBody, unknown, Key, FetcherArgs<LoginRequest> | undefined> {
    return useSWRMutation(`/register/admin/login`, fetcher<LoginRequest, LoginResponseBody>);
}

export function useVerifyEmail(): SWRMutationResponse<unknown, unknown, Key, FetcherArgs<VerifyEmailRequest> | undefined> {
    return useSWRMutation("/register/admin/verifiy", fetcher<VerifyEmailRequest, unknown>);
}

export function useLogout(): SWRMutationResponse<unknown, unknown, Key, FetcherArgs<null> | undefined> {
    return useSWRMutation("/register/admin/logout", fetcher<null, unknown>);
}

export function useGetAllUsers(): SWRResponse<GetAllUsersResponse, CustomError> {
    return useSWR("/admin/users", (url) => fetcherICC<null, GetAllUsersResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useGetTask(url: string): SWRResponse<GetTaskAdminResponse, CustomError> {
    return useSWR(url, () => fetcherICC<null, GetTaskAdminResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useGetAllTasks(url: string): SWRResponse<GetAllTasksResponse, CustomError> {
    return useSWR(url, () => fetcherICC<null, GetAllTasksResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useDeleteTask(url: string): SWRMutationResponse<void, CustomError, Key, FetcherArgs<null> | undefined> {
    return useSWRMutation(url, () => fetcherICC<null, void>(url, { arg: { method: HttpMethods.DELETE, credentials: true } }));
}