"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Import WizardContainer dynamically to avoid hydration issues with local storage
const WizardContainer = dynamic(
    () => import("@/components/wizard/WizardContainer").then((mod) => mod.WizardContainer),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-[60vh] w-full items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
    }
);

export default function StartPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20">
            <WizardContainer />
        </div>
    );
}
