"use client"

import { Button, Input } from "@repo/ui"
import { useState } from "react"

export const RegisterCard = () => {
    const [email, setEmail] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState<string | undefined>(undefined)

    const handleRegister = () => {
        console.log(email, login, password, repeatPassword)
        setError("Rejestracja nie powiodła się")
    }

    return (
        <div className="bg-black p-4 flex flex-col items-start justify-start gap-4 w-full max-w-[350px]">
            <Input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="text" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
            <Input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input type="password" placeholder="Powtórz hasło" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleRegister}>Zarejestruj</Button>
        </div>
    )
}