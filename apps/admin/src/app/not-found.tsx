import { CustomLink } from "@repo/ui";

export default function Custom404(): JSX.Element {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 mx-auto max-w-[600px] text-center min-h-[300px]">
            <h1 className="text-red-500 text-6xl">Błąd 404</h1>
            <p className="text-gray-200 text-3xl">Podana strona nie istnieje</p>
            <CustomLink href="/" className="mt-8">Strona główna</CustomLink>
        </div>
    );
}