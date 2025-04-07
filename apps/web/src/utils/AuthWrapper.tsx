"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthWrapperProps = {
    children: React.ReactNode;
}

function AuthWrapper({ children }: AuthWrapperProps): React.JSX.Element | null {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const path = window.location.pathname;

            const userId = localStorage.getItem("userId");
            const loginTime = localStorage.getItem("loginTime");
            if ((!userId || !loginTime || new Date(loginTime).getTime() < new Date().getTime() - 1000 * 60 * 60) && path !== "/admin/login") {
                localStorage.removeItem("adminId");
                localStorage.removeItem("loginTime");
                router.push("/login");
            } else {
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) return null;

    return isAuthenticated ? <>{children}</> : null;
};

export default AuthWrapper;
