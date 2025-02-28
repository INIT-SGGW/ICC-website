import "./globals.css";
import { Layout } from "@repo/ui";
// eslint-disable-next-line -- Library has a different naming convention
import { jerseyFont } from "@/assets/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Layout font={jerseyFont} navItems={[
      { href: "/", label: "Strona główna", img: "/home.svg" },
      { href: "/about", label: "O wyzwaniu", img: "/about.svg" },
      { href: "/task/2025", label: "Zadania", img: "/flaga.svg" },
      { href: "/login", label: "Zaloguj się", img: "/login.svg" }
    ]}
    >
      <>
        {children}
      </>
    </Layout>
  );
}
