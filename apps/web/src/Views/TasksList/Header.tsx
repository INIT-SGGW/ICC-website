"use client"

import { useEffect, useMemo, useState } from "react";

export const useNextTaskRelease = (year: number): Date => {
    return new Date(year, 2, 10, 18);
}

type Props = {
    year: number
}

export const TasksListHeader = ({ year }: Props) => {
    const nextTaskRelease = useNextTaskRelease(year);

    const [now, setNow] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (now === undefined) {
            setNow(new Date());
        }

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const timeUntilNextTaskRelease = useMemo(() => {
        if (!now) return "";

        const diffTime = nextTaskRelease.getTime() - now.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        let result = "";
        if (diffDays > 0) result += `${diffDays} dni, `;
        if (diffHours > 0) result += `${diffHours} godzin, `;
        if (diffMinutes > 0) result += `${diffMinutes} minut, `;
        if (diffSeconds >= 0) result += `${diffSeconds} sekund`;

        return result;
    }, [nextTaskRelease]);


    return (
        <>
            <p className="text-xl">Nowe zadanie odblokuje się {nextTaskRelease.toLocaleString("pl-PL")}!</p>
            <p className="text-lg text-gray-400">pozostało {timeUntilNextTaskRelease}</p>
        </>
    )
}