import { CustomLink } from "@repo/ui";

export default function Page(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center gap-4 max-w-[500px] mx-auto text-center py-8">
            <h1 className="text-cred text-5xl">Gratulacje!</h1>
            <p className="text-white">Twoje konto zostało pomyślnie zweryfikowane. Teraz możesz się zalogować i korzystać z wszystkich funkcji naszej aplikacji.</p>
            <div className="flex md:!flex-row flex-col  gap-4 w-full align-center justify-center">
                <CustomLink href="/" className="!bg-cred">Strona Główna</CustomLink>
                <CustomLink href="/login" className="!bg-cred">Zaloguj się</CustomLink>
            </div>
        </div>
    );
}