"use client";

import { useVerifyEmail } from "@/services/api";
import { HttpMethods } from "@/types/enums";
import CustomError from "@/utils/CustomError";
import { CustomLink } from "@repo/ui";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerificationCard(): React.JSX.Element {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const { trigger } = useVerifyEmail()

    useEffect(() => {
        if (!email || !token) {
            return;
        }

        const handle = async (): Promise<void> => {
            try {
                await trigger({ body: { email, verificationToken: token }, method: HttpMethods.POST });
            } catch (e: unknown) {
                if (e instanceof CustomError || e instanceof Error) {
                    setError(e.message); return;
                }
                setError("Wystąpił błąd podczas weryfikacji konta.");
            } finally {
                setLoading(false);
            }
        }
        void handle();
    }, [email, token, trigger]);

    if (!email || !token) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 max-w-[600px] mx-auto text-center py-8">
                <h1 className="text-cred text-5xl">Błąd weryfikacji</h1>
                <p className="text-white">Link weryfikacyjny jest nieprawidłowy. Skontaktuj się z nami na <a href="mailto:kontakt@hackarena.pl" className="text-red-500">kontakt@hackarena.pl</a></p>
                <CustomLink href="/" className="!bg-cred max-w-[350px]">Wróć na stronę główną</CustomLink>
            </div>
        )
    }

    if (loading) {
        return <div> </div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 max-w-[500px] mx-auto text-center px-8 py-16">
                <h1 className="text-cred text-5xl">Błąd weryfikacji</h1>
                <div className="flex flex-col gap-0">
                    <p className="text-white">Weryfikacja konta nie powiodła się.</p>
                    <p className="text-gray-400">Error message: {error}</p>
                    <p className="text-white">Skontaktuj się z nami na <a href="mailto:kontakt@hackarena.pl" className="text-cred">kontakt@hackarena.pl</a></p>
                </div>
                <CustomLink href="/" className="!bg-cred max-w-[350px]">Wróć na stronę główną</CustomLink>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 max-w-[500px] mx-auto text-center px-8 py-16">
            <h1 className="text-cred text-5xl">Weryfikacja zakończona</h1>
            <p className="text-white">Twoje konto zostało pomyślnie zweryfikowane. Możesz teraz zalogować się na swoje konto.</p>
            <CustomLink href="/login" className="!bg-cred max-w-[350px]">Zaloguj się</CustomLink>
        </div>
    )
}
