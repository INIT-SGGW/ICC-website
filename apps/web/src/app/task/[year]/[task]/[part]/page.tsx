import { AnswerSection } from "@/Views/Task/AnswerSection";
import { Content } from "@/Views/Task/Content";
import { Header } from "@/Views/Task/Header";
import type { Metadata } from "next/types";
import { use } from "react";

type Props = {
    params: Promise<{ year: string; task: string, part: string }>
}

export const metadata: Metadata = {
    title: "Init Coding Challenge",
    description: "Init Coding Challenge to wyjątkowa okazja do rozwoju umiejętności programistycznych poprzez rozwiązywanie zadań, które będą regularnie udostępniane w trakcie trwania semestru. Dodatkowo, ranking oparty na czasie rozwiązania zadań pozwoli na śledzenie postępów i rywalizację z innymi uczestnikami."
};

export default function Page({ params }: Props) {
    const { year, task, part } = use(params)


    return (
        <div className="w-full px-4 m-auto max-w-[800px] flex flex-col md:flex-row items-center md:items-start justify-center my-10 text-white gap-8 ">
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Header year={+year} task={+task} />

                <Content year={+year} task={+task} part={part} />
            </div>

            <AnswerSection year={+year} task={+task} part={part} />
        </div>
    )
}
