import { fetcher, fetcherICC, fetcherICCFile } from "./fetcher";
import type { Key, SWRResponse } from "swr";
import useSWRMutation, { type SWRMutationResponse } from "swr/mutation";
import type { GetAllAdminsResponse, GetAllTasksResponse, GetAllUsersResponse, GetSingleAdminResponse, GetSingleUserResponse, GetTaskAdminResponse, LoginRequest, LoginResponseBody, RegisterAdminRequest, RegisterRequest, RegisterResponse, UpdateAdminRequest, UpdateUserRequest, UserResponse, VerifyEmailRequest } from "@repo/types";
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
    return useSWR("/users", (url) => fetcherICC<null, GetAllUsersResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useGetTask(url: string): SWRResponse<GetTaskAdminResponse, CustomError> {
    return useSWR(url, () => fetcherICC<null, GetTaskAdminResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useGetAllTasks(url: string): SWRResponse<GetAllTasksResponse, CustomError> {
    return useSWR(url, () => fetcherICC<null, GetAllTasksResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useDeleteTask(url: string): SWRMutationResponse<null, CustomError, Key, FetcherArgs<null> | undefined> {
    return useSWRMutation(url, () => fetcherICC<null, null>(url, { arg: { method: HttpMethods.DELETE, credentials: true } }));
}

export function useAddTask(): SWRMutationResponse<void, CustomError, Key, { body: FormData, method: HttpMethods }> {
    return useSWRMutation("/admin/tasks", fetcherICCFile);
}

export function useUpdateTask(id: string): SWRMutationResponse<void, CustomError, Key, { body: FormData, method: HttpMethods }> {
    return useSWRMutation(`/admin/tasks/${id}`, fetcherICCFile);
}

export function useGetMe(): SWRResponse<UserResponse, CustomError> {
    return useSWR("/admin/me", (url) => fetcherICC<null, UserResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useCreateAdmin(): SWRMutationResponse<void, CustomError, Key, FetcherArgs<RegisterAdminRequest> | undefined> {
    return useSWRMutation("/register/admin", fetcher<RegisterAdminRequest, void>);
}

export function useVerifyAdmin(): SWRMutationResponse<void, CustomError, Key, FetcherArgs<VerifyEmailRequest> | undefined> {
    return useSWRMutation("/register/admin/verifiy", fetcher<VerifyEmailRequest, void>);
}

export function useGetAllAdmins(): SWRResponse<GetAllAdminsResponse, CustomError> {
    return useSWR("/admin/admin", (url) => fetcherICC<null, GetAllAdminsResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useDeleteAdmin(id: string): SWRMutationResponse<null, CustomError, Key, FetcherArgs<null> | undefined> {
    return useSWRMutation(`/admin/admin/${id}`, (url) => fetcherICC<null, null>(url, { arg: { method: HttpMethods.DELETE, credentials: true } }));
}

export function useGetSingleAdmin(id: string): SWRResponse<GetSingleAdminResponse, CustomError> {
    return useSWR(`/admin/admin/${id}`, (url) => fetcherICC<null, GetSingleAdminResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useUpdateAdmin(id: string): SWRMutationResponse<void, CustomError, Key, FetcherArgs<UpdateAdminRequest> | undefined> {
    return useSWRMutation(`/admin/admin/${id}`, fetcherICC<UpdateAdminRequest, void>);
}

export function useGetSingleUser(id: string): SWRResponse<GetSingleUserResponse, CustomError> {
    return useSWR(`/users/${id}`, (url) => fetcherICC<null, GetSingleUserResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useDeleteUser(id: string): SWRMutationResponse<null, CustomError, Key, FetcherArgs<null> | undefined> {
    return useSWRMutation(`/users/${id}`, (url) => fetcherICC<null, null>(url, { arg: { method: HttpMethods.DELETE, credentials: true } }));
}

export function useUpdateUser(id: string): SWRMutationResponse<void, CustomError, Key, FetcherArgs<UpdateUserRequest> | undefined> {
    return useSWRMutation(`/users/${id}`, fetcherICC<UpdateUserRequest, void>);
}