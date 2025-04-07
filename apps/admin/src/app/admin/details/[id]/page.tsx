import { use } from "react"; //eslint-disable-line import/named -- Temporary
import { AdminDetails } from "../../../../Views/Admin/AdminsDetails";

type Props = {
    params: Promise<{ id: string }>
}

export default function Page({ params }: Props): React.JSX.Element {
    const id = use(params).id;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <AdminDetails id={id} />
        </div>
    )
}