import { jerseyFont } from "@/assets/fonts";
import { PasswordResetCard } from "@/Views/Password/PasswordResetCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resetowanie hasła | ICC",
    description: "Zresetuj swoje hasło, aby odzyskać dostęp do swojego konta.",
};

export default function Page(): JSX.Element {
    return (
        <div className={`${jerseyFont.className} w-full h-full flex items-center justify-center py-8 mx-auto max-w-[800px]`}>
            <div className="flex flex-col items-start justify-center gap-4 w-full max-w-[350px]">
                <h1 className="text-3xl text-center text-gray-200">Resetowanie hasła</h1>
                <PasswordResetCard />
            </div>
        </div>
    );
}
