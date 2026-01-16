"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/form-store";
import { ResultsSummary } from "@/components/results/ResultsSummary";
import { PathwayCard } from "@/components/results/PathwayCard";
import { ActionButtons } from "@/components/results/ActionButtons";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Sparkles, Globe, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function ResultsPage() {
    const router = useRouter();
    const { results, resetForm, formData, setIsLoading, setError, setResults, isLoading } = useFormStore();
    const { t, language, dir, setLanguage } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!results) {
            router.push("/start");
            return;
        }

        setIsLoaded(true);

        // Celebration confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, [results, router]);

    const handleStartOver = () => {
        resetForm();
        router.push("/start");
    };

    const handleReTranslate = async (newLang: string) => {
        setLanguage(newLang as any);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/generate-pathways", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    language: newLang
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to translate pathways");
            }

            const data = await response.json();
            setResults(data);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred during translation");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!results) return null;

    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] py-12 md:py-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-primary/10 blur-[120px] rounded-full animate-float" />
                <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-teal-500/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />
            </div>

            <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center mb-12 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold animate-bounce text-sm">
                        <Sparkles className="h-4 w-4" />
                        <span>{t.results.generatedSuccess}</span>
                    </div>

                    <h1 className={cn("text-4xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 dark:from-white dark:to-white/60", dir === 'rtl' ? 'flex flex-row-reverse gap-4' : '')}>
                        {t.results.title} <span className="text-primary italic">{t.results.roadmap}</span>
                    </h1>

                    <p className="text-muted-foreground text-base md:text-lg font-medium max-w-2xl px-4">
                        {t.results.description}
                    </p>

                    {/* Language-specific re-generation options */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                        {['en', 'fr', 'ar'].map((l) => (
                            <Button
                                key={l}
                                variant={language === l ? "secondary" : "outline"}
                                size="sm"
                                onClick={() => handleReTranslate(l)}
                                disabled={isLoading}
                                className={cn("rounded-full h-9 px-4 font-bold border-primary/20", language === l ? "bg-primary/10 text-primary border-primary/30" : "")}
                            >
                                {isLoading && language === l ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Globe className="h-3 w-3 mr-2" />}
                                {l === 'en' ? 'Translate to English' : l === 'fr' ? 'Traduire en Français' : 'ترجمة إلى العربية'}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {/* Results Hero / Summary Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-16"
                >
                    <Card className="glass dark:glass-dark border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group">
                        {/* Summary Gradient Glow */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors" />

                        <div className={cn("relative z-10 flex flex-col md:flex-row gap-8 lg:gap-16 items-center", dir === 'rtl' ? 'md:flex-row-reverse' : '')}>
                            <div className={cn("flex-1 space-y-6", dir === 'rtl' ? 'text-right' : 'text-left')}>
                                <ResultsSummary results={results} />
                                <div className={cn("hidden md:flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest pl-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                    <Globe className="h-4 w-4 text-primary" />
                                    <span>{t.results.verified} • {t.results.sources}</span>
                                </div>
                            </div>

                            <div className="w-full md:w-[280px] lg:w-[320px] flex flex-col gap-3">
                                <div className={cn("p-4 rounded-2xl bg-primary/5 border border-primary/10 mb-2", dir === 'rtl' ? 'text-right' : 'text-left')}>
                                    <p className="text-[10px] uppercase tracking-widest font-black text-primary mb-1">{t.results.totalOptions}</p>
                                    <p className="text-4xl font-black">{results.pathways.length} {t.results.optionsCount}</p>
                                </div>
                                <ActionButtons results={results} />
                                <Button variant="ghost" size="sm" onClick={handleStartOver} className="text-muted-foreground hover:bg-primary/5 rounded-xl font-bold py-6 w-full">
                                    <RefreshCw className="h-4 w-4 mr-2" /> {t.results.startOver}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Pathway Cards Section */}
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60 whitespace-nowrap">{t.results.exploreOptions}</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    </div>

                    {results.pathways.map((pathway, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                        >
                            <PathwayCard
                                pathway={pathway}
                                index={index}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Final Footer Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 text-center space-y-8 max-w-2xl mx-auto p-8 md:p-16 glass dark:glass-dark rounded-[3rem] md:rounded-[4rem] border-white/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

                    <span className={cn("text-4xl md:text-6xl text-primary opacity-20 font-serif absolute top-8", dir === 'rtl' ? 'right-8 rotate-180' : 'left-8')}>"</span>
                    <h3 className="text-xl md:text-3xl font-bold italic text-foreground leading-snug relative z-10">
                        {results.summary.split('.')[0]}. {t.results.quote}
                    </h3>

                    <div className="h-px w-24 bg-primary/30 mx-auto" />

                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black opacity-60 leading-relaxed px-4">
                            {t.results.disclaimer}
                        </p>

                        <Button variant="outline" asChild className="rounded-full px-10 h-12 border-primary/20 hover:bg-primary/5 hover:border-primary transition-all">
                            <button onClick={() => router.push("/")}>
                                {dir === 'rtl' ? <RefreshCw className="ml-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />} {t.results.backHome}
                            </button>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Helper Card component for the ResultsSummary since it's used inside
function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={className}>{children}</div>
}
