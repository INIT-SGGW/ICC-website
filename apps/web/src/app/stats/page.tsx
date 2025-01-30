import { firaMonoFont } from "@/assets/fonts";
import { Ranking } from "@/Views/Home/Ranking";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Init Coding Challenge",
  description: "Init Coding Challenge to wyjątkowa okazja do rozwoju umiejętności programistycznych poprzez rozwiązywanie zadań, które będą regularnie udostępniane w trakcie trwania semestru. Dodatkowo, ranking oparty na czasie rozwiązania zadań pozwoli na śledzenie postępów i rywalizację z innymi uczestnikami."
};

export default function Page(): JSX.Element {
  return (
    <div className={`${firaMonoFont.className} w-full h-full flex flex-col items-start justify-center gap-16 p-8 mx-auto max-w-[800px]`}>
      <Ranking />
    </div>
  );
}
