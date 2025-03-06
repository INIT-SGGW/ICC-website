import { firaMonoFont } from "@/assets/fonts";
import { Ranking } from "@/Views/Home/Ranking";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ranking | ICC",
  description: ""
};

export default function Page(): JSX.Element {
  return (
    <div className={`${firaMonoFont.className} w-full h-full flex flex-col items-start justify-center gap-16 mx-auto max-w-[800px]`}>
      <Ranking />
    </div>
  );
}
