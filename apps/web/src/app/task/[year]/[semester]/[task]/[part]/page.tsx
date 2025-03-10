import { AnswerSection } from "@/Views/Task/AnswerSection";
import { Content } from "@/Views/Task/Content";
import { Header } from "@/Views/Task/Header";
import type { Semester } from "@repo/types";
import type { Metadata } from "next/types";
import { use } from "react"; // eslint-disable-line import/named -- use is a named export

type Props = {
    params: Promise<{ year: string, semester: Semester, task: string, part: string }>
}

export const metadata: Metadata = {
    title: `Zadanie | ICC`,
    description: ""
};

export default function Page({ params }: Props): React.JSX.Element {
    const { year, semester, task, part } = use(params);

    return (
        <div className="w-full m-auto max-w-[800px] flex flex-col md:flex-row items-center md:items-start justify-center md:py-8 text-white gap-8 ">
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Header year={Number(year)} semester={semester} task={Number(task)} />

                <Content year={Number(year)} semester={semester} task={Number(task)} part={part} />
            </div>

            <AnswerSection year={Number(year)} semester={semester} task={Number(task)} part={part} />
        </div>
    )
}
