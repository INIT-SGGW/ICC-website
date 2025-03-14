"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

export function GoogleAnalyticsWrapper({ gaid }: { gaid: string }): JSX.Element {
    return <GoogleAnalytics gaMeasurementId="G-YLVC1T6SQR" />;
}