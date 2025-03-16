import { UsersTable } from "../../Views/Users/UsersTable";
import Link from "next/link";

export default function Page(): JSX.Element {
    return (
        <div className="w-full h-full flex flex-col gap-8 items-center justify-center px-8">
            <h1 className="text-cred text-6xl">Użytkownicy</h1>
            <div className="w-full max-w-[800px] flex flex-col align-center gap-4">
                {/* <div className="flex justify-end">
                    <Link href="/users/add" className="w-full text-center text-xl bg-cred hover:bg-red-500 transition-colors text-white px-5 py-1">Dodaj użytkownika</Link>
                </div> */}
                <UsersTable />
            </div>
        </div>
    );
}