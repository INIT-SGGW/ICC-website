"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation";


const lock = "/lock.svg"

const ROMAN_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export type TaskSquareProps = {
    index: number // range [1;12]
    unlocked: boolean
}

export const TaskSquare = ({ index, unlocked }: TaskSquareProps) => {
    const router = useRouter()

    return (
        <button
            key={index}
            onClick={() => router.push(`/2025/${index + 1}/A`)}
            className={`flex flex-col items-center justify-center gap-4 bg-black px-2 py-2 ${!unlocked ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={!unlocked}
        >
            <p className={`text-[#FF0000] text-6xl ${!unlocked ? "p-4" : ""}`}>
                {unlocked ? ROMAN_NUMBERS[index] : <Image src={lock} alt="lock" width={40} height={50} />}
            </p>
        </button>
    )
}
