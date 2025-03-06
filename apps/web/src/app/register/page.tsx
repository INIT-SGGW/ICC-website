import { jerseyFont } from "@/assets/fonts";
import { RegisterCard } from "@/Views/Login/RegisterCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: "noindex, nofollow",
    title: "Rejestracja | ICC",
    description: "Zarejestruj się, aby mieć dostęp do swojego konta i rozwiązywać zadania.",
};

export default function Page(): JSX.Element {
    return (
        <div className={`${jerseyFont.className} w-full h-full flex flex-col sm:flex-row items-center sm:items-start justify-center gap-16 mx-auto max-w-[800px]`}>
            <RegisterCard />
        </div>
    );
}
