"use client";

import { Button, CustomLink } from "@repo/ui"
import { redirect } from "next/navigation"

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
            <div className="flex w-full justify-between">
                <p className="text-red-500 font-bold">Login:</p>
                <p className="text-white">s220200@sggw.edu.pl</p>
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