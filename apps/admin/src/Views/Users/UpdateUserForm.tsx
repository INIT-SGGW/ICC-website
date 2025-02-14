"use client";

import { Button, Input } from "@repo/ui";
import { useState } from "react";

const fakeData = {
    id: 1,
    email: "asd@sggw.edu.pl",
    firstName: "Jan",
    lastName: "Kowalski",
}

type Props = {
    id: number;
}

export function UpdateUserForm({ id }: Props) {
    const [email, setEmail] = useState<string>(fakeData.email);
    const [firstName, setFirstName] = useState<string>(fakeData.firstName);
    const [lastName, setLastName] = useState<string>(fakeData.lastName);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset error message and input borders
        setError(undefined);
        const form = e.currentTarget as HTMLFormElement;
        form.querySelectorAll("input").forEach((input) => {
            input.classList.remove("border-red-500");
            input.classList.add("border-gray-500");
        });

        // Check if form is valid
        if (form.checkValidity() === false) {
            const firstInvalidElement = form.querySelector(":invalid") as HTMLInputElement;
            firstInvalidElement.classList.remove("border-gray-500");
            firstInvalidElement.classList.add("border-red-500");

            if (firstInvalidElement.type === "email" && firstInvalidElement.validity.patternMismatch) {
                setError("Email musi być z domeny sggw.edu.pl");
                return;
            }

            setError(firstInvalidElement?.validationMessage || "Invalid input.");
            return;
        }

        console.log(email, firstName, lastName);
    }

    return (
        <form className="w-full max-w-[600px] flex flex-col gap-2" noValidate onSubmit={(e) => { handleSubmit(e) }}>
            <Input required type="email" placeholder="Email*" pattern=".+@sggw\.edu\.pl$" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="flex gap-2 flex-wrap">
                <Input required type="text" placeholder="Imię" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input required type="text" placeholder="Nazwisko" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <Button type="submit">Modyfikuj dane</Button>
            <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
    )
}