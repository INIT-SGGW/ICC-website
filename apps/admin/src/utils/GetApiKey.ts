export function getApiKey(): string {
    switch (process.env.NEXT_PUBLIC_NODE_ENV) {
        case "production":
            return "0b1cd31926e67d44a01727abcdcdd044f939d1373b16f8daec2e91007faf14f92b3";
        case "test":
            return "ApiKey";
        default:
            return "ApiKey";
    }
}