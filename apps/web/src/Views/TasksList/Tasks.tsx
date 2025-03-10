"use client";

import type { Semester } from "@repo/types";
import { TaskSquare } from "./TaskSquare";
import { useGetAllTasks } from "@/services/api";

type Props = {
    year: number
    semester: Semester
}

export function Tasks({ year, semester }: Props): React.JSX.Element {
    const { data, error, isLoading } = useGetAllTasks(`/tasks?year=${year}&semester=${semester}`);

    if (isLoading) {
        return <div className="col-span-4 text-center" >Ładowanie ...</div>
    }

    if (error) {
        return <div className="col-span-4 text-center">Wystąpił błąd: {error.message}</div>
    }

    return (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
            {
                data ? <>
                    {data.tasks.sort((a, b) => a.taskNumber - b.taskNumber).map((task) => (
                        <TaskSquare key={task.taskId} semester={semester} index={task.taskNumber - 1} unlocked={task.isOpen} />
                    ))}
                </> : null
            }
        </div>
    )
}