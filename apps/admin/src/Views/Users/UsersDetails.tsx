"use client";

import { Button, CustomLink } from "@repo/ui";

const fakeData = {
    id: 1,
    email: "asf@sggw.edu.pl",
    firstName: "",
    lastName: "",
}

type Props = {
    id: number
}

export function UserDetails({ id }: Props) {
    const fullName = fakeData?.firstName + " " + fakeData?.lastName;

    const handleDelete = () => {
        console.log("Deleting user with id: ", id);
    }

    return (
        <>
            <div >
                <h1 className="text-cred text-4xl text-center">{fullName !== " " ? fullName : fakeData.email.split("@")[0]}</h1>
                <p className="text-white text-2xl text-center">{fakeData.email}</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-4">
                <CustomLink type="button" className="text-nowrap px-6" href={`/users/update/${id}`}>Modyfikuj dane</CustomLink>
                <Button type="button" className="text-nowrap px-6" onClick={handleDelete}>Usuń zadanie</Button>
            </div>
        </>
    )
}