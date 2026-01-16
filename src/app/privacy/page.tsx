"use client";

import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function PrivacyPage() {
    const { t, dir } = useTranslation();

    return (
        <div className="container py-12 md:py-24">
            <div className={cn("max-w-3xl mx-auto space-y-8", dir === 'rtl' ? 'text-right' : 'text-left')}>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl border-none">{t.privacyPage.title}</h1>
                    <p className="text-muted-foreground">{t.privacyPage.lastUpdated} {new Date().toLocaleDateString()}</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">{t.privacyPage.introTitle}</h2>
                    <p className="leading-relaxed text-muted-foreground">
                        {t.privacyPage.introText}
                    </p>
                </section>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="p-6 border rounded-xl space-y-2 bg-muted/50">
                        <Lock className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">{t.privacyPage.localKeyTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t.privacyPage.localKeyText}
                        </p>
                    </div>
                    <div className="p-6 border rounded-xl space-y-2 bg-muted/50">
                        <ServerOff className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">{t.privacyPage.noDbTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t.privacyPage.noDbText}
                        </p>
                    </div>
                    <div className="p-6 border rounded-xl space-y-2 bg-muted/50">
                        <EyeOff className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">{t.privacyPage.noTrackTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t.privacyPage.noTrackText}
                        </p>
                    </div>
                    <div className="p-6 border rounded-xl space-y-2 bg-muted/50">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">{t.privacyPage.secureCallsTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                            {t.privacyPage.secureCallsText}
                        </p>
                    </div>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">{t.privacyPage.infoSectionTitle}</h2>
                    <p className="leading-relaxed text-muted-foreground">
                        {t.privacyPage.infoSectionText}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">{t.privacyPage.aiUsageTitle}</h2>
                    <p className="leading-relaxed text-muted-foreground">
                        {t.privacyPage.aiUsageText}
                    </p>
                </section>
            </div>
        </div>
    );
}
