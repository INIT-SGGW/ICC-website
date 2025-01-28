"use client"

import { useState } from "react"
import { Input } from "@repo/ui"
import Image from "next/image"
import Link from "next/link"

type Props = {
    year: number
    task: number
    part: string
}

const usePreviousAnswers = (year: number, task: number, part: string): {
    date: Date,
    answer: string,
    correct: boolean
}[] => {
    return [
        {
            date: new Date("2024-03-10T19:32:54Z"),
            answer: "42",
            correct: true
        },
        {
            date: new Date("2024-03-10T19:32:54Z"),
            answer: "17",
            correct: false
        },
        {
            date: new Date("2024-03-10T19:32:58Z"),
            answer: "18",
            correct: false
        }
    ]
}

const formatUTCDate = (date: Date) => {
    return date.toLocaleString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })
}

export const AnswerSection = ({ year, task, part }: Props) => {
    const previousAnswers = usePreviousAnswers(year, task, part);
    const guessedAnswer = previousAnswers.find(answer => answer.correct);
    const loggedIn = true;
    const [answer, setAnswer] = useState<string>("");

    const handleSubmit = () => {
        console.log(answer);
        alert("Odpowiedź została wysłana");
    }

    if (!loggedIn) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 mt-16">
                <Image src="/lock.svg" alt="lock" width={75} height={75} />
                <p className="text-[#FF0000] text-lg text-center">
                    Aby móc odpowiadać, najpierw{" "}
                    <Link href="/login" className="text-[#FF0000] underline">zaloguj się</Link>
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <h1 className="text-[#FF0000] text-3xl">Odpowiedź</h1>

            {guessedAnswer ?
                <div className="flex flex-col items-center justify-center gap-4">
                    <Image src="/trophy_transparent.svg" alt="trophy" width={75} height={75} />
                    <p className="text-white text-2xl">Gratulacje!</p>
                    <p className="text-white text-2xl text-center">Rozwiązałeś zagadkę! Twój wynik to:</p>
                    <p className="text-white text-4xl">{guessedAnswer.answer}</p>
                </div>

                : <Input placeholder="Odpowiedź" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />}

            <div className="flex flex-col items-center justify-center gap-4 bg-black p-4 w-full">
                <p className="text-white text-2xl">Poprzednie odpowiedzi</p>
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                    {previousAnswers.map((answer) => (
                        <div key={`${answer.date.toISOString()}-${answer.answer}`} className="flex flex-row items-center justify-start gap-4 w-full">
                            {/* Use consistent date formatting */}
                            <p className="text-gray-500 text-sm">
                                {formatUTCDate(answer.date)}
                            </p>
                            <p className={`text-sm ${answer.correct ? "text-white" : "text-[#FF0000]"}`}>
                                {answer.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}