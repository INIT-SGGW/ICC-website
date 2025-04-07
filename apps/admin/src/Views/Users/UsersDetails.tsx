"use client";

import { Button, CustomLink } from "@repo/ui";
import { useDeleteUser, useGetSingleUser } from "../../services/api";
import { useRouter } from "next/navigation";

type Props = {
    id: string
}

export function UserDetails({ id }: Props): React.JSX.Element {
    const router = useRouter();
    const { data, error } = useGetSingleUser(id);
    const { trigger, error: deleteError, isMutating } = useDeleteUser(id);

    const handleDelete = async (): Promise<void> => {
        try {
            await trigger();
            router.push("/users");
        } catch (e) { } // eslint-disable-line no-empty -- errors are handled by SWR
    }

    if (error) {
        return <div className="text-center">
            <h1 className="text-cred text-4xl">Ups...</h1>
            <p className="text-white text-lg">Wystąpił problem podczas pobierania danych</p>
        </div>
    }

    return (
        <>
            <div >
                <h1 className="text-cred text-4xl text-center">{data ? `${data.firstName} ${data.lastName ? data.lastName : ""}` : "-"}</h1>
                <p className="text-white text-2xl text-center">{data ? data.emails[0] : "-"}</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-4">
                <CustomLink type="button" className="text-nowrap px-6" href={`/admin/users/update/${id}`}>Modyfikuj dane</CustomLink>
                <Button type="button" className="text-nowrap px-6" disabled={isMutating} onClick={() => { void handleDelete() }}>{isMutating ? "..." : "Usuń uczestnika"}</Button>
            </div>
            <p className="text-cred text-md text-center">{deleteError ? `Error: ${deleteError.message}` : null}</p>
        </>
    )
}