import { use } from "react"; //eslint-disable-line import/named -- Temporary
import { UpdateUserForm } from "../../../../Views/Users/UpdateUserForm";

type Props = {
    params: Promise<{ id: string }>
}

export default function Page({ params }: Props): React.JSX.Element {
    const id = use(params).id;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-8 px-8">
            <h1 className="text-cred text-6xl text-center">Modyfiku dane użytkownika</h1>
            <UpdateUserForm id={id} />
        </div>
    )
}