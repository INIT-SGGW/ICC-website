"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const useMarkdown = (year: number, task: number, part: string): string => {
    if (part === "A") {
        return `
# Chaos na parkingu naziemnym SGGW

Przyjechałeś na uczelnię swoim autem i postanowiłeś zaparkować na parkingu naziemnym. Niestety, darmowy parking okazał się istnym koszmarem. Ludzie parkują swoje samochody w najdziwniejszych miejscach, zastawiając innym drogę.

Z ciekawości zastanawiasz się, ile samochodów nie jest w stanie wyjechać z parkingu. Postanawiasz zrobić szybką analizę, zanim zaczniesz szukać miejsca dla swojego auta.

Wjechałeś na parking i sporządziłeś mapę, żeby jak na prawdziwego programistę przystało - poświęcić kilka godzin na zautomatyzowanie tego procesu, zamiast po prostu zobaczyć, które samochody nie mogą wyjechać.

## Zasady poruszania się po parkingu

Pojazd jest w stanie wyjechać, jeśli poruszając się **o jedno pole w pionie lub poziomie**, może dotrzeć do wyjazdu, **nie wjeżdżając na przeszkodę ani inny zaparkowany samochód**.

### Oznaczenia na mapie parkingu

- \`#\` – przeszkoda, np. płot, drzewo, itp.
- \`X\` – zaparkowany samochód
- \`W\` – wjazd/wyjazd z parkingu

### Przykład mapy parkingu

Mapa parkingu:

\`\`\`
#################
#XXX#XX#  X XX X#
#X #   X# XX#X ##
#    X          #
# #X#XX #XXX #X W
#W###############
\`\`\`

Mapa po zaznaczeniu zablokowanych pojazdów (\`@\`):

\`\`\`
#################
#@X@#XX#  X @X X#
#X #   X# XX#X ##
#    X          #
# #X#@X #XXX #X W
#W###############
\`\`\`

## Zadanie – część pierwsza

Policz, **ile samochodów nie jest w stanie wyjechać z parkingu**.

W powyższym przykładzie **4 samochody** są zablokowane i nie mogą wyjechać.
`
    }
    return `
## Zadanie – część druga

Wiesz już, ile samochodów nie jest w stanie wyjechać z parkingu. Mimo takiej dość przygnębiającej sytuacji, postanawiasz podjąć ryzyko i zaparkować swoje auto, licząc na to, że nikt nie zablokuje Ci wyjazdu.

W stosunku do innych postanawiasz zachować resztki godności i zaparkować swoje auto w sposób, który nie zablokuje wyjazdu innym. Zastanawiasz się, ile jest takich możliwości.

Uważaj, żeby **nie zaparkować na wjeździe** oznaczonym jako \`W\`!

### Przykład

Załóżmy, że masz do dyspozycji następującą mapę parkingu:

\`\`\`
#################
#XXX#XX#  X XX X#
#X #   X# XX#X ##
#    X          #
# #X#XX #XXX #X W
#W###############
\`\`\`

Poniższa mapa pokazuje, w jaki sposób możesz zaparkować swoje auto, aby nie zablokować wyjazdu innym, oznaczając je literą \`P\`:

\`\`\`
#################
#XXX#XX#P X XX X#
#X #P  X# XX#X ##
#P  PXPPP   PP P#
#P#X#XXP#XXXP#XPW
#W###############
\`\`\`

W powyższym przykładzie masz **14 możliwości** zaparkowania swojego auta, by nikogo więcej nie zablokować.

Sposób poruszania się po parkingu nie zmienił się.

**Ile możliwości zaparkowania auta masz na podstawie swojej mapy parkingu?**
`;

}


type Props = {
    year: number
    task: number
    part: string
}

export function Content({ year, task, part }: Props): React.JSX.Element {

    const markdown = useMarkdown(year, task, part);

    return (
        <div className="bg-black p-4 w-full">
            <p className="text-[#FF0000] text-lg">10.03.2024</p>
            <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        </div>
    )
}