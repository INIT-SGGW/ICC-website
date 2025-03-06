"use client";

import type { AccountStatsData } from "@repo/types";
import { CustomLink } from "@repo/ui"
import Image from "next/image"
import React, { useState } from "react";

type StatProps = {
    title: string;
    value: number;
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



const data: AccountStatsData = {
    ranking: 21,
    score: 1235,
    taskScores: [432, 123, 678, 0]
};

export function StatsCard(): React.JSX.Element {
    const statData: AccountStatsData = data;
    const [currentTask, setCurrentTask] = useState<number>(0);

    const handleChangeTask = (increased: boolean): void => {
        if (increased) {
            setCurrentTask((prev) => Math.min(prev + 1, statData.taskScores.length - 1));
        } else {
            setCurrentTask((prev) => Math.max(prev - 1, 0));
        }
    }

    return (
        <div className="bg-black p-4 flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2 w-full">
                <Stat title="Miejsce w rankingu" value={statData.ranking} />
                <Stat title="Wynik ogólny" value={statData.score} />
                <Stat title={`Zadanie ${currentTask + 1}`} value={statData.taskScores[currentTask]} handleChange={handleChangeTask} />
            </div>
            <CustomLink href="/stats" className="mt-4">Statystyki</CustomLink>
        </div>
    )
}