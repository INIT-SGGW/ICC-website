"use client"

import { useGetTask } from "@/services/api"
import type { Semester } from "@repo/types"
import { MarkdownRenderer } from "@repo/ui"

type Props = {
    year: number
    semester: Semester
    task: number
    part: string
}

export function Content({ year, semester, task, part }: Props): React.JSX.Element {
    const { data, error, isLoading } = useGetTask(`/tasks/${year}/${semester}/${task}/${part}`);

    return (
        <div className="bg-black p-4 w-full h-min">
            {
                isLoading && !error ? <div>Ładowanie...</div> : null
            }
            {
                error ? <div className="text-center text-xl">Nie masz dostępu do tej części zadania</div> : null
            }
            {
                data ? <>
                        <p className="text-[#FF0000] text-lg">{new Date(data.releaseDate).toLocaleDateString("pl-PL")}</p>
                        <div className="prose prose-invert max-w-none">
                            <MarkdownRenderer markdown={data.content} />
                        </div>
                    </> : null
            }
        </div>
    )
}
