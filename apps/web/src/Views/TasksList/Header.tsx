"use client"

import { useGetNextTask } from "@/services/api";
import type { Semester } from "@repo/types";
import { useEffect, useMemo, useState } from "react";

type Props = {
    year: number
    semester: Semester
}

export function TasksListHeader({ year, semester }: Props): React.JSX.Element {
    const { data, error, isLoading } = useGetNextTask(`/tasks/next?year=${year}&semester=${semester}`);

    const [now, setNow] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (now === undefined) {
            setNow(new Date());
        }

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => { clearInterval(interval); };
    }, [now]);

    const timeUntilNextTaskRelease = useMemo(() => {
        if (!now) return "";
        if (!data) return "";

        const diffTime = new Date(data.releaseDate).getTime() - now.getTime();
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
    }, [data, now]);

    if (isLoading) return <p className="text-xl">Zadania</p>;

    if (error) {
        return <p className="text-xl">Zadania</p>
    };

    return (
        <>
            {
                data ? <>
                    <p className="text-xl">Nowe zadanie odblokuje się {new Date(data.releaseDate).toLocaleString("pl-PL")}!</p>
                    <p className="text-lg text-gray-400">pozostało {timeUntilNextTaskRelease}</p>
                </> : null
            }
        </>
    )
}