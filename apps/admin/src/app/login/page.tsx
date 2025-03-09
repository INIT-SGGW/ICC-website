import { jerseyFont } from "../../assets/fonts";
import { LoginCard } from "../../Views/Login/LoginCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: "noindex, nofollow",
    title: "Logowanie | ICC",
    description: "Zaloguj się, aby mieć dostęp do swojego konta i rozwiązywać zadania.",
};

export default function Page(): JSX.Element {
    return (
        <div className={`${jerseyFont.className} w-full h-full flex flex-col items-center justify-center gap-8 mx-auto py-8 max-w-[800px]`}>
            <LoginCard />
        </div>
    );
}
