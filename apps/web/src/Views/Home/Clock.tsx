"use client";

import { jerseyFont } from "@/assets/fonts";
import { useEffect, useMemo, useState } from "react";

export const Clock = () => {
    const challengeStartTime = new Date("2025-03-10T18:00:00");
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

        const twoDigitFormat = (value: number) => value.toString().padStart(2, "0");

        const diffTime = challengeStartTime.getTime() - now.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = twoDigitFormat(Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const diffMinutes = twoDigitFormat(Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60)));
        const diffSeconds = twoDigitFormat(Math.floor((diffTime % (1000 * 60)) / 1000));

        let result = `${diffDays}:${diffHours}:${diffMinutes}:${diffSeconds}`;

        return result;
    }, [challengeStartTime]);

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <h2 className={`text-white text-5xl ${jerseyFont.className} relative -bottom-[10px]`}>Początek wyzwania za</h2>
            <p className={`text-cred text-7xl ${jerseyFont.className}`}>{timeUntilNextTaskRelease}</p>
        </div>
    )
}