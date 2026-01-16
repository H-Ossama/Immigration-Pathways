"use client";

import { Info, HelpCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function AboutPage() {
    const { t, dir } = useTranslation();

    return (
        <div className="container py-12 md:py-24">
            <div className={cn("max-w-3xl mx-auto space-y-8", dir === 'rtl' ? 'text-right' : 'text-left')}>
                <div className={cn("space-y-2 text-center", dir === 'rtl' ? 'md:text-right' : 'md:text-left')}>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl border-none">{t.aboutPage.title}</h1>
                    <p className="text-muted-foreground md:text-xl">{t.aboutPage.description}</p>
                </div>

                <section className="space-y-4">
                    <h2 className={cn("text-2xl font-bold flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse justify-end' : '')}>
                        <Lightbulb className="h-6 w-6 text-yellow-500" />
                        {t.aboutPage.missionTitle}
                    </h2>
                    <p>
                        {t.aboutPage.missionText}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className={cn("text-2xl font-bold flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse justify-end' : '')}>
                        <HelpCircle className="h-6 w-6 text-blue-500" />
                        {t.aboutPage.howItWorksTitle}
                    </h2>
                    <p>
                        {t.aboutPage.howItWorksText}
                    </p>
                </section>

                <section className="p-6 border-2 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 rounded-xl space-y-3">
                    <h2 className={cn("text-xl font-bold flex items-center gap-2 text-amber-800 dark:text-amber-400", dir === 'rtl' ? 'flex-row-reverse justify-end' : '')}>
                        <AlertTriangle className="h-5 w-5" />
                        {t.aboutPage.disclaimerTitle}
                    </h2>
                    <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed">
                        {t.aboutPage.disclaimerText}
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">{t.aboutPage.openTitle}</h2>
                    <p>
                        {t.aboutPage.openText}
                    </p>
                </section>
            </div>
        </div>
    );
}
