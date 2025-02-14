"use client";

type Task = {
    title: string;
    releaseDate: Date;
    id: string;
}

const fakeData: Task[] = [
    {
        title: "Zadanie 1 asdf asdf asd fasd fa asdf dasf dsa fasf jkashd fkjadshf kjlsahf kjdsahf jklashf askljh",
        releaseDate: new Date("2022-10-10"),
        id: "1"
    },
    {
        title: "Zadanie 1",
        releaseDate: new Date("2022-10-10"),
        id: "2"
    },
    {
        title: "Zadanie 1",
        releaseDate: new Date("2022-10-10"),
        id: "4"
    },
    {
        title: "Zadanie 1",
        releaseDate: new Date("2022-10-10"),
        id: "3"
    }
]
export function TasksTable(): JSX.Element {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-cred text-white text-nowrap">
                        <th>Nr.</th>
                        <th className="text-left">Tytuł</th>
                        <th className="hidden md:table-cell">Data wydania</th>
                        <th className="hidden md:table-cell">Opcje</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fakeData.map((task, index) => (
                            <tr onClick={() => { window.location.href = `/tasks/details/${task.id}` }} className="border-b-2 border-gray-700 bg-black text-white sm:hover:bg-gray-800 transition-colors cursor-pointer" key={task.id}>
                                <td className="text-center">{index + 1}</td>
                                <td className="truncate w-full max-w-[400px]">{task.title}</td>
                                <td className="text-nowrap hidden md:table-cell">{task.releaseDate.toDateString()}</td>
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