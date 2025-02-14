import { use } from "react";
import { UpdateTaskForm } from "../../../../Views/Tasks/UpdateTaskForm";

type Props = {
    params: Promise<{ id: number }>
}

export default function Page({ params }: Props) {
    const id = use(params).id;

    return (
        <div className={`w-full h-full flex flex-col items-center justify-center gap-8 px-8`}>
            <h1 className="text-cred text-6xl">Modyfikuj zadanie</h1>
            <UpdateTaskForm id={id} />
        </div>
    )
}