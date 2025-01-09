import type { Metadata } from "next";
// eslint-disable-next-line -- Library has a different naming convention
import { Fira_Mono } from "next/font/google";

const font = Fira_Mono({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = { title: "Init Coding Challenge", description: "Fajny opis" };

export default function Page(): JSX.Element {
  return (
    <div className={`${font.className} w-full h-full flex items-center justify-center`}>
      <h1 className="text-cred text-6xl">Home Page</h1>
    </div>
  );
}