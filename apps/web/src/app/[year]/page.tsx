import { TasksListHeader } from "@/Views/TasksList/Header";
import { Tasks } from "@/Views/TasksList/Tasks";
import { use } from "react";

type Props = {
    params: Promise<{ year: string }>
}

export default function Page({ params }: Props) {
    const year = use(params).year;

    return (
        <div className="flex flex-col items-center justify-center text-white mt-10">
            <TasksListHeader year={+year} />
            <Tasks year={+year} />
        </div>
    )
}