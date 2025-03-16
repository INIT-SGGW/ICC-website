"use client";

import { Button, Input } from "@repo/ui";
import { useState } from "react";
import { useCreateAdmin } from "../../services/api";
import { HttpMethods } from "../../types/enums";
import { useRouter } from "next/navigation";

function validate(email: string): string | null {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email) ? null : "Niepoprawny format adresu email";
}

export function AddAdminForm(): React.JSX.Element {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const { trigger, isMutating } = useCreateAdmin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);

        const validationErrors = validate(email);
        if (validationErrors) {
            setError(validationErrors);
            return;
        }

        try {
            await trigger({ body: { email }, method: HttpMethods.POST, credentials: true });
            setError(null);
            router.push("/admin");
        } catch (e: unknown) {
            setError("Nie udało się dodać admina");
        }
    }

    return (
        <form className="w-full max-w-[600px] flex flex-col gap-2" noValidate onSubmit={(e) => { handleSubmit(e) }}>
            <Input required type="email" placeholder="Email*" value={email} onChange={(e) => { setEmail(e.target.value); }} />
            <Button type="submit" disabled={isMutating}>{isMutating ? "..." : "Dodaj admina"}</Button>
            <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
    )
}