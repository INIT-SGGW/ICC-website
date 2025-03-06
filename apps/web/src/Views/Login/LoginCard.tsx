"use client"

import { Input, Button } from "@repo/ui"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLogin } from "@/services/api"
import CustomError from "@/utils/CustomError"
import type { LoginForm } from "@repo/types"
import { HttpMethods } from "@/types/enums"

const validateData = (data: LoginForm): string | undefined => {
    if ((/^[a-z]\d{6}@sggw.edu.pl$/.exec(data.email)) === null) return "Email musi być z domeny sggw.edu.pl"
    return undefined
}

export function LoginCard(): React.JSX.Element {
    const [loading, setLoading] = useState(true)
    const { trigger, isMutating } = useLogin();

    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: ""
    })
    const [error, setError] = useState<string | undefined>(undefined)

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (userId) {
            window.location.href = "/account"
        }
        setLoading(false)
    }, [])


    const handleLogin = async (): Promise<void> => {
        setError(undefined)

        const validationError = validateData(formData)
        if (validationError) { setError(validationError); return; }
        try {
            const response = await trigger({ body: formData, method: HttpMethods.POST, credentials: true })
            const userId = response.userId.split("\"")[1]
            localStorage.setItem("userId", userId)
            window.location.href = `/account`;
        } catch (e: unknown) {
            if (e instanceof CustomError) {
                setError(e.getMessage()); return;
            } else if (e instanceof Error) {
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
            <Input type="text" placeholder="Login" autoComplete="email" value={formData.email} onChange={(e) => { setFormData((prev: LoginForm) => ({ ...prev, email: e.target.value })); }} className="mb-2" />
            <Input type="password" placeholder="Hasło" autoComplete="current-password" value={formData.password} onChange={(e) => { setFormData((prev: LoginForm) => ({ ...prev, password: e.target.value })); }} />
            {/* <Link className="text-white text-sm" href="/password/reset">
                Nie pamiętam hasła
            </Link> */}

            {error ? <p className="text-red-500 text-sm">{error}</p> : null}

            <Button onClick={() => { void handleLogin() }} disabled={isMutating} className="mt-4">{isMutating ? "..." : "Zaloguj się"}</Button>

            <Link href="/register" className="text-white text-sm">
                Nie masz konta? <span className="underline">Zarejestruj się</span>
            </Link>
        </div>
    )
}