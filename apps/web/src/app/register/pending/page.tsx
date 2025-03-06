import { CustomLink } from "@repo/ui";

export default function Page(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center gap-4 max-w-[500px] mx-auto text-center py-8">
            <h1 className="text-cred text-5xl">Już prawie!</h1>
            <p className="text-white">
                Sprawdź swoją skrzynkę pocztową, aby znaleźć link do weryfikacji konta. Jeśli nie widzisz wiadomości, sprawdź folder spam.
            </p>
            <div className="flex md:!flex-row flex-col  gap-4 w-full align-center justify-center">
                <CustomLink href="/" className="!bg-cred">Strona Główna</CustomLink>
            </div>
        </div>
    );
}