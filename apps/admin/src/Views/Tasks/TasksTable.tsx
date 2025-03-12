"use client";

import { useState } from "react";
import { useGetAllTasks } from "../../services/api";
import { Semester } from "@repo/types";
import { Input, Select } from "@repo/ui";

export function TasksTable(): JSX.Element {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [semester, setSemester] = useState<Semester>(new Date().getMonth() < 6 ? Semester.LETNI : Semester.ZIMOWY);
    const { data, error } = useGetAllTasks(`/admin/tasks?year=${year}&semester=${semester}`);

    return (
        <div className="w-full overflow-x-auto">
            <div className="flex gap-4 mb-4 bg-cred p-2">
                <label htmlFor="year">Rok:</label>
                <Input type="number" id="year" value={year} onChange={(e) => { setYear(Number(e.target.value)); }} />
                <label htmlFor="semester">Semestr:</label>
                <Select id="semester" value={semester} onChange={(e) => { setSemester(e.target.value as Semester); }}>
                    <option value={Semester.LETNI}>Letni</option>
                    <option value={Semester.ZIMOWY}>Zimowy</option>
                </Select>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-cred text-white text-nowrap">
                        <th>Nr.</th>
                        <th className="text-left">Tytuł</th>
                        <th className="hidden md:table-cell">Data wydania</th>
                        <th className="hidden md:table-cell">Opcje</th>
                    </tr>
                </thead>
                {
                    (!data || data.tasks.length === 0) ? (
                        <tbody className="text-center text-white bg-black"><tr><td colSpan={4}>{error ? `Error: ${error.message}` : "Brak zadań"}</td></tr></tbody>
                    ) : (
                        <tbody>
                            {
                                data.tasks.sort((a, b) => a.taskNumber - b.taskNumber).map((task) => (
                                    <tr key={task.taskId} onClick={() => { window.location.href = `/admin/tasks/details/${task.taskId}` }} className="border-b-2 border-gray-700 bg-black text-white sm:hover:bg-gray-800 transition-colors cursor-pointer">
                                        <td className="text-center">{task.taskNumber}</td>
                                        <td className="truncate w-full max-w-[400px]">{task.title}</td>
                                        <td className="text-nowrap hidden md:table-cell">{new Date(task.releaseDate).toLocaleDateString()}</td>
                                        <td className="hidden md:table-cell">
                                            <button type="button" className="">Edytuj</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )}
            </table>
        </div>
    )
}