"use client"

import { useGetTask } from "@/services/api"
import { Semester } from "@repo/types"
import { MarkdownRenderer } from "@repo/ui"

type Props = {
    year: number
    semester: Semester
    task: number
    part: string
}

export function Content({ year, semester, task, part }: Props): React.JSX.Element {
    const { data, error, isLoading } = useGetTask(`/tasks/${year}/${semester}/${task}`);

    return (
        <div className="bg-black p-4 w-full">
            {
                isLoading ? (
                    <div>Ładowanie...</div>
                ) :
                    error ? (
                        <div>Wystąpił błąd: {error.message}</div>
                    ) :
                        !data ? (
                            <div>Brak danych</div>
                        ) : (
                            <>
                                <p className="text-[#FF0000] text-lg">{new Date(data.releaseDate).toLocaleDateString("pl-PL")}</p>
                                <div className="prose prose-invert max-w-none">
                                    <MarkdownRenderer markdown={part === "B" ? data.partB : data.partA} />
                                </div>
                            </>
                        )
            }
        </div>
    )
}
