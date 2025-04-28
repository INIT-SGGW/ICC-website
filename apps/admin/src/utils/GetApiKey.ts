export function getApiKey(): string {
    switch (process.env.NEXT_PUBLIC_NODE_ENV) {
        case "production":
            return process.env.NEXT_PUBLIC_API_KEY_PROD || "";
        case "test":
            return "ApiKey";
        default:
            return "ApiKey";
    }
}