"use client"

import { Input, Button } from "@repo/ui"
import type { FormEvent } from "react";
import { useEffect, useState } from "react"
import { useLogin } from "../../services/api"
import CustomError from "../../utils/CustomError"
import type { LoginFormDTO } from "@repo/types"
import { HttpMethods } from "../../types/enums"
import { useRouter } from "next/navigation"

const validateData = (data: LoginFormDTO): string | undefined => {
    if (data.password.length < 0) return "Hasło nie może być puste"
    return undefined
}

export function LoginCard(): React.JSX.Element {
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const { trigger, isMutating } = useLogin();

    const [formData, setFormData] = useState<LoginFormDTO>({
        email: "",
        password: ""
    })
    const [error, setError] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (typeof window === "undefined") return;
        const userId = localStorage.getItem("userId")
        if (userId) {
            router.push("/account")
        } else {
            setLoading(false)
        }
    }, [router])

    const handleLogin = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setError(undefined)

        const validationError = validateData(formData)
        if (validationError) { setError(validationError); return; }
        try {
            const response = await trigger({ body: formData, method: HttpMethods.POST, credentials: true })
            const userId = response.userId.split("\"")[1]
            localStorage.setItem("userId", userId)
            router.push("/")
        } catch (e: unknown) {
            if (e instanceof CustomError || e instanceof Error) {
                setError(e.message); return;
            }
            setError("Wystąpił błąd podczas logowania.");
        }
    }

    if (loading) {
        return <div> </div>;
    }

    return (
        <div className="bg-black p-4 flex flex-col items-start justify-start gap-2 w-full max-w-[350px]">
            <form onSubmit={(e) => { void handleLogin(e) }} onInvalid={(e) => { e.preventDefault(); }}>
                <Input type="text" placeholder="Login" autoComplete="email" value={formData.email} onChange={(e) => { setFormData((prev: LoginFormDTO) => ({ ...prev, email: e.target.value })); }} className="mb-2" />
                <Input type="password" placeholder="Hasło" autoComplete="current-password" value={formData.password} onChange={(e) => { setFormData((prev: LoginFormDTO) => ({ ...prev, password: e.target.value })); }} />

                {error ? <p className="text-red-500 text-sm">{error}</p> : null}

                <Button disabled={isMutating} type="submit" className="mt-4">{isMutating ? "..." : "Zaloguj się"}</Button>
            </form>
        </div>
    )
}