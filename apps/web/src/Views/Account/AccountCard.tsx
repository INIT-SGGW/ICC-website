"use client";

import { Button } from "@repo/ui";
import React, { useState, useEffect } from "react";
import { useLogout, useUser } from "@/services/api";
import CustomError from "@/utils/CustomError";
import { HttpMethods } from "@/types/enums";
import type { User } from "@repo/types";

function AccountDataDisplay({ title, text }: { title: string, text: string }): React.JSX.Element {
    return (
        <div className="flex w-full justify-between">
            <p className="text-red-500 font-bold">{title}:</p>
            <p className="text-white">{text}</p>
        </div>
    )
}

export function AccountCard(): React.JSX.Element {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [userData, setUserData] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const { trigger, isMutating } = useLogout();
    const { trigger: getUser } = useUser(`/register/user/${userId}`);

    useEffect(() => {
        const savedUserId = localStorage.getItem("userId");
        if (!savedUserId) {
            window.location.href = "/";
        }
        setUserId(savedUserId);
    }, [])

    useEffect(() => {
        const fetchUser = async (): Promise<void> => {
            try {
                const user = await getUser();
                setUserData(user);
            } catch (e: unknown) {
                if (e instanceof CustomError) {
                    setErrorMessage(e.getMessage());
                } else if (e instanceof Error) {
                    setErrorMessage(e.message);
                }
                setErrorMessage("Wystąpił błąd podczas pobierania danych użytkownika");
            }
        };

        if (userId) {
            void fetchUser();
        }
    }, [userId, getUser]);


    const handleLogout = async (): Promise<void> => {
        setErrorMessage(undefined);

        try {
            await trigger({ method: HttpMethods.POST });
            localStorage.removeItem("userId");
            window.location.href = "/";
        } catch (e: unknown) {
            if (e instanceof CustomError) {
                setErrorMessage(e.getMessage());
            } else if (e instanceof Error) {
                setErrorMessage(e.message);
            }
            setErrorMessage("Wystąpił błąd podczas wylogowywania");
        }
    };

    const _handleDeleteAccount = (): void => {
        // eslint-disable-next-line no-console -- this is a placeholder
        console.log("Account deleted");
    };

    return (
        <div className="bg-black p-4 max-w-[350px] flex-grow flex flex-col justify-between gap-8">
            <div>
                <AccountDataDisplay title="Imię" text={userData?.firstName || "-"} />
                <AccountDataDisplay title="Nazwisko" text={userData?.lastName || "-"} />
                <AccountDataDisplay title="E-mail" text={userData?.emails[0] || "-"} />
            </div>
            <div className="flex flex-col w-full gap-2">
                <Button onClick={() => { void handleLogout() }} disabled={isMutating} className="mt-4">{isMutating ? "..." : "Wyloguj się"}</Button>
                <p className="text-red-500 text-sm">{errorMessage}</p>
                {/* <CustomLink href="/email/change" className="mt-4">Zmień e-mail</CustomLink>
                <CustomLink href="/password/change" className="mt-4">Zmień hasło</CustomLink>
                <Button onClick={handleDeleteAccount} className="mt-4">Usuń konto</Button> */}
            </div>
        </div>
    );
}
