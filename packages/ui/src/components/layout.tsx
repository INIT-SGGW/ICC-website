import "@repo/ui/styles.css";
import ICCLogo from "../assets/logo.svg";
import FacebookLogo from "../assets/facebook-icon.svg";
import InstagramLogo from "../assets/instagram-icon.svg";
import LinkedinLogo from "../assets/linkedin-icon.svg";
import InitLogo from "../assets/init-logo.svg";
import SGGWLogo from "../assets/sggw-logo.svg";

function TopBar({ adminPanel, navItems }: { adminPanel: boolean, navItems: { href: string, label: string; img?: string }[] }): JSX.Element {
  return (
    <header className="ui-flex ui-flex-col w-full ui-bg-transparent ui-z-20 ">
      <div className="ui-flex ui-items-center ui-justify-between ui-w-full ui-px-4 ui-py-6 ui-bg-black ui-text-cred">
        <a className="ui-flex ui-items-center ui-gap-4" href="/" title="Init Coding Challenge">
          <img alt="Init Coding Challenge" className="ui-w-24 ui-h-24" src={ICCLogo.src} />
          {
            adminPanel ? (
              <h1 className="ui-text-5xl max-sm:ui-hidden">ICC ADMIN<br />PANEL</h1>
            ) : (
              <h1 className="ui-text-5xl max-sm:ui-hidden">init CODING<br />CHALLENGE</h1>
            )
          }
        </a>
        <nav className="ui-flex ui-gap-4">
          {navItems.map((item) => (
            <a className="ui-text-3xl" href={item.href} key={`${item.label}`} title={item.label} >
              {item.img ? (
                <img alt={item.label} className="ui-w-8 ui-h-8" src={item.img} />
              ) : (
                item.label
              )
              }
            </a>
          ))}
        </nav>
      </div>
      <div className="ui-h-20 ui-w-full ui-bg-gradient-to-b ui-from-black"></div>
    </header>
  );
}

function Footer(): JSX.Element {
  const date = new Date();

  return (
    <footer className="ui-flex ui-flex-col">
      <div className="ui-h-20 ui-w-full ui-bg-gradient-to-t ui-from-black"></div>
      <div className="ui-flex ui-flex-col ui-gap-16 ui-items-center ui-justify-center ui-w-full ui-bg-black ui-text-white ui-px-8 ui-py-12">
        <div className="ui-flex ui-flex-col ui-gap-4 ui-items-center">
          <p className="ui-text-xl">Znajdź nas na</p>
          <div className="ui-flex ui-gap-8">
            <a href="https://www.instagram.com/kn_init_/" rel="noopener noreferrer" target="_blank" >
              <img alt="Instagram" className="ui-w-8 ui-h-8" src={InstagramLogo.src} />
            </a>
            <a href="https://www.facebook.com/kninit/" rel="noopener noreferrer" target="_blank" >
              <img alt="Facebook" className="ui-w-8 ui-h-8" src={FacebookLogo.src} />
            </a>
            <a href="https://www.linkedin.com/company/ko%C5%82o-naukowe-init/about/" rel="noopener noreferrer" target="_blank" >
              <img alt="Linkedin" className="ui-w-8 ui-h-8" src={LinkedinLogo.src} />
            </a>
          </div>
        </div>
        <div className="ui-flex ui-flex-col ui-gap-4 ui-items-center">
          <div className="ui-flex ui-gap-8">
            <a href="https://init.wzim.sggw.pl/" rel="noopener noreferrer" target="_blank" >
              <img alt="KN init" className="ui-w-11 ui-h-11" src={InitLogo.src} />
            </a>
            <a href="https://www.sggw.edu.pl/" rel="noopener noreferrer" target="_blank" >
              <img alt="SGGW" className="ui-w-11 ui-h-11" src={SGGWLogo.src} />
            </a>
          </div>
          <p className="ui-text-xl">© {date.getFullYear()} init Coding Challenge</p>
        </div>
      </div>
    </footer>
  );
}

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
    <html className={font.className} lang="pl" >
      <body className="ui-flex ui-flex-col ui-min-h-screen">
        <TopBar adminPanel={adminPanel} navItems={navItems} />
        <div className="ui-flex-1 main-content">
          {children}
        </div>
        <Footer />
      </body>
    </html >
  );
}
