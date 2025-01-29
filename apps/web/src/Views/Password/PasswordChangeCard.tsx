"use client"

import { Input, Button } from "@repo/ui"
import { useState } from "react"

export const PasswordChangeCard = () => {
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState<string | undefined>(undefined)

    const handlePasswordChange = () => {
        console.log(password, repeatPassword)
        setError("Zmiana hasła nie powiodła się")
    }

    return (
        <div className="bg-black p-4 flex flex-col items-start justify-start gap-2 w-full">
            <Input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2" />
            <Input type="password" placeholder="Powtórz hasło" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handlePasswordChange} className="mt-4">Zmień hasło</Button>
        </div>
    )
}