"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/form-store";
import { ResultsSummary } from "@/components/results/ResultsSummary";
import { PathwayCard } from "@/components/results/PathwayCard";
import { ActionButtons } from "@/components/results/ActionButtons";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Sparkles, Globe } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultsPage() {
    const router = useRouter();
    const { results, resetForm } = useFormStore();
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

    if (!results) return null;

    const handleStartOver = () => {
        resetForm();
        router.push("/start");
    };

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
                        <span>Pathways Generated Successfully!</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 dark:from-white dark:to-white/60">
                        Your Global <span className="text-primary italic">Roadmap</span>
                    </h1>

                    <p className="text-muted-foreground text-base md:text-lg font-medium max-w-2xl px-4">
                        Our AI has analyzed your profile and found the most promising immigration options tailored specifically for your goals.
                    </p>
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

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
                            <div className="flex-1 space-y-6">
                                <ResultsSummary results={results} />
                                <div className="hidden md:flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest pl-2">
                                    <Globe className="h-4 w-4 text-primary" />
                                    <span>Verified AI Generation • Official Sources Linked</span>
                                </div>
                            </div>

                            <div className="w-full md:w-[280px] lg:w-[320px] flex flex-col gap-3">
                                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 mb-2">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-primary mb-1">Total Options</p>
                                    <p className="text-4xl font-black">{results.pathways.length} Pathways</p>
                                </div>
                                <ActionButtons results={results} />
                                <Button variant="ghost" size="sm" onClick={handleStartOver} className="text-muted-foreground hover:bg-primary/5 rounded-xl font-bold py-6 w-full">
                                    <RefreshCw className="h-4 w-4 mr-2" /> Start New Search
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Pathway Cards Section */}
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60 whitespace-nowrap">Explore Your Options</h2>
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

                    <span className="text-4xl md:text-6xl text-primary opacity-20 font-serif absolute top-8 left-8">"</span>
                    <h3 className="text-xl md:text-3xl font-bold italic text-foreground leading-snug relative z-10">
                        {results.summary.split('.')[0]}. The journey of a thousand miles begins with this step.
                    </h3>

                    <div className="h-px w-24 bg-primary/30 mx-auto" />

                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black opacity-60 leading-relaxed">
                            AI-generated roadmap for informational purposes. <br className="hidden md:block" />
                            Always cross-reference with official migration portals.
                        </p>

                        <Button variant="outline" asChild className="rounded-full px-10 h-12 border-primary/20 hover:bg-primary/5 hover:border-primary transition-all">
                            <button onClick={() => router.push("/")}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
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
