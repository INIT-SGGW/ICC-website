"use client";

import { Button, Input } from "@repo/ui";
import { useState } from "react";
import { useCreateAdmin, useVerifyAdmin } from "../../services/api";
import { HttpMethods } from "../../types/enums";
import { useRouter, useSearchParams } from "next/navigation";
import { VerifyAdminRequest } from "@repo/types";

function validate(formData: VerifyAdminRequest, repeatPassword: string): string | null {
    if (!formData.email) return "Brak adresu email w linku weryfikacyjnym";
    if (!formData.verificationToken) return "Brak tokenu weryfikacyjnego w linku weryfikacyjnym";
    if (!formData.firstName) return "Imię jest wymagane";
    if (!formData.lastName) return "Nazwisko jest wymagane";
    if (!formData.discordUsername) return "Nazwa użytkownika Discord jest wymagana";
    if (!formData.password) return "Hasło jest wymagane";
    if (formData.password.length < 8) return "Hasło musi mieć co najmniej 8 znaków";
    if (formData.password !== repeatPassword) return "Podane hasła nie są takie same";
    return null;
}

export function AdminVerifyForm(): React.JSX.Element {
    const router = useRouter();

    const serarchParams = useSearchParams();

    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const email = serarchParams.get("email");
    const token = serarchParams.get("token");

    const [formData, setFormData] = useState<VerifyAdminRequest>({
        email: email || "",
        verificationToken: token || "",
        discordUsername: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const { trigger, isMutating } = useVerifyAdmin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);

        const validationErrors = validate(formData, repeatPassword);
        if (validationErrors) {
            setError(validationErrors);
            return;
        }

        try {
            await trigger({ body: formData, method: HttpMethods.POST, credentials: true });
            setError(null);
            router.push("/");
        } catch (e: unknown) {
            setError("Nie udało się dodać admina");
        }
    }

    return (
        <form className="w-full max-w-[600px] flex flex-col gap-2" noValidate onSubmit={(e) => { handleSubmit(e) }}>
            <Input required type="text" placeholder="Imię*" value={formData.firstName} onChange={(e) => { setFormData((prev) => ({ ...prev, firstName: e.target.value })) }} />
            <Input required type="text" placeholder="Nazwisko*" value={formData.lastName} onChange={(e) => { setFormData((prev) => ({ ...prev, lastName: e.target.value })) }} />
            <Input required type="text" placeholder="Discord nickname*" value={formData.discordUsername} onChange={(e) => { setFormData((prev) => ({ ...prev, discordUsername: e.target.value })) }} />
            <Input required type="password" placeholder="Hasło*" value={formData.password} onChange={(e) => { setFormData((prev) => ({ ...prev, password: e.target.value })) }} />
            <Input required type="password" placeholder="Powtórz hasło*" value={repeatPassword} onChange={(e) => { setRepeatPassword(e.target.value) }} />
            <Button type="submit" disabled={isMutating}>{isMutating ? "..." : "Zarejestruj się"}</Button>
            <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
    )
}