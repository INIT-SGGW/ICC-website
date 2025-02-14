import { TasksListHeader } from "@/Views/TasksList/Header";
import { Tasks } from "@/Views/TasksList/Tasks";
import type { Metadata } from "next/types";
import { use } from "react";

type Props = {
    params: Promise<{ year: string }>
}

export const metadata: Metadata = {
    title: "Init Coding Challenge",
    description: "Init Coding Challenge to wyjątkowa okazja do rozwoju umiejętności programistycznych poprzez rozwiązywanie zadań, które będą regularnie udostępniane w trakcie trwania semestru. Dodatkowo, ranking oparty na czasie rozwiązania zadań pozwoli na śledzenie postępów i rywalizację z innymi uczestnikami."
};

export default function Page({ params }: Props) {
    const year = use(params).year;

    return (
        <div className="flex flex-col items-center justify-center text-white mt-10">
            <TasksListHeader year={+year} />
            <Tasks year={+year} />
        </div>
    )
}