import { use } from "react"; //eslint-disable-line import/named -- Temporary
import { UpdateAdminForm } from "../../../../Views/Admin/UpdateAdminForm";

type Props = {
    params: Promise<{ id: string }>
}

export default function Page({ params }: Props): React.JSX.Element {
    const id = use(params).id;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-8 px-8">
            <h1 className="text-cred text-6xl text-center">Modyfiku dane admina</h1>
            <UpdateAdminForm id={id} />
        </div>
    )
}