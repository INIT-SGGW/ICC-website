import type { Metadata } from "next";
// eslint-disable-next-line -- Library has a different naming convention
import { Fira_Mono } from "next/font/google";
import { Jersey_20 } from "next/font/google";
import Image from "next/image";

const firaMonoFont = Fira_Mono({ weight: ["400", "500", "700"], subsets: ["latin"] });
const jerseyFont = Jersey_20({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = { title: "Init Coding Challenge", description: "Fajny opis" };

const ROMAN_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const SELECTED_DAY = 0;

const RANKING_DATA = Array.from({ length: 25 }, (_, index) => ({
  nickname: `User ${index + 1}`,
  indexNumber: 210834 + Math.floor(Math.random() * 1000),
  points: Math.floor(Math.random() * 1000),
}));

const SectionTitle = ({ title, icon }: { title: string, icon: string }) => {
  return (
    <div className="flex flex-row items-end justify-start gap-2 relative">
      <Image src={icon} alt={title} width={35} height={35} />
      <h1 className={`text-white text-4xl ${jerseyFont.className} relative -bottom-[10px]`}>{title}</h1>
    </div>
  )
}

export default function Page(): JSX.Element {
  return (
    <div className={`${firaMonoFont.className} w-full h-full flex flex-col items-start justify-center gap-16 p-8 mx-auto max-w-[800px]`}>

      {/* Section - about challenge */}
      <div className="flex flex-col items-start justify-start gap-4">
        <SectionTitle title="o wyzwaniu" icon="/question_mark.svg" />

        <div className="bg-black p-4 flex flex-col items-start justify-start gap-4">
          <p className="text-white text-md">
            Init Coding Challenge to wyjątkowa okazja do rozwoju umiejętności programistycznych poprzez rozwiązywanie <em className="text-red-500">zadań</em>, które będą regularnie udostępniane w trakcie trwania semestru. Dodatkowo, ranking oparty na czasie rozwiązania zadań pozwoli na śledzenie postępów i rywalizację z innymi uczestnikami.
          </p>
          <p className={`text-red-500 text-3xl ${jerseyFont.className}`}>
            Co tydzień nowe zadanie!
          </p>
        </div>
      </div>

      {/* Section - Ranking */}
      <div className="flex flex-col items-start justify-start gap-4 w-full">
        <SectionTitle title="ranking" icon="/trophy.svg" />

        <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-12 gap-4">
          {ROMAN_NUMBERS.map((number, index) => (
            <div key={index} className={`flex flex-col items-center justify-center gap-4 bg-black px-4 py-2 ${index === SELECTED_DAY ? "border-2 border-red-500" : ""}`}>
              <p className={`text-red-500 text-xl ${jerseyFont.className}`}>
                {number}
              </p>
            </div>
          ))}
        </div>

        <div className={`bg-black text-white w-full grid grid-cols-[25px_2fr_1fr] gap-0 p-8 ${jerseyFont.className} text-xl`}>
          {RANKING_DATA.sort((a, b) => b.points - a.points).map((user, index) => (
            <>
              <p className={`text-red-500 text-end mr-2`}>{index + 1}.</p>
              <p>{user.nickname} (s{user.indexNumber})</p>
              <p className={`text-red-500 text-end`}>{user.points}</p>
            </>
          ))}
        </div>

      </div>

    </div>
  );
}
