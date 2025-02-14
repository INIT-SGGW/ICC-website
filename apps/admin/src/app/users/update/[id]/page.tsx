import { use } from "react";
import { UpdateUserForm } from "../../../../Views/Users/UpdateUserForm";

type Props = {
    params: Promise<{ id: number }>
}

export default function Page({ params }: Props) {
    const id = use(params).id;

    return (
        <div className={`w-full h-full flex flex-col items-center justify-center gap-8 px-8`}>
            <h1 className="text-cred text-6xl">Dodaj użytkownika</h1>
            <UpdateUserForm id={id} />
        </div>
    )
}