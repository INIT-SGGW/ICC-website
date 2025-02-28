import { jerseyFont } from "@/assets/fonts";
import { PasswordChangeCard } from "@/Views/Password/PasswordChangeCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: "noindex, nofollow",
    title: "Zmiana hasła | ICC",
    description: "Zmień swoje hasło na nowe, aby zwiększyć bezpieczeństwo swojego konta.",
};

export default function Page(): JSX.Element {
    return (
        <div className={`${jerseyFont.className} w-full h-full flex items-center justify-center p-8 mx-auto max-w-[800px]`}>
            <div className="flex flex-col items-start justify-center gap-4 w-full max-w-[350px]">
                <h1 className="text-3xl text-center text-gray-200">Zmiana hasła</h1>
                <PasswordChangeCard />
            </div>
        </div>
    );
}
