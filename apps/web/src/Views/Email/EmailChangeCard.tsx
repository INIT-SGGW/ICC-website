"use client"

import { Input, Button } from "@repo/ui"
import { useState } from "react"

export const EmailChangeCard = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState<string | undefined>(undefined)

    const handleEmailChange = () => {
        console.log(email)
        setError("Zmiana email nie powiodło się")
    }

    return (
        <div className="bg-black p-4 flex flex-col items-start justify-start gap-2 w-full">
            <p className="text-white text-sm mb-2">Podaj nowy adres email</p>
            <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleEmailChange} className="mt-4">Zmień email</Button>
        </div>
    )
}