"use client";

import { Button, Input } from "@repo/ui";
import { useState } from "react";

export function AddUserForm(): React.JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // Reset error message and input borders
        setError(undefined);
        const form = e.currentTarget as HTMLFormElement;
        form.querySelectorAll("input").forEach((input) => {
            input.classList.remove("border-red-500");
            input.classList.add("border-gray-500");
        });

        // eslint-disable-next-line no-console -- Temporary
        console.log(email, firstName, lastName);
    }

    return (
        <form className="w-full max-w-[600px] flex flex-col gap-2" noValidate onSubmit={(e) => { handleSubmit(e) }}>
            <Input required type="email" placeholder="Email*" pattern=".+@sggw\.edu\.pl$" value={email} onChange={(e) => { setEmail(e.target.value); }} />
            <div className="flex gap-2 flex-wrap">
                <Input required type="text" placeholder="Imię" value={firstName} onChange={(e) => { setFirstName(e.target.value); }} />
                <Input required type="text" placeholder="Nazwisko" value={lastName} onChange={(e) => { setLastName(e.target.value); }} />
            </div>
            <Button type="submit">Dodaj użytkownika</Button>
            <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
    )
}