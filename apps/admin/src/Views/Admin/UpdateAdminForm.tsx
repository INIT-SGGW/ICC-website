"use client";

import { UpdateAdminRequest } from "@repo/types";
import { Button, Input } from "@repo/ui";
import React, { useEffect, useState } from "react";
import { useGetSingleAdmin, useUpdateAdmin } from "../../services/api";
import { HttpMethods } from "../../types/enums";
import { useRouter } from "next/navigation";

type Props = {
    id: string;
}

const validate = (formData: UpdateAdminRequest): string | null => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email)) return "Niepoprawny format adresu email";
    return null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Temporary
export function UpdateAdminForm({ id }: Props): React.JSX.Element {
    const [formData, setFormData] = useState<UpdateAdminRequest>({
        email: "",
        firstName: "",
        lastName: "",
        discordUsername: "",
    })
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const { data, error: getError } = useGetSingleAdmin(id);
    const { trigger, isMutating } = useUpdateAdmin(id);

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);

        const validationErrors = validate(formData);
        if (validationErrors) {
            setError(validationErrors);
            return;
        }

        try {
            await trigger({ method: HttpMethods.PATCH, body: formData, credentials: true });
            setError(null);
            router.push("/admin");
        } catch (e: unknown) {
            setError("Nie udało się zaktualizować danych");
        }
    }

    if (getError) {
        return <div className="text-center">
            <h1 className="text-cred text-4xl">Ups...</h1>
            <p className="text-white text-lg">Wystąpił problem podczas pobierania danych</p>
        </div>
    }

    return (
        <form className="w-full max-w-[600px] flex flex-col gap-2" noValidate onSubmit={(e) => { handleSubmit(e) }}>
            <Input required type="email" placeholder="Email*" value={formData.email} onChange={(e) => { setFormData((prev) => ({ ...prev, email: e.target.value })) }} />
            <Input required type="text" placeholder="Imię" value={formData.firstName} onChange={(e) => { setFormData((prev) => ({ ...prev, firstName: e.target.value })) }} />
            <Input required type="text" placeholder="Nazwisko" value={formData.lastName} onChange={(e) => { setFormData((prev) => ({ ...prev, lastName: e.target.value })) }} />
            <Input required type="text" placeholder="Discord nickname" value={formData.discordUsername} onChange={(e) => { setFormData((prev) => ({ ...prev, discordUsername: e.target.value })) }} />
            <Button type="submit" disabled={isMutating}>{isMutating ? "..." : "Modyfikuj dane"}</Button>
            <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
    )
}