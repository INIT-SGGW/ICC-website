"use client";

import { Button } from "@repo/ui"
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomError from "../../utils/CustomError";
import { HttpMethods } from "../../types/enums";
import { useLogout } from "../../services/api";

const navItems = [{
    label: 'Admin',
    href: 'admin/admin',
}, {
    label: 'Zadania',
    href: 'admin/tasks',
}, {
    label: 'Użytkownicy',
    href: 'admin/users',
}, {
    label: 'Markdown test',
    href: 'admin/markdown-test'
}
]

export function HomeNav() {
    const router = useRouter();
    const { trigger } = useLogout();

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleLogout = async (): Promise<void> => {
        setErrorMessage(undefined);

        try {
            await trigger({ method: HttpMethods.POST, credentials: true });
            localStorage.removeItem("adminId");
            localStorage.removeItem("loginTime");
            router.push("/admin/login");
        } catch (e: unknown) {
            if (e instanceof CustomError || e instanceof Error) {
                setErrorMessage(e.message);
            }
            setErrorMessage("Wystąpił błąd podczas wylogowywania");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-row justify-center items-center gap-2 max-w-[600px] flex-wrap mt-8">
                {
                    navItems.map((item) => (
                        <a key={item.href} href={item.href} className="text-cred border-cred border-2 px-8 py-2 text-2xl text-nowrap flex-1 text-center">{item.label}</a>
                    ))
                }
            </div>
            <Button className="!bg-cred" onClick={() => { void handleLogout() }}>Wyloguj się</Button>
            <p className="text-red-500 text-sm">{errorMessage}</p>
        </div>
    )
}