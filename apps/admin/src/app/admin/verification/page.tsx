import { AdminVerifyForm } from "../../../Views/Admin/AdminVerifyForm";

export default function Page(): React.JSX.Element {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-8 px-8">
            <h1 className="text-cred text-6xl">Dodaj admina</h1>
            <AdminVerifyForm />
        </div>
    )
}