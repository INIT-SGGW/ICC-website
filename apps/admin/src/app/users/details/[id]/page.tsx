import { use } from "react";
import { UserDetails } from "../../../../Views/Users/UsersDetails";

type Props = {
    params: Promise<{ id: number }>
}

export default function Page({ params }: Props) {
    const id = use(params).id;

    return (
        <div className={`w-full h-full flex flex-col items-center justify-center gap-4`}>
            <UserDetails id={id} />
        </div>
    )
}