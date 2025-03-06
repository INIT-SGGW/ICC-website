import VerificationCard from "@/Views/Login/VerificationCard";
import React, { Suspense } from "react";

export default function Page(): React.JSX.Element {
    return (
        <Suspense>
            <VerificationCard />
        </Suspense>
    )
}
