import { jerseyFont } from "@/assets/fonts";
import { EmailChangeCard } from "@/Views/Email/EmailChangeCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: "noindex, nofollow",
    title: "Zmiana email | ICC",
    description: "Zmień swój adres email na nowy, aby otrzymywać powiadomienia o nowych zadaniach i zmianach w wyzwaniu.",
};

export default function Page(): JSX.Element {
    return (
        <div className={`${jerseyFont.className} w-full h-full flex items-center justify-center mx-auto py-8 max-w-[800px]`}>
            <div className="flex flex-col items-start justify-center gap-4 w-full max-w-[350px]">
                <h1 className="text-3xl text-center text-gray-200">Zmiana email</h1>
                <EmailChangeCard />
            </div>
        </div>
    );
}
