export function getApiUrl(isICC: boolean): string {
    switch (process.env.NEXT_PUBLIC_NODE_ENV) {
        case "production":
            return "https://initcodingchallenge.pl".concat(isICC ? "/backend" : "/api/v1");
        case "test":
            return "https://initcodingchallenge.pl:5000".concat(isICC ? "/backend" : "/api/v1");
        default:
            return "http://localhost:".concat(isICC ? "4500" : "8080");
    }
}