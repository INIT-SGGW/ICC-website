import { AnswerSection } from "@/Views/Task/AnswerSection";
import { Content } from "@/Views/Task/Content";
import { Header } from "@/Views/Task/Header";
import { use } from "react";

type Props = {
    params: Promise<{ year: string; task: string, part: string }>
}



export default function Page({ params }: Props) {
    const { year, task, part } = use(params)


    return (
        <div className="w-full px-4 m-auto max-w-[800px] flex md:flex-row flex-col items-center md:items-start justify-center my-10 text-white gap-8 ">
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Header year={+year} task={+task} />

                <Content year={+year} task={+task} part={part} />
            </div>

            <AnswerSection year={+year} task={+task} part={part} />
        </div>
    )
}
