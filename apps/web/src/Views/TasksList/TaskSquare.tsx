"use client"

import Link from "next/link"
import Image from "next/image"


const lock = "/lock.svg"

const ROMAN_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export type TaskSquareProps = {
    index: number // range [1;12]
    unlocked: boolean
}

export const TaskSquare = ({ index, unlocked }: TaskSquareProps) => {


    return (
        <Link key={index} href={`/2025/zadania/${index + 1}`} className="flex flex-col items-center justify-center gap-4 bg-black px-2 py-2 cursor-pointer">
            <p className={`text-[#FF0000] text-6xl ${!unlocked ? "p-4" : ""}`}>
                {unlocked ? ROMAN_NUMBERS[index] : <Image src={lock} alt="lock" width={40} height={50} />}
            </p>
        </Link>
    )
}
