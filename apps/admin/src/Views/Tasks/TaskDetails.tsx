"use client";

import { Button, CustomLink } from "@repo/ui";
import { useDeleteTask, useGetTask } from "../../services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomError from "../../utils/CustomError";

const fakeData = {
    id: 1,
    title: "Zadania bardzo ważne tralrallalal",
    releaseDate: new Date(),
    partA: File,
    partB: File,
}

type Props = {
    id: number
}

export function TaskDetails({ id }: Props): React.JSX.Element {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { data, error } = useGetTask(`/admin/tasks/${id}`);
    const { trigger } = useDeleteTask(`/admin/tasks/${id}`);

    const handleDelete = async (): Promise<void> => {
        try {
            await trigger();
            router.push("/tasks");
        } catch (err: unknown) {
            if (err instanceof Error || err instanceof CustomError) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage("Wystąpił błąd podczas usuwania zadania");
            }
        }
    }

    return (
        <>
            {
                !data ? (
                    <p className="text-white text-center">{error ? `Error: ${error.message}` : "Loading..."}</p>
                ) : (
                    <>
                        <div >
                            <h1 className="text-cred text-4xl text-center">{data.title}</h1>
                            <p className="text-white text-2xl text-center">{fakeData.releaseDate.toDateString()}</p>
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap gap-4">
                            <CustomLink type="button" className="text-nowrap px-6" href={`/tasks/update/${id}`}>Modyfikuj zadanie</CustomLink>
                            <Button type="button" className="text-nowrap px-6" onClick={() => { void handleDelete() }}>Usuń zadanie</Button>
                        </div>
                        <p className="text-cred text-center">{errorMessage}</p>
                    </>
                )
            }
        </>
    )
}