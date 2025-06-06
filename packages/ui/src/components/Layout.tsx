import "@repo/ui/styles.css";
import ICCLogo from "../assets/logo.svg";
import FacebookLogo from "../assets/facebook-icon.svg";
import InstagramLogo from "../assets/instagram-icon.svg";
import LinkedinLogo from "../assets/linkedin-icon.svg";
import InitLogo from "../assets/init-logo.svg";
import SGGWLogo from "../assets/sggw-logo.svg";
import MevspaceLogo from "../assets/mevspace.svg";
import { GoogleAnalyticsWrapper } from "./GoogleAnalyticsWrapper";

function TopBar({ adminPanel, navItems }: { adminPanel: boolean, navItems: { href: string, label: string; img?: string }[] }): JSX.Element {
  return (
    <header className="flex flex-col w-full bg-transparent z-20 ">
      <div className="flex items-center justify-between w-full px-4 py-6 bg-black text-cred">
        <a className="flex items-center gap-4" href={adminPanel ? "/admin" : "/"} title="Init Coding Challenge">
          <img alt="Init Coding Challenge" className="w-24 h-24" src={ICCLogo.src} />
          {
            adminPanel ? (
              <h1 className="text-5xl max-sm:hidden">ICC ADMIN<br />PANEL</h1>
            ) : (
              <h1 className="text-5xl max-sm:hidden">init CODING<br />CHALLENGE</h1>
            )
          }
        </a>
        <nav className="flex gap-4">
          {navItems.map((item) => (
            <a className="text-3xl" href={item.href} key={item.label} title={item.label} >
              {item.img ? (
                <img alt={item.label} className="w-8 h-8" src={item.img} />
              ) : (
                item.label
              )
              }
            </a>
          ))}
        </nav>
      </div>
      <div className="w-full h-24 bg-[url('../src/assets/minecraft-bg.svg')] bg-repeat-x bg-[length:auto_100%]" />
    </header>
  );
}

function Footer({ adminPanel }: { adminPanel: boolean }): JSX.Element {
  const date = new Date();

  return (
    <footer className="flex flex-col">
      <div className="w-full h-24 bg-[url('../src/assets/minecraft-bg-r.svg')] bg-repeat-x bg-[length:auto_100%]" />
      <div className="flex flex-col gap-16 items-center justify-center w-full bg-black text-white px-8 py-12 pb-4">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-xl">Znajdź nas na</p>
          <div className="flex gap-8">
            <a href="https://www.instagram.com/kn_init_/" rel="noopener noreferrer" target="_blank" >
              <img alt="Instagram" className="w-8 h-8" src={InstagramLogo.src} />
            </a>
            <a href="https://www.facebook.com/kninit/" rel="noopener noreferrer" target="_blank" >
              <img alt="Facebook" className="w-8 h-8" src={FacebookLogo.src} />
            </a>
            <a href="https://www.linkedin.com/company/ko%C5%82o-naukowe-init/about/" rel="noopener noreferrer" target="_blank" >
              <img alt="Linkedin" className="w-8 h-8" src={LinkedinLogo.src} />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="flex gap-8">
            <a href="https://init.wzim.sggw.pl/" rel="noopener noreferrer" target="_blank" >
              <img alt="KN init" className="w-11 h-11" src={InitLogo.src} />
            </a>
            <a href="https://www.sggw.edu.pl/" rel="noopener noreferrer" target="_blank" >
              <img alt="SGGW" className="w-11 h-11" src={SGGWLogo.src} />
            </a>
          </div>
          <a href="https://mevspace.com/" rel="noopener noreferrer" target="_blank" >
            <img alt="Mevspace" className="w-36" src={MevspaceLogo.src} />
          </a>
          <div className="text-center mt-4">
            <p className="text-xl">© {date.getFullYear()} init Coding Challenge</p>
            {
              !adminPanel && (
                <div>
                  <a className="text-md" href="/Polityka prywatności.pdf">Polityka prywatności</a>
                  <span className="mx-4">•</span>
                  <a className="text-md" href="/Regulamin.pdf">Regulamin</a>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </footer>
  );
}

export function RootLayout({
  font,
  navItems,
  gaid,
  adminPanel = false,
  children,
}: {
  font: { className: string };
  navItems: { href: string; label: string; img?: string }[];
  gaid?: string;
  adminPanel?: boolean;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html className={font.className} lang="pl" >
      <body className="flex flex-col min-h-screen">
        {gaid && <GoogleAnalyticsWrapper gaid={gaid} />}
        <TopBar adminPanel={adminPanel} navItems={navItems} />
        <div className="flex-1 main-content p-8 py-16">
          {children}
        </div>
        <Footer adminPanel={adminPanel} />
      </body>
    </html >
  );
}
