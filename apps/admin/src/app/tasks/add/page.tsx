import { AddTaskForm } from "../../../Views/Tasks/AddTaskForm";

export default function Page() {
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center gap-8 px-8`}>
            <h1 className="text-cred text-6xl">Dodaj zadanie</h1>
            <AddTaskForm />
        </div>
    )
}