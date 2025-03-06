import { TasksListHeader } from "@/Views/TasksList/Header";
import { Tasks } from "@/Views/TasksList/Tasks";
import type { Metadata } from "next/types";
import { use } from "react"; // eslint-disable-line import/named -- use is a named export

type Props = {
    params: Promise<{ year: string }>
}

export const metadata: Metadata = {
    title: "Zadania | ICC",
    description: "Rozwiązuj zadania, zdobywaj punkty i pnij się w rankingu! Nowe zadania co tydzień w poniedziałek o 18:00.",
};

export default function Page({ params }: Props): React.JSX.Element {
    const year = use(params).year;

    return (
        <div className="flex flex-col items-center justify-center text-white">
            <TasksListHeader year={Number(year)} />
            <Tasks year={Number(year)} />
        </div>
    )
}