import { jerseyFont } from "@/assets/fonts";
import { RegisterCard } from "@/Views/Login/RegisterCard";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Init Coding Challenge",
    description: "Init Coding Challenge to wyjątkowa okazja do rozwoju umiejętności programistycznych poprzez rozwiązywanie zadań, które będą regularnie udostępniane w trakcie trwania semestru. Dodatkowo, ranking oparty na czasie rozwiązania zadań pozwoli na śledzenie postępów i rywalizację z innymi uczestnikami."
};

export default function Page(): JSX.Element {
    notFound();

    return (
        <div className={`${jerseyFont.className} w-full h-full flex flex-col sm:flex-row items-center sm:items-start justify-center gap-16 p-8 mx-auto max-w-[800px]`}>
            <RegisterCard />
        </div>
    );
}
