import { jerseyFont } from "@/assets/fonts";
import { AccountCard } from "@/Views/Account/AccountCard";
import { StatsCard } from "@/Views/Account/StatsCard";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Init Coding Challenge",
    description: "Init Coding Challenge to wyjątkowa okazja do rozwoju umiejętności programistycznych poprzez rozwiązywanie zadań, które będą regularnie udostępniane w trakcie trwania semestru. Dodatkowo, ranking oparty na czasie rozwiązania zadań pozwoli na śledzenie postępów i rywalizację z innymi uczestnikami."
};

export default function Page(): JSX.Element {
    notFound();

    return (
        <div className={`${jerseyFont.className} w-full h-full flex flex-wrap justify-center gap-16 p-8 mx-auto max-w-[1000px]`}>
            <div className="flex flex-col gap-4 max-w-[350px] w-full">
                <h4 className="text-4xl text-white">Twoje dane</h4>
                <AccountCard />
            </div>
            <div className="flex flex-col gap-4 max-w-[350px] w-full">
                <h4 className="text-4xl text-white">Twoje wyniki</h4>
                <StatsCard />
            </div>
        </div>
    );
}
