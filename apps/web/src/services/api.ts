import { fetcher } from "./fetcher";
import type { Key } from "swr";
import useSWRMutation, { type SWRMutationResponse } from "swr/mutation";
import type { LoginResponseBody, RegisterUserResponse, UserResponse } from "@repo/types";
import type { FetcherArgs } from "@/types/types";
import { HttpMethods } from "@/types/enums";

export function useUser(url: string): SWRMutationResponse<UserResponse, unknown, Key, FetcherArgs | undefined> {
    return useSWRMutation(url, () => fetcher<UserResponse>(url, { arg: { method: HttpMethods.GET, credentials: true } }));
}

export function useRegister(): SWRMutationResponse<RegisterUserResponse, unknown, Key, FetcherArgs | undefined> {
    return useSWRMutation(`/register/user`, fetcher<RegisterUserResponse>);
}

export function useLogin(): SWRMutationResponse<LoginResponseBody, unknown, Key, FetcherArgs | undefined> {
    return useSWRMutation(`/register/login`, fetcher<LoginResponseBody>);
}

export function useVerifyEmail(): SWRMutationResponse<unknown, unknown, Key, FetcherArgs | undefined> {
    return useSWRMutation("/register/verifiy", fetcher);
}

export function useLogout(): SWRMutationResponse<unknown, unknown, Key, FetcherArgs | undefined> {
    return useSWRMutation("/register/logout", fetcher);
}