import { Metadata } from "next";
import { Fira_Mono } from "next/font/google";

const font = Fira_Mono({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = { title: "Init Coding Challenge", description: "Fajny opis" };

export default function Page() {
  return (
    <div className={`${font.className} w-full h-full flex items-center justify-center`}>
      <h1 className="text-cred text-6xl">Home Page</h1>
    </div>
  );
}