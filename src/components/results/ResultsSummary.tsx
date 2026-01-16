import { AIResponse } from "@/types";
import { Sparkles, CheckCircle } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function ResultsSummary({ results }: { results: AIResponse }) {
    const { t, dir } = useTranslation();

    return (
        <div className={cn("space-y-4", dir === 'rtl' ? 'text-right' : 'text-left')}>
            <div className={cn("flex items-center gap-3", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                    <h1 className="text-xl md:text-3xl font-bold border-none">{t.results.generatedSuccess}</h1>
                    <p className={cn("text-[10px] md:text-sm text-muted-foreground flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                        <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-primary" /> {dir === 'rtl' ? `لقد وجدنا ${results.pathways.length} مسارات محتملة لك.` : `We've found ${results.pathways.length} potential pathways for you.`}
                    </p>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <p className="leading-relaxed text-muted-foreground italic">
                    "{results.summary}"
                </p>
            </div>
        </div>
    );
}
