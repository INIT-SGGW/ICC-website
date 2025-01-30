"use client";

import { Button, CustomLink } from "@repo/ui"
import { redirect } from "next/navigation"

const AccountDataDisplay = ({ title, text }: { title: string, text: string }) => {
    return (
        <div className="flex w-full justify-between">
            <p className="text-red-500 font-bold">{title}:</p>
            <p className="text-white">{text}</p>
        </div>
    )
}

export const AccountCard = () => {
    const handleLogout = () => {
        console.log("Wylogowano")
        // redirect("/")
    }

    const handleDeleteAccount = () => {
        console.log("Usunięto konto")
    }

    return (
        <div className="bg-black p-4 max-w-[350px] flex-grow flex flex-col justify-between gap-8">
            <div>
                <AccountDataDisplay title="Nick" text="s211210@sggw.edu.pl" />
                <AccountDataDisplay title="E-mail" text="Zbychu" />
            </div>
            <div className="flex flex-col w-full gap-2">
                <Button onClick={handleLogout} className="mt-4">Wyloguj</Button>
                <CustomLink href="/email/change" className="mt-4">Zmień e-mail</CustomLink>
                <CustomLink href="/password/change" className="mt-4">Zmień hasło</CustomLink>
                <Button onClick={handleDeleteAccount} className="mt-4">Usuń konto</Button>
            </div>
        </div>
    )
}
