"use client";

import { useState } from "react";

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

const fakeData: User[] = [
    {
        id: "1",
        firstName: "Jan",
        lastName: "Kowalski",
        email: "jan@cp.cod"
    },
    {
        id: "2",
        firstName: "Adam",
        lastName: "Nowak",
        email: "adam@asdf.coads"
    },
    {
        id: "3",
        firstName: "Jan",
        lastName: "Kowalski",
        email: "jan@cp.cod"
    },
    {
        id: "4",
        firstName: "Adam",
        lastName: "Nowak",
        email: "adam@asdf.coads"
    },
]

type Props = {
    data: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    }[];
}

function Table({ data }: Props): JSX.Element {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-cred text-white text-nowrap">
                        <th className="w-[0%]">Nr.</th>
                        <th className="text-left">Imię</th>
                        <th className="text-left">Nazwisko</th>
                        <th className="text-left">Email</th>
                        <th className="w-[0%] hidden md:table-cell">Opcje</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((task, index) => (
                            <tr onClick={() => { window.location.href = `/users/details/${task.id}` }} className="border-b-2 border-gray-700 bg-black text-white sm:hover:bg-gray-800 transition-colors cursor-pointer" key={task.id}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-left">{task.firstName || "-"}</td>
                                <td className="text-left">{task.lastName || "-"}</td>
                                <td className="text-left">{task.email}</td>
                                <td className="hidden md:table-cell">
                                    <button className="">Edytuj</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export function UsersTable(): JSX.Element {
    const [search, setSearch] = useState<string>("");

    return (
        <div>
            <input
                type="text"
                placeholder="Szukaj..."
                onChange={(e) => setSearch(e.currentTarget.value)}
                value={search}
                className="w-full p-2 mb-4"
            />
            <Table data={fakeData.filter((user) => user.firstName.includes(search) || user.lastName.includes(search) || user.email.includes(search))} />
        </div>
    )
}