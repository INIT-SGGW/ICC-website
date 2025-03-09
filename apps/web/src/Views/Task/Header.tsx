"use client"

import { Semester } from "@repo/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    year: number
    task: number
    semester: Semester
}

const ROMAN_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export function Header({ year, semester, task }: Props): React.JSX.Element {
    const path = usePathname();
    const lastPart = path.split("/").pop();
    const isPartA = lastPart === "A";
    const isPartB = lastPart === "B";

    return (
        <div className="self-start flex flex-row items-center justify-center gap-4">
            <p className="text-white text-4xl bg-[#FF0000] px-4">Zadanie {ROMAN_NUMBERS[Number(task) - 1]}</p>

            <Link
                href={`/task/${year}/${semester}/${task}/A`}
                className={`block text-[#FF0000] text-4xl px-3 border-2 border-[#FF0000] 
                    ${isPartA ? "bg-[#FF0000] text-white" : "bg-black"}`}
            >
                A
            </Link>

            <Link
                href={`/task/${year}/${semester}/${task}/B`}
                className={`block text-[#FF0000] text-4xl px-3 border-2 border-[#FF0000] 
                    ${isPartB ? "bg-[#FF0000] text-white" : "bg-black"}`}
            >
                B
            </Link>
        </div>
    )
}