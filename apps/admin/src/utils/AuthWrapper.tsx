"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

type AuthWrapperProps = {
    children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const path = window.location.pathname;

            const adminId = localStorage.getItem("adminId");
            const loginTime = localStorage.getItem("loginTime");

            if ((!adminId || !loginTime || new Date(loginTime).getTime() < new Date().getTime() - 1000 * 60 * 60) && path !== "/admin/login") {
                localStorage.removeItem("adminId");
                localStorage.removeItem("loginTime");
                redirect("/login");
            } else {
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        }
    }, []);

    if (isLoading) return null;

    return isAuthenticated ? <>{children}</> : null;
};

export default AuthWrapper;
