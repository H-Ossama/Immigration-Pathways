import { AIResponse } from "@/types";
import { Sparkles, CheckCircle } from "lucide-react";

export function ResultsSummary({ results }: { results: AIResponse }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                    <h1 className="text-xl md:text-3xl font-bold border-none">Analysis Complete</h1>
                    <p className="text-[10px] md:text-sm text-muted-foreground flex items-center gap-2">
                        <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-primary" /> We've found {results.pathways.length} potential pathways for you.
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
