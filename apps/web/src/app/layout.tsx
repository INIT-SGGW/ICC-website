import "./globals.css";
import Layout from "@repo/ui/layout";
import { Jersey_10 } from "next/font/google";

const FiraMono = Jersey_10({ weight: ["400"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Layout font={FiraMono} navItems={[{ href: "/", label: "Strona główna", img: "./home.svg" }, { href: "/flaga", label: "Flaga", img: "./flaga.svg" }, { href: "/login", label: "Zaloguj się", img: "./login.svg" }]}>
      <>
        {children}
      </>
    </Layout>
  );
}
