import { AnswerSection } from "@/Views/Task/AnswerSection";
import { Content } from "@/Views/Task/Content";
import { Header } from "@/Views/Task/Header";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { use } from "react"; // eslint-disable-line import/named -- use is a named export

type Props = {
    params: Promise<{ year: string; task: string, part: string }>
}

export const metadata: Metadata = {
    title: `Zadanie | ICC`,
    description: ""
};

export default function Page({ params }: Props): React.JSX.Element {
    notFound();
    const { year, task, part } = use(params);

    return (
        <div className="w-full m-auto max-w-[800px] flex flex-col md:flex-row items-center md:items-start justify-center md:py-8 text-white gap-8 ">
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Header year={Number(year)} task={Number(task)} />

                <Content year={Number(year)} task={Number(task)} part={part} />
            </div>

            <AnswerSection year={Number(year)} task={Number(task)} part={part} />
        </div>
    )
}
