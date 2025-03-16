"use client";

import { useState } from "react";
import { useGetAllAdmins, useGetAllUsers } from "../../services/api";
import type { GetAllUsersResponse } from "@repo/types";
import type CustomError from "../../utils/CustomError";

type Props = {
    data: GetAllUsersResponse["users"] | undefined;
    error: CustomError | undefined;
    isLoading: boolean;
}

function Table({ data, isLoading, error }: Props): JSX.Element {
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
                {
                    (!data || data.length === 0) ? (
                        <tbody className="text-center text-white bg-black">
                            <tr>
                                <td colSpan={5}>
                                    {error ? `Error: ${error.message}` : null}
                                    {isLoading && !error && !data ? "Ładowanie..." : null}
                                    {!data && !error ? "Brak danych" : null}
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {
                                data.map((user, index) => (
                                    <tr onClick={() => { window.location.href = `admin/details/${user.userId}` }} className="border-b-2 border-gray-700 bg-black text-white sm:hover:bg-gray-800 transition-colors cursor-pointer" key={user.userId}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-left">{user.firstName || "-"}</td>
                                        <td className="text-left">{user.lastName || "-"}</td>
                                        <td className="text-left">{user.email}</td>
                                        <td className="hidden md:table-cell">
                                            <button type="button" className="">Edytuj</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </div>
    )
}

export function AdminsTable(): JSX.Element {
    const [search, setSearch] = useState<string>("");
    const { data, error, isLoading } = useGetAllAdmins();

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Szukaj..."
                onChange={(e) => { setSearch(e.currentTarget.value); }}
                value={search}
                className="w-full p-2 mb-4"
            />
            <Table error={error} isLoading={isLoading} data={data?.admins.filter((user) => user.firstName.includes(search) || user.lastName.includes(search) || user.email.includes(search))} />
        </div>
    )
}