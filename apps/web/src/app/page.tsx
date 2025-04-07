import { firaMonoFont, jerseyFont } from "@/assets/fonts";
import { Clock } from "@/Views/Home/Clock";
import { Ranking } from "@/Views/Home/Ranking";
import { SectionTitle } from "@/Views/Home/SectionTitle";
import { CustomLink } from "@repo/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Init Coding Challenge",
  description: "Init Coding Challenge to wyjątkowa okazja do rozwoju umiejętności programistycznych poprzez rozwiązywanie zadań, które będą regularnie udostępniane w trakcie trwania semestru. Dodatkowo, ranking oparty na czasie rozwiązania zadań pozwoli na śledzenie postępów i rywalizację z innymi uczestnikami."
};

function AboutChallenge(): React.JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <SectionTitle title="o wyzwaniu" icon="/question_mark.svg" />

      <div className="bg-black p-4 flex flex-col items-start justify-start gap-4">
        <p className="text-white text-md">
          Init Coding Challenge to wyjątkowa okazja do rozwoju umiejętności programistycznych poprzez rozwiązywanie <em className="text-red-500">zadań</em>, które będą regularnie udostępniane w trakcie trwania semestru. Dodatkowo, ranking oparty na czasie rozwiązania zadań pozwoli na śledzenie postępów i rywalizację z innymi uczestnikami.
        </p>
        <p className={`text-red-500 text-3xl ${jerseyFont.className}`}>
          Co tydzień nowe zadanie!
        </p>
        <CustomLink href="/about" className={jerseyFont.className}>
          Dowiedz się więcej
        </CustomLink>
      </div>
    </div>
  )
}

export default function Page(): React.JSX.Element {
  return (
    <div className={`${firaMonoFont.className} w-full h-full flex flex-col items-start justify-center gap-16 mx-auto max-w-[800px]`}>
      <Clock />
      <AboutChallenge />
      <Ranking />
    </div>
  );
}
