import { AddUserForm } from "../../../Views/Users/AddUserForm";

export default function Page(): React.JSX.Element {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-8 px-8">
            <h1 className="text-cred text-6xl">Dodaj użytkownika</h1>
            <AddUserForm />
        </div>
    )
}