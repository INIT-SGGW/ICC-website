"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
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
        <div className="bg-black p-4 flex flex-col items-start justify-start gap-4">
            <Input type="text" placeholder="Login" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleLogin}>Zaloguj</Button>

            <button className="text-white text-sm">
                Nie pamiętam hasła
            </button>
        </div>
    )
}