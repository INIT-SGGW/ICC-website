import { TasksListHeader } from "@/Views/TasksList/Header";
import { Tasks } from "@/Views/TasksList/Tasks";
import { Semester } from "@repo/types";
import type { Metadata } from "next/types";
import { use } from "react"; // eslint-disable-line import/named -- use is a named export

type Props = {
    params: Promise<{ year: string, semester: Semester }>
}

export const metadata: Metadata = {
    title: "Zadania | ICC",
    description: "Rozwiązuj zadania, zdobywaj punkty i pnij się w rankingu! Nowe zadania co tydzień w poniedziałek o 18:00.",
};

export default function Page({ params }: Props): React.JSX.Element {
    const year = use(params).year;
    const semester = use(params).semester;

    return (
        <div className="flex flex-col items-center justify-center text-white">
            <TasksListHeader semester={semester} year={Number(year)} />
            <Tasks semester={semester} year={Number(year)} />
        </div>
    )
}