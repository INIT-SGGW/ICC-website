import "./globals.css";
import { Layout } from "@repo/ui";
import { jerseyFont } from "@/assets/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Init Coding Challenge",
    description: "Zadania programistyczne dla studentów",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Layout font={jerseyFont} navItems={[
      { href: "/", label: "Strona główna", img: "/home.svg" },
      { href: "/about", label: "O wyzwaniu", img: "/about.svg" },
      { href: "/task/2025/letni", label: "Zadania", img: "/flaga.svg" },
      { href: "/ranking", label: "Ranking", img: "/ranking.svg" },
      { href: "/account", label: "Login", img: "/login.svg" }
    ]}
      gaid="G-YLVC1T6SQR"
    >
      <>
        {children}
      </>
    </Layout>
  );
}
