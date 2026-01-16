"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { useTranslation } from "@/context/LanguageContext";

interface StepIndicatorProps {
    currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
    const { t, dir } = useTranslation();

    const STEPS = [
        t.wizard.steps.basic,
        t.wizard.steps.goal,
        t.wizard.steps.education,
        t.wizard.steps.work,
        t.wizard.steps.preferences,
        t.wizard.steps.documents,
        t.wizard.steps.ai,
        t.wizard.steps.review
    ];

    const progress = (currentStep / (STEPS.length - 1)) * 100;

    return (
        <div className="w-full mb-16 relative pt-4">
            <div className={cn("flex justify-between items-center relative px-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 rounded-full" />

                {/* Animated Progress Line */}
                <motion.div
                    className={cn(
                        "absolute top-1/2 h-1 bg-primary -translate-y-1/2 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] z-0",
                        dir === 'rtl' ? 'right-0' : 'left-0'
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {STEPS.map((label, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center gap-3 relative z-10">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.2 : 1,
                                    backgroundColor: isCompleted || isActive ? "var(--primary)" : "var(--background)",
                                    borderColor: isCompleted || isActive ? "var(--primary)" : "var(--border)",
                                }}
                                className={cn(
                                    "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all shadow-lg",
                                    isActive && "shadow-primary/40 ring-4 ring-primary/20",
                                    !isActive && !isCompleted && "text-muted-foreground",
                                    (isActive || isCompleted) && "text-primary-foreground font-extrabold"
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="h-5 w-5" strokeWidth={3} />
                                ) : (
                                    index + 1
                                )}
                            </motion.div>

                            {/* Label */}
                            <span className={cn(
                                "absolute -bottom-10 text-[10px] md:text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300",
                                isActive ? "text-primary scale-110 translate-y-1" : "text-muted-foreground/60"
                            )}>
                                {label}
                            </span>

                            {/* Active Ring */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-ring"
                                    className="absolute inset-[-4px] border-2 border-primary/20 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
