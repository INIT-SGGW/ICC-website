"use client";

import { Button, Input } from "@repo/ui";
import React, { useState } from "react";

const fakeData = {
    id: 1,
    email: "asd@sggw.edu.pl",
    firstName: "Jan",
    lastName: "Kowalski",
}

type Props = {
    id: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Temporary
export function UpdateUserForm({ id }: Props): React.JSX.Element {
    const [email, setEmail] = useState<string>(fakeData.email);
    const [firstName, setFirstName] = useState<string>(fakeData.firstName);
    const [lastName, setLastName] = useState<string>(fakeData.lastName);
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
            <Button type="submit">Modyfikuj dane</Button>
            <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
    )
}