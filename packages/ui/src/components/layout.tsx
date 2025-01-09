"use client";

import "@repo/ui/styles.css";
import ICCLogo from "../assets/logo.svg";
import FacebookLogo from "../assets/facebook-icon.svg";
import InstagramLogo from "../assets/instagram-icon.svg";
import LinkedinLogo from "../assets/linkedin-icon.svg";
import InitLogo from "../assets/init-logo.svg";
import SGGWLogo from "../assets/sggw-logo.svg";
import { useState } from "react";

function TopBar({ navItems, adminPanel }: { navItems: { href: string, label: string; img?: string }[], adminPanel: boolean }): JSX.Element {
  return (
    <header className="ui-flex ui-items-center ui-justify-between ui-w-full ui-px-4 ui-py-6 ui-sticky ui-top-0 ui-z-20 ui-bg-black ui-text-cred">
      <a className="ui-flex ui-items-center ui-gap-4" href="/" title="Init Coding Challenge">
        <img className="ui-w-24 ui-h-24" src={ICCLogo.src} alt="Init Coding Challenge" />
        {
          adminPanel ? (
            <h1 className="ui-text-5xl">ICC ADMIN<br />PANEL</h1>
          ) : (
            <h1 className="ui-text-5xl">init CODING<br />CHALLENGE</h1>
          )
        }
      </a>
      <nav className="ui-flex ui-gap-4">
        {navItems.map((item, index) => (
          <a key={index} href={item.href} className="ui-text-3xl">
            {item.img ? (
              <img key={index} className="ui-w-8 ui-h-8" src={item.img} alt={item.label} title={item.label} />
            ) : (
              item.label
            )
            }
          </a>
        ))}
      </nav>
    </header>
  );
}

function Footer(): JSX.Element {
  const [date, _] = useState(new Date());

  return (
    <footer className="ui-flex ui-flex-col ui-gap-16 ui-items-center ui-justify-center ui-w-full ui-bg-black ui-text-white ui-px-8 ui-py-12">
      <div className="ui-flex ui-flex-col ui-gap-4 ui-items-center">
        <p className="ui-text-xl">Znajdź nas na</p>
        <div className="ui-flex ui-gap-8">
          <a href="https://www.instagram.com/kn_init_/" target="_blank">
            <img className="ui-w-8 ui-h-8" src={InstagramLogo.src} alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/kninit/" target="_blank">
            <img className="ui-w-8 ui-h-8" src={FacebookLogo.src} alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/company/ko%C5%82o-naukowe-init/about/" target="_blank">
            <img className="ui-w-8 ui-h-8" src={LinkedinLogo.src} alt="Linkedin" />
          </a>
        </div>
      </div>
      <div className="ui-flex ui-flex-col ui-gap-4 ui-items-center">
        <div className="ui-flex ui-gap-8">
          <a href="https://init.wzim.sggw.pl/" target="_blank">
            <img className="ui-w-11 ui-h-11" src={InitLogo.src} alt="KN init" />
          </a>
          <a href="https://www.sggw.edu.pl/" target="_blank">
            <img className="ui-w-11 ui-h-11" src={SGGWLogo.src} alt="SGGW" />
          </a>
        </div>
        <p className="ui-text-xl">© {date.getFullYear()} init Coding Challenge</p>
      </div>
    </footer>
  );
}


// const font = Fira_Mono({ weight: ["400", "500", "700"], subsets: ["latin"] });

export default function RootLayout({
  font,
  navItems,
  adminPanel = false,
  children,
}: {
  font: { className: string };
  navItems: { href: string; label: string; img?: string }[];
  adminPanel?: boolean;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="pl" className={font.className}>
      <body className="ui-flex ui-flex-col ui-min-h-screen">
        <TopBar navItems={navItems} adminPanel={adminPanel} />
        <div className="ui-flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html >
  );
}
