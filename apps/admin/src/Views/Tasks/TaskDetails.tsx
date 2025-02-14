"use client";

import { Button, CustomLink } from "@repo/ui";

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

export function TaskDetails({ id }: Props) {
    const handleDelete = () => {
        console.log("Deleting task with id: ", id);
    }

    return (
        <>
            <div >
                <h1 className="text-cred text-4xl text-center">{fakeData.title}</h1>
                <p className="text-white text-2xl text-center">{fakeData.releaseDate.toDateString()}</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-4">
                <CustomLink type="button" className="text-nowrap px-6" href={`/tasks/update/${id}`}>Modyfikuj zadanie</CustomLink>
                <Button type="button" className="text-nowrap px-6" onClick={handleDelete}>Usuń zadanie</Button>
            </div>
        </>
    )
}