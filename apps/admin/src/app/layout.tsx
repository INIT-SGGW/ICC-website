import "./globals.css";
import Layout from "@repo/ui/layout";
// eslint-disable-next-line -- Library has a different naming convention
import { Jersey_10 } from "next/font/google";

const FiraMono = Jersey_10({ weight: ["400"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Layout adminPanel font={FiraMono} navItems={[{ href: "/", label: "Strona główna" }, { href: "/tasks", label: "Zadania" }, { href: "/users", label: "Użytkownicy" }]} >
      <>
        {children}
      </>
    </Layout>
  );
}
