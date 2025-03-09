"use client";

import { Semester } from "@repo/types";
import { TaskSquare } from "./TaskSquare";
import { useGetAllTasks } from "@/services/api";

type Props = {
    year: number
    semester: Semester
}

export function Tasks({ year, semester }: Props): React.JSX.Element {
    const { data, error, isLoading } = useGetAllTasks(`/tasks?year=${year}&semester=${semester}`);
    console.log(data)
    return (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
            {
                isLoading && <div>Ładowanie...</div>
            }
            {
                error && <div>Wystąpił błąd: {error.message}</div>
            }
            {
                data && (
                    <>
                        {data.tasks.sort((a, b) => a.taskNumber - b.taskNumber).map((task) => (
                            <TaskSquare key={task.taskId} semester={semester} index={task.taskNumber - 1} unlocked={task.isOpen} />
                        ))}
                    </>
                )
            }
        </div>
    )
}