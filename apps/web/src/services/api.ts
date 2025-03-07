import { fetcher } from "./fetcher";
import type { Key } from "swr";
import useSWRMutation, { type SWRMutationResponse } from "swr/mutation";
import type { LoginRequest, LoginResponseBody, RegisterRequest, RegisterResponse, UserResponse, VerifyEmailRequest } from "@repo/types";
import type { FetcherArgs } from "@/types/types";
import { HttpMethods } from "@/types/enums";

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