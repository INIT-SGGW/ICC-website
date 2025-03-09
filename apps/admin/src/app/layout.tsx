import "./globals.css";
import { Layout } from "@repo/ui";
import { jerseyFont } from "../assets/fonts";
import type { Metadata } from "next";
 

export const metadata: Metadata = { title: "ICC admin panel", description: "ICC admin panel", robots: "noindex, nofollow" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Layout adminPanel font={jerseyFont} navItems={[{ href: "/tasks", label: "Zadania" }, { href: "/users", label: "Użytkownicy" }]} >
      <>
        {children}
      </>
    </Layout>
  );
}
