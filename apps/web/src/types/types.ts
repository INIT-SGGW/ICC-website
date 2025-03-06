import type { HttpMethods } from "./enums";

export type FetcherArgs = {
    body?: Record<string, string | number | boolean | Date>,
    method?: HttpMethods,
    credentials?: boolean
};