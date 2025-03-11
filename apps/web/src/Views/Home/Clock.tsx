"use client";

import { jerseyFont } from "@/assets/fonts";
import { CustomLink } from "@repo/ui";
import { useEffect, useMemo, useState } from "react";

export function Clock(): React.JSX.Element {
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

    const challengeStartTime = new Date("2025-03-11T18:00:00");
    const timeUntilNextTaskRelease = useMemo(() => {

        if (!now) return "";

        const twoDigitFormat = (value: number): string => value.toString().padStart(2, "0");

        const diffTime = challengeStartTime.getTime() - now.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = twoDigitFormat(Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const diffMinutes = twoDigitFormat(Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60)));
        const diffSeconds = twoDigitFormat(Math.floor((diffTime % (1000 * 60)) / 1000));

        const result = `${diffDays}:${diffHours}:${diffMinutes}:${diffSeconds}`;

        return result;
    }, [now, challengeStartTime]);

    //eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
    if (now && challengeStartTime.getTime() < now?.getTime()) {
        return <></>;
    }

    return (
        <>
            <div className="flex flex-col items-center gap-4 w-full" title="Jak to się mówi, do dwóch razy sztuka 👀">
                <h2 className={`text-white text-center text-5xl ${jerseyFont.className} relative -bottom-[10px]`}>Początek wyzwania za</h2>
                <p className={`text-cred text-7xl ${jerseyFont.className}`}>{timeUntilNextTaskRelease}</p>
            </div>
            <CustomLink href="/register" className={`${jerseyFont.className} text-white text-2xl`} >Zarejestruj się</CustomLink>
        </>
    )
}