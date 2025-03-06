import { firaMonoFont } from "@/assets/fonts";
import { SectionTitle } from "@/Views/Home/SectionTitle";
import { CustomLink } from "@repo/ui";
import Link from "next/link";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "O wyzwaniu | ICC",
    description: "Init Coding Challenge to wyjątkowa okazja do rozwoju umiejętności programistycznych poprzez rozwiązywanie zadań, które będą regularnie udostępniane w trakcie trwania semestru. Dodatkowo, ranking oparty na czasie rozwiązania zadań pozwoli na śledzenie postępów i rywalizację z innymi uczestnikami."
};

export default function Page(): JSX.Element {
    return (
        <div className="w-full mx-auto max-w-[900px] flex flex-col items-start justify-center gap-8">
            <section className="flex flex-col gap-4">
                <SectionTitle title="o co chodzi w init coding challenge?" icon="/question_mark.svg" />
                <div className={`bg-black p-4 flex flex-col items-start justify-start gap-4 ${firaMonoFont.className}`}>
                    <p className="text-white text-md">
                        ICC to konkurs organizowany przez <Link className="text-cred" href="https://init.wzim.sggw.pl/" target="_blank" rel="noreferer noopener">Koło Naukowe &quot;init&quot;</Link> dla studentów WZIM, bez względu na kierunek czy stopień studiów. Celem konkursu jest rozwijanie umiejętności programistycznych w miłej atmosferze rywalizacji.
                    </p>
                </div>
            </section>
            <section className="flex flex-col gap-4">
                <SectionTitle title="jak to działa?" icon="/light-bulb.svg" />
                <div className={`bg-black p-4 flex flex-col items-start justify-start gap-4 ${firaMonoFont.className}`}>
                    <p className="text-white text-md">
                        Konkurs składa się z <em className="text-cred">12 dwuczęściowych zadań algorytmicznych</em>. Zadania połączone są ze sobą fabularnie i nawiązują do różnych aspektów studiowania na SGGW.
                    </p>
                    <p className="text-white text-md">
                        <em className="text-cred">Zadania ukazują się co tydzień w poniedziałek o godzinie 18:00</em>, rozpoczynając od poniedziałku 10.03, a kończąc w poniedziałek 26.05.
                    </p>
                    <p className="text-white text-md">
                        Twoim zadaniem jest zapoznanie się z treścią zadania, zrozumienie problemu algorytmicznego, a następnie napisanie algorytmu w dowolnym języku (może być nawet w Javie 🤢), który na podstawie wygenerowanego indywidualnie dla Ciebie inputu rozwiąże zadanie.
                    </p>
                    <p className="text-white text-md">
                        <em className="text-cred">Wynikiem zawsze będzie liczba lub ciąg znaków.</em> Tę odpowiedź musisz wpisać na stronie w odpowiednim okienku, aby odblokować kolejną część zadania.
                    </p>
                    <p className="text-white text-md">
                        Druga część rozwija poprzednią, dodając <em className="text-cred">fabularny twist i komplikując problem algorytmiczny</em>. To wciąż ten sam problem, ale w trudniejszej wersji. Dobrze napisany algorytm z pierwszego etapu nie będzie wymagał wielu zmian, jednak brute force, choć w wielu wypadkach zadziała w pierwszej części, nie będzie skuteczny na dłuższą metę. (Poza tym, gdzie tu satysfakcja z pisania brute force&apos;a?)
                    </p>
                </div>
            </section>
            <section className="flex flex-col gap-4">
                <SectionTitle title="punktacja" icon="/star.svg" />
                <div className={`bg-black p-4 flex flex-col items-start justify-start gap-4 ${firaMonoFont.className}`}>
                    <p className="text-white text-md">
                        Rozwiązania są oceniane przede wszystkim na podstawie poprawności - odpowiedź jest albo poprawna, albo nie 😉. Punkty przyznawane są wyłącznie za poprawne odpowiedzi.
                    </p>
                    <p className="text-white text-md">
                        Zadanie składa się z dwóch części, a każda z nich jest punktowana oddzielnie.
                    </p>
                    <p className="text-white text-md">
                        Dodatkowo istotna jest kolejność przesłania odpowiedzi. <em className="text-cred" >Pierwsza osoba, która prześle poprawną odpowiedź na daną część, otrzymuje maksymalną liczbę punktów - 200. Kolejna dostanie 199, następna 198 itd., aż do 20 punktów</em>, które jest minimalną liczbą punktów za poprawną odpowiedź. Wszystkie kolejne osoby, które poprawnie rozwiążą tę część, również otrzymują 20 punktów.
                    </p>
                    <p className="text-white text-md">
                        Druga część zadania jest punktowana w taki sam sposób.
                    </p>
                </div>
            </section>
            <section className="flex flex-col gap-4">
                <SectionTitle title="klasyfikacja" icon="/ranking.svg" />
                <div className={`bg-black p-4 flex flex-col items-start justify-start gap-4 ${firaMonoFont.className}`}>
                    <p className="text-white text-md">
                        <em className="text-cred">Zwycięzca wyzwania wyznaczany jest na podstawie tabeli generalnej po 12 tygodniach trwania wydarzenia.</em>
                    </p>
                    <p className="text-white text-md">
                        Uczestnik, który zdobył najwięcej punktów, zyska miano Mistrza ICC 2025 i zdobędzie pamiątkową koszulkę, którą będzie mógł z dumą nosić na wydziale i nie tylko.
                    </p>
                    <p className="text-white text-md">
                        Jeżeli wiesz, że Twoje umiejętności nie pozwolą ci konkurować o najwyższe pozycje w tabeli - nic straconego! Wciąż możesz wziąć udział w ICC, by podszkolić swoje umiejętności, dobrze się bawić i sprawdzić się na tle swoich koleżanek i kolegów na roku!
                    </p>
                    <p className="text-white text-md">
                        Niedługo dodane zostaną funkcjonalności tworzenia swoich wewnętrznych tabel ze znajomymi, aby śledzić swoje postępy w gronie najbliższych kolegów i koleżanek!
                        {/* Zarejestruj się w panelu(link) i dołącz do pierwszej edycji Init Coding Challange! */}
                    </p>
                </div>
            </section>
            <CustomLink href="/register" className="w-full !bg-cred">
                Zarejestruj się już teraz!
            </CustomLink>
        </div >
    )
}