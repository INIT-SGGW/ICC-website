"use client"

import { TaskParts, type Semester } from "@repo/types";
import Image from "next/image"
import Link from "next/link";
import React from "react";


const lock = "/lock.svg"

const ROMAN_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export type TaskSquareProps = {
    index: number // range [1;12]
    semester: Semester
    unlocked: boolean
}

export function TaskSquare({ index, semester, unlocked }: TaskSquareProps): React.JSX.Element {
    return (
        <Link
            key={index}
            href={unlocked ? `${semester}/${index + 1}/${TaskParts.A}` : ""}
            className={`flex flex-col items-center justify-center gap-4 bg-black px-2 py-2 ${!unlocked ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
            <p className={`text-[#FF0000] text-6xl ${!unlocked ? "p-4" : ""}`}>
                {unlocked ? ROMAN_NUMBERS[index] : <Image src={lock} alt="lock" width={40} height={50} />}
            </p>
        </Link>
    )
}
