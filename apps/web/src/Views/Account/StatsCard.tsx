"use client";

import { useGetUserStats } from "@/services/api";
import { CustomLink } from "@repo/ui"
import Image from "next/image"
import React, { useState } from "react";

type StatProps = {
    title: string;
    value: number | string;
    handleChange?: (increased: boolean) => void;
}

function Stat({ title, value, handleChange }: StatProps): React.JSX.Element {
    return (
        <div className="flex flex-col items-center w-full">
            <p className="text-white text-xl">{title}</p>
            {
                handleChange ? (
                    <div className="flex items-center gap-4">
                        <Image src="/arrow.svg" alt="arrow" className="cursor-pointer" width={12} height={12} onClick={() => { handleChange(false); }} />
                        <p className="text-red-500 font-bold text-4xl">{value}</p>
                        <Image src="/arrow.svg" alt="arrow" className="cursor-pointer rotate-180" width={12} height={12} onClick={() => { handleChange(true); }} />
                    </div>
                ) : (
                    <p className="text-red-500 font-bold text-4xl">{value}</p>
                )
            }
        </div>
    )
}


export function StatsCard(): React.JSX.Element {
    const { data, error, isLoading } = useGetUserStats();
    const [currentTask, setCurrentTask] = useState<number>(0);

    if (isLoading || error || !data) {
        return (
            <div className="bg-black p-4 flex flex-col gap-8">
                <div className="flex flex-col items-center gap-2 w-full">
                    <Stat title="Miejsce w rankingu" value="-" />
                    <Stat title="Wynik ogólny" value="-" />
                    <Stat title={`Zadanie ${currentTask + 1}`} value="-" />
                </div>
                <CustomLink href="/stats" className="mt-4">Statystyki</CustomLink>
                <p className="text-red-500 text-center text-sm">{error ? error.message : null}</p>
            </div>
        )
    }

    const handleChangeTask = (increased: boolean): void => {
        if (increased) {
            setCurrentTask((prev) => Math.min(prev + 1, data.pointsTask.length - 1));
        } else {
            setCurrentTask((prev) => Math.max(prev - 1, 0));
        }
    }

    return (
        <div className="bg-black p-4 flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2 w-full">
                <Stat title="Miejsce w rankingu" value={data.rankingPosition} />
                <Stat title="Wynik ogólny" value={data.pointsGeneral} />
                <Stat title={`Zadanie ${currentTask + 1}`} value={data.pointsTask[currentTask]} handleChange={handleChangeTask} />
            </div>
            <div className="flex flex-col w-full gap-2">
                <CustomLink href="/ranking" className="mt-4">Ranking</CustomLink>
                <p className="text-red-500 text-center text-sm" />
            </div>
        </div>
    )
}