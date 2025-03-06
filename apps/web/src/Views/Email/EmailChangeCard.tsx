"use client"

import { Input, Button } from "@repo/ui"
import { useState } from "react"

export function EmailChangeCard(): React.JSX.Element {
    const [email, setEmail] = useState("")
    const [error, setError] = useState<string | undefined>(undefined)

    const handleEmailChange = (): void => {
        // eslint-disable-next-line no-console -- temporary logging
        console.log(email)
        setError("Zmiana email nie powiodło się")
    }

    return (
        <div className="bg-black p-4 flex flex-col items-start justify-start gap-2 w-full">
            <p className="text-white text-sm mb-2">Podaj nowy adres email</p>
            <Input type="text" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); }} className="mb-2" />

            {error ? <p className="text-red-500 text-sm">{error}</p> : null}

            <Button onClick={handleEmailChange} className="mt-4">Zmień email</Button>
        </div>
    )
}