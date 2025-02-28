import { jerseyFont } from "@/assets/fonts";
import { LoginCard } from "@/Views/Login/LoginCard";
import { CustomLink } from "@repo/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Init Coding Challenge",
    description: "Init Coding Challenge to wyjątkowa okazja do rozwoju umiejętności programistycznych poprzez rozwiązywanie zadań, które będą regularnie udostępniane w trakcie trwania semestru. Dodatkowo, ranking oparty na czasie rozwiązania zadań pozwoli na śledzenie postępów i rywalizację z innymi uczestnikami."
};

export default function Page(): JSX.Element {
    return (
        <div className={`${jerseyFont.className} w-full h-full flex flex-col items-center justify-center gap-8 mx-auto px-8 max-w-[800px]`}>
            <h1 className="text-6xl text-white">Już wkrótce!</h1>
            <CustomLink href="/" className="text-white text-sm max-w-[450px]">
                Wróć do strony głównej
            </CustomLink>
            {/* <LoginCard /> */}
        </div>
    );
}
