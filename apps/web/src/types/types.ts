import type { HttpMethods } from "./enums";

export type FetcherArgs<T> = {
    body?: T,
    method?: HttpMethods,
    credentials?: boolean
};