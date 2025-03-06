import type { ServerError } from "@repo/types";

class CustomError extends Error {
    constructor(message: string, public info?: ServerError, public status?: number) {
        super(message);
    }

    public getMessage(): string {
        if (
            this.info?.errors &&
            this.info.errors.length > 0
        ) {
            return this.info.errors[0].message
        } else if (this.info?.detail) {
            return this.info.detail
        }
        return this.message;
    }
}

export default CustomError;