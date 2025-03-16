"use client"

import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react"
import { Input } from "@repo/ui"
import Image from "next/image"
import Link from "next/link"
import { useGetTaskAnswers, useSendAnswerTask } from "@/services/api"
import type { GetTaskAnswersResponse, Semester } from "@repo/types"
import { HttpMethods } from "@/types/enums"
import { jerseyFont } from "@/assets/fonts"

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

function Timer({ cooldown, setCooldown }: { cooldown: Date, setCooldown: Dispatch<SetStateAction<Date | null>> }): React.JSX.Element {
    const [time, setTime] = useState<number>(cooldown.getTime() - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(cooldown.getTime() - Date.now());
            if (cooldown.getTime() < Date.now() + 1000) {
                setCooldown(null);
                clearInterval(interval);
            }
        }, 1000);

        return () => { clearInterval(interval) };
    }, [cooldown, setCooldown]);

    return (
        <p className={`text-cred text-4xl ${jerseyFont.className} border-2 border-cred w-full text-center`}>{new Date(time).toISOString().match(/\d{2}:\d{2}:\d{2}/g)?.[0]}</p>
    )
}

function AnswerItem({ data, prev }: { data: GetTaskAnswersResponse, prev: { date: Date, answer: string } }) {
    // Item created so that it can dinamically check if the text is overflowing
    const pRef = useRef<HTMLParagraphElement | null>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        if (pRef.current) {
            setIsOverflowing(pRef.current.scrollWidth > pRef.current.clientWidth);
        }
    }, [prev.answer, pRef.current]); // Run effect when answer changes

    return (
        <div key={`${new Date(prev.date).getTime()}-${prev.answer}`} className="flex flex-row items-center justify-start gap-4 w-full pr-3">
            <p className="text-gray-500 text-sm text-nowrap">
                {formatUTCDate(new Date(prev.date))}
            </p>
            <p
                ref={pRef} // Attach the ref
                title={prev.answer}
                className={`text-sm ${data.isCorrect && data.correctAnswer === prev.answer ? "text-cred" : "text-white"} text-ellipsis overflow-hidden`}
            >
                {prev.answer}
            </p>
            {isOverflowing ? <button
                className="w-min self-end"
                type="button"
                title="Skopiuj input"
                onClick={() => {
                    void navigator.clipboard.writeText(prev.answer);
                }}
            >
                <img src="/copy.svg" alt="copy" height="10px" width="10px" className="min-w-[20px] h-[20px]" />
            </button> : null}
        </div>
    );
}

export function AnswerSection({ year, semester, task, part }: Props): React.JSX.Element {
    const { data, error, isLoading, mutate } = useGetTaskAnswers(`/tasks/${year}/${semester}/${task}/${part}/answer`);
    const { trigger, error: answerError } = useSendAnswerTask(`/tasks/${year}/${semester}/${task}/${part}/answer`);
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [answer, setAnswer] = useState<string>("");
    const [cooldown, setCooldown] = useState<Date | null>(null);

    useEffect(() => {
        if (data?.cooldown) {
            setCooldown(new Date(data.cooldown));
        }
    }, [data?.cooldown])

    useEffect(() => {
        setLoggedIn(localStorage.getItem("userId") !== null);
    }, [])

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
        try {
            await trigger({ body: { answer }, method: HttpMethods.POST, credentials: true });
            await mutate();
        } catch (e) { } //eslint-disable-line no-empty -- errors are handled by SWR
    }

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
            {
                !data || error ? (
                    <>
                        <h1 className="text-[#FF0000] text-3xl">Ups...</h1>
                        <p className="text-center">{error ? error.message : "Wystąpił błąd podczas pobierania danych"}</p>
                    </>
                ) : (
                    <>
                        {data.isCorrect ? (
                            <>
                                <h1 className="text-[#FF0000] text-3xl">Gratulacje!</h1>
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <Image src="/trophy_transparent.svg" alt="trophy" width={75} height={75} />
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-white text-2xl text-center">Otrzymałeś/aś</p>
                                        <p className="text-cred text-4xl">{data.points}</p>
                                        <p className="text-white text-2xl">punktów</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className="text-[#FF0000] text-3xl">Odpowiedź!</h1>
                                <p className="text-white text-md text-center">{cooldown ? "Otrzymałeś cooldown za zbyt częste wysyłanie odpowiedzi" : "Prześlij swoją odpowiedź poniżej"}</p>
                                <p className="text-cred text-sm text-center">{answerError?.message}</p>
                                {
                                    cooldown ? (
                                        <Timer cooldown={cooldown} setCooldown={setCooldown} />
                                    ) :
                                        <form className="w-full flex" noValidate onSubmit={(e) => { e.preventDefault(); void handleSubmit(); }}>
                                            <Input placeholder="Odpowiedź" className="!border-r-0" value={answer} onChange={(e) => { setAnswer(e.target.value); }} />
                                            <button type="submit" className="bg-[#FF0000] m-0">
                                                <Image width={48} height={48} src="/full-arrow.svg" alt="send" className="px-1" />
                                            </button>
                                        </form>
                                }
                                <button type="button" className="bg-[#FF0000] text-white p-2 w-full" onClick={() => { handleDownloadInput() }}>Pobierz input</button>
                            </>
                        )}

                        <div className="flex flex-col items-center justify-center gap-4 bg-black p-4 w-full ">
                            <p className="text-white text-2xl">Poprzednie odpowiedzi</p>
                            <div data-virtual-scroller className="max-h-[300px] w-full">
                                <div className="flex flex-col items-center justify-center gap-4 w-full">
                                    {
                                        data.previousAnswers.length === 0 ? (
                                            <p className="text-cred text-sm">Brak poprzednich odpowiedzi</p>
                                        ) : (
                                            <>
                                                {data.previousAnswers.map((prev) => {
                                                    return (
                                                        <AnswerItem key={`${new Date(prev.date).getTime()}-${prev.answer}`} data={data} prev={prev} />
                                                    )
                                                })}
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </>

                )
            }
        </div>
    )
}