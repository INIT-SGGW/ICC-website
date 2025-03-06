import { CustomLink } from "@repo/ui";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
    robots: "noindex, nofollow",
    title: "Błąd 404 | ICC",
    description: "Podana strona nie istnieje",
};

export default function Custom404(): JSX.Element {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-8 mx-auto max-w-[600px] text-center">
            <h1 className="text-cred text-6xl">Błąd 404</h1>
            <p className="text-gray-200 text-3xl">Podana strona nie istnieje</p>
            <CustomLink href="/" className="mt-8 !bg-cred">Strona główna</CustomLink>
        </div>
    );
}