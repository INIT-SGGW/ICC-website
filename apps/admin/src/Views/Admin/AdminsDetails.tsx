"use client";

import { Button, CustomLink } from "@repo/ui";
import { useDeleteAdmin, useGetSingleAdmin } from "../../services/api";
import { useRouter } from "next/navigation";

const fakeData = {
    id: 1,
    email: "asf@sggw.edu.pl",
    firstName: "",
    lastName: "",
}

type Props = {
    id: string
}

export function AdminDetails({ id }: Props): React.JSX.Element {
    const router = useRouter();
    const { trigger, isMutating, error } = useDeleteAdmin(id);
    const { data, error: getError } = useGetSingleAdmin(id);

    const handleDelete = async (): Promise<void> => {
        try {
            await trigger();
            router.push("/admin");
        } catch (error: unknown) { }
    }

    if (getError) {
        return <div className="text-center">
            <h1 className="text-cred text-4xl">Ups...</h1>
            <p className="text-white text-lg">Wystąpił problem podczas pobierania danych</p>
        </div>
    }

    return (
        <>
            <div>
                <h1 className="text-cred text-4xl text-center">{data ? `${data.firstName} ${data.lastName}` : '-'}</h1>
                <p className="text-white text-2xl text-center">{data ? data.email : "-"}</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-4">
                <CustomLink type="button" className="text-nowrap px-6" href={`/admin/admin/update/${id}`}>Modyfikuj dane</CustomLink>
                <Button type="button" className="text-nowrap px-6" disabled={isMutating} onClick={() => { void handleDelete() }}>{isMutating ? "..." : "Usuń admina"}</Button>
            </div>
            <p className="text-cred text-md text-center">{error ? `Error: ${error.message}` : null}</p>
        </>
    )
}