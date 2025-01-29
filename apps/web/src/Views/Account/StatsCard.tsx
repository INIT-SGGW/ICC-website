"use client";

import { Button, CustomLink } from "@repo/ui"
import { redirect } from "next/navigation"

type StatProps = {
    title: string;
    value: number;
}

const Stat = ({ title, value }: StatProps) => {
    return (
        <div className="flex flex-col items-center w-full">
            <p className="text-white text-xl">{title}</p>
            <p className="text-red-500 font-bold text-4xl">{value}</p>
        </div>
    )
}

export const StatsCard = () => {
    const handleLogout = () => {
        console.log("Wylogowano")
        // redirect("/")
    }


    return (
        <div className="bg-black p-4 flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2 w-full">
                <Stat title="Miejsce w rankingu" value={21} />
                <Stat title="Wynik ogólny" value={1235} />
                <Stat title="Zadanie 1" value={432} />
            </div>
            <CustomLink href="/stats" className="mt-4">Statystyki</CustomLink>
        </div>
    )
}