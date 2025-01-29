"use client"

import { Input, Button } from "@repo/ui"
import { useState } from "react"

export const PasswordResetCard = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState<string | undefined>(undefined)


    const handlePasswordReset = () => {
        console.log(email)
        setError("Resetowanie hasła nie powiodło się")
    }

    return (
        <div className="bg-black p-4 flex flex-col items-start justify-start gap-2 w-full">
            <p className="text-white text-sm mb-2">Podaj adres email, na który zostanie wysłany link do zresetowania hasła</p>
            <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handlePasswordReset} className="mt-4">Zresetuj hasło</Button>
        </div>
    )
}