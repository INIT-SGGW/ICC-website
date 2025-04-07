import { fetcher, fetcherICC } from "./fetcher";
import type { Key, SWRResponse } from "swr";
import useSWRMutation, { type SWRMutationResponse } from "swr/mutation";
import type { GetAllTasksResponse, GetNextTaskResponse, GetRankingResponse, GetTaskAnswersResponse, GetTaskUserResponse, GetUserStatsResponse, LoginRequest, LoginResponseBody, RegisterRequest, RegisterResponse, SendAnswerTaskRequest, SendAnswerTaskResponse, UserResponse, VerifyEmailRequest } from "@repo/types";
import type { FetcherArgs } from "@/types/types";
import { HttpMethods } from "@/types/enums";
import type CustomError from "@/utils/CustomError";
import useSWR from "swr";

export function useUser(url: string): SWRMutationResponse<UserResponse, unknown, Key, FetcherArgs<null> | undefined> {
    return useSWRMutation(url, () => fetcher(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useRegister(): SWRMutationResponse<RegisterResponse, unknown, Key, FetcherArgs<RegisterRequest> | undefined> {
    return useSWRMutation(`/register/user`, fetcher<RegisterRequest, RegisterResponse>);
}

export function useLogin(): SWRMutationResponse<LoginResponseBody, unknown, Key, FetcherArgs<LoginRequest> | undefined> {
    return useSWRMutation(`/register/login`, fetcher<LoginRequest, LoginResponseBody>);
}

export function useVerifyEmail(): SWRMutationResponse<unknown, unknown, Key, FetcherArgs<VerifyEmailRequest> | undefined> {
    return useSWRMutation("/register/verifiy", fetcher<VerifyEmailRequest, unknown>);
}

export function useLogout(): SWRMutationResponse<unknown, unknown, Key, FetcherArgs<null> | undefined> {
    return useSWRMutation("/register/logout", fetcher<null, unknown>);
}

export function useGetTask(url: string): SWRResponse<GetTaskUserResponse, CustomError> {
    return useSWR(url, (_url) => fetcherICC<null, GetTaskUserResponse>(_url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useGetNextTask(url: string): SWRResponse<GetNextTaskResponse, CustomError> {
    return useSWR(url, (_url) => fetcherICC<null, GetNextTaskResponse>(_url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useGetAllTasks(url: string): SWRResponse<GetAllTasksResponse, CustomError> {
    return useSWR(url, () => fetcherICC<null, GetAllTasksResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useGetTaskAnswers(url: string): SWRResponse<GetTaskAnswersResponse, CustomError> {
    return useSWR(url, () => fetcherICC<null, GetTaskAnswersResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useSendAnswerTask(url: string): SWRMutationResponse<SendAnswerTaskResponse, CustomError, Key, FetcherArgs<SendAnswerTaskRequest> | undefined> {
    return useSWRMutation(url, fetcherICC<SendAnswerTaskRequest, SendAnswerTaskResponse>);
}

export function useGetUserStats(): SWRResponse<GetUserStatsResponse, CustomError> {
    return useSWR("/users/stats", (url) => fetcherICC<null, GetUserStatsResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useGetRanking(url: string): SWRResponse<GetRankingResponse, CustomError> {
    return useSWR(url, (_url) => fetcherICC<null, GetRankingResponse>(_url, { arg: { method: HttpMethods.GET, credentials: true } }));
}