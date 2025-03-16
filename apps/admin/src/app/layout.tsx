import "./globals.css";
import { Layout } from "@repo/ui";
import { jerseyFont } from "../assets/fonts";
import type { Metadata } from "next";
import AuthWrapper from "../utils/AuthWrapper";


export const metadata: Metadata = { title: "ICC admin panel", description: "ICC admin panel", robots: "noindex, nofollow" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Layout adminPanel font={jerseyFont} navItems={[{ href: "/admin/admin", label: "Admin" }, { href: "/admin/tasks", label: "Zadania" }, { href: "/admin/users", label: "Użytkownicy" }, { href: "/admin/markdown-test", label: "Markdown Test" }]} >
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </Layout>
  );
}
