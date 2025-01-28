"use client"

import { Input, Button } from "@repo/ui"
import Link from "next/link"
import { useState } from "react"

export const LoginCard = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | undefined>(undefined)

    const handleLogin = () => {
        console.log(email, password)
        setError("Logowanie nie powiodło się")
    }

    return (
        <div className="bg-black p-4 flex flex-col items-start justify-start gap-2">
            <Input type="text" placeholder="Login" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />
            <Input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="text-white text-sm">
                Nie pamiętam hasła
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleLogin} className="mt-4">Zaloguj</Button>


            <Link href="/register" className="text-white text-sm">
                Nie masz konta? <span className="underline">Zarejestruj się</span>
            </Link>
        </div>
    )
}