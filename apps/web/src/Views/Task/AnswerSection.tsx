"use client"

import { KeyboardEvent, useEffect, useState } from "react"
import { Input } from "@repo/ui"
import Image from "next/image"
import Link from "next/link"
import { useGetTaskAnswers, useSendAnswerTask } from "@/services/api"
import { Semester, SendAnswerTaskResponse } from "@repo/types"
import CustomError from "@/utils/CustomError"
import { HttpMethods } from "@/types/enums"

type Props = {
    year: number
    task: number
    semester: Semester
    part: string
}

const formatUTCDate = (date: Date): string => {
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

export function AnswerSection({ year, semester, task, part }: Props): React.JSX.Element {
    const { data, error, isLoading } = useGetTaskAnswers(`/tasks/${year}/${semester}/${task}/${part}`);
    const { trigger, error: answerError } = useSendAnswerTask(`/tasks/${year}/${semester}/${task}/${part}/answer`);
    const [answerData, setAnswerData] = useState<SendAnswerTaskResponse | undefined>(data);
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [answer, setAnswer] = useState<string>("");

    useEffect(() => {
        setLoggedIn(localStorage.getItem("userId") !== null);
    }, [])

    useEffect(() => {
        if (data) {
            const prevAns = data.previousAnswers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setAnswerData({ ...data, previousAnswers: prevAns });
        }
    }, [data])

    const handleDownloadInput = (): void => {
        if (data) {
            const blob = new Blob([data.input], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "input.txt";
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }

    const handleSubmit = async (): Promise<void> => {
        const response = await trigger({ body: { answer }, method: HttpMethods.POST, credentials: true });
        const prevAns = response.previousAnswers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setAnswerData((prev) => ({ ...prev, ...response, previousAnswers: prevAns }));
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- This is a temporary condition
    if (!loggedIn) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 mt-16">
                <Image src="/lock.svg" alt="lock" width={75} height={75} />
                <p className="text-[#FF0000] text-lg text-center">
                    Aby móc odpowiadać, musisz się{" "}
                    <Link href="/login" className="text-[#FF0000] underline">zalogować</Link>
                </p>
            </div>
        )
    }

    if (isLoading) (<div> </div>);

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-[#FF0000] text-3xl">Odpowiedź</h1>
            {
                !answerData || error ? (
                    <div><p>{error ? error.message : "Wystąpił błąd podczas pobierania danych"}</p></div>
                ) : (
                    <>
                        {answerData.isCorrect ? (
                            <div className="flex flex-col items-center justify-center gap-4">
                                <Image src="/trophy_transparent.svg" alt="trophy" width={75} height={75} />
                                <p className="text-white text-2xl">Gratulacje!</p>
                                <p className="text-white text-2xl text-center">Rozwiązałeś zagadkę! Zdobyłeś:</p>
                                <p className="text-white text-4xl">{answerData.points}</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-cred text-sm">{answerError?.message}</p>
                                <Input placeholder="Odpowiedź" value={answer} onChange={(e) => { setAnswer(e.target.value); }} onKeyDown={(e) => { e.key === "Enter" && handleSubmit() }} />
                                <button className="bg-[#FF0000] text-white p-2 w-full" onClick={handleDownloadInput}>Pobierz input</button>
                            </>
                        )}

                        <div className="flex flex-col items-center justify-center gap-4 bg-black p-4 w-full">
                            <p className="text-white text-2xl">Poprzednie odpowiedzi</p>
                            <div className="flex flex-col items-center justify-center gap-4 w-full">
                                {
                                    answerData.previousAnswers.length === 0 ? (
                                        <p className="text-cred text-sm">Brak poprzednich odpowiedzi</p>
                                    ) : (
                                        <>
                                            {answerData.previousAnswers.map((prev) => (
                                                <div key={`${new Date(prev.date).getTime()}-${prev.answer}`} className="flex flex-row items-center justify-start gap-4 w-full">
                                                    {/* Use consistent date formatting */}
                                                    <p className="text-gray-500 text-sm">
                                                        {formatUTCDate(new Date(prev.date))}
                                                    </p>
                                                    <p className={`text-sm ${(answerData.isCorrect && answerData.correctAnswer === prev.answer) ? "text-cred" : "text-white"}`}>
                                                        {prev.answer}
                                                    </p>
                                                </div>
                                            ))}
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </>

                )
            }
        </div>
    )
}