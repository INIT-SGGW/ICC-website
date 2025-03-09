"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeCard(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const userId = localStorage.getItem("userId")
        if (!userId) {
            router.push("/login")
        } else {
            setLoading(false)
        }
    }, [router])

    if (loading) {
        return <div> </div>;
    }

    return (
        <h1 className="text-cred text-6xl">Home Page</h1>
    );
}