"use client";

import { useState } from "react";
import { Pathway } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ChevronDown,
    ChevronUp,
    Clock,
    Coins,
    CheckCircle2,
    AlertTriangle,
    ExternalLink,
    ClipboardCheck,
    Target,
    FileText,
    ListOrdered,
    Flag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

import { useTranslation } from "@/context/LanguageContext";

interface PathwayCardProps {
    pathway: Pathway;
    index: number;
}

export function PathwayCard({ pathway, index }: PathwayCardProps) {
    const [isExpanded, setIsExpanded] = useState(index === 0);
    const { t, dir, language } = useTranslation();

    const difficultyColor = {
        Easy: "bg-green-500/10 text-green-500 border-green-500/20",
        Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        Hard: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    // Helper to get country emoji from title
    const getCountryFlag = (title: string) => {
        const countries: Record<string, string> = {
            "Canada": "🇨🇦", "كندا": "🇨🇦", "France": "🇫🇷", "فرنسا": "🇫🇷",
            "Germany": "🇩🇪", "ألمانيا": "🇩🇪", "Australia": "🇦🇺", "أستراليا": "🇦🇺",
            "USA": "🇺🇸", "الولايات المتحدة": "🇺🇸", "UK": "🇬🇧", "المملكة المتحدة": "🇬🇧",
            "Spain": "🇪🇸", "إسبانيا": "🇪🇸", "Portugal": "🇵🇹", "البرتغال": "🇵🇹",
            "Japan": "🇯🇵", "اليابان": "🇯🇵", "Netherlands": "🇳🇱", "هولندا": "🇳🇱",
            "Belgium": "🇧🇪", "بلجيكا": "🇧🇪", "Denmark": "🇩🇰", "الدنمارك": "🇩🇰",
            "Sweden": "🇸🇪", "السويد": "🇸🇪", "Norway": "🇳🇴", "النرويج": "🇳🇴",
            "Finland": "🇫🇮", "فنلندا": "🇫🇮", "Ireland": "🇮🇪", "أيرلندا": "🇮🇪",
            "New Zealand": "🇳🇿", "نيوزيلندا": "🇳🇿", "Austria": "🇦🇹", "النمسا": "🇦🇹",
            "Italy": "🇮🇹", "إيطاليا": "🇮🇹", "Switzerland": "🇨🇭", "سويسرا": "🇨🇭",
        };
        const found = Object.keys(countries).find(c => title.toLowerCase().includes(c.toLowerCase()));
        return found ? countries[found] : "🌍";
    };

    return (
        <Card className={cn(
            "overflow-hidden transition-all duration-500 border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl relative group",
            isExpanded ? "ring-2 ring-primary/20 shadow-primary/10" : "hover:bg-primary/5 lg:hover:translate-x-2"
        )}>
            {/* Background Accent */}
            <div className={cn("absolute top-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -z-10", dir === 'rtl' ? 'left-0' : 'right-0')} />

            <CardHeader
                className="cursor-pointer select-none p-5 md:p-10"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className={cn("flex flex-col md:flex-row items-start justify-between gap-4 md:gap-6", dir === 'rtl' ? 'md:flex-row-reverse' : '')}>
                    <div className={cn("space-y-6 flex-1 w-full", dir === 'rtl' ? 'text-right' : 'text-left')}>
                        <div className={cn("flex items-center gap-2 flex-wrap", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                            <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/20 text-primary font-black uppercase text-[8px] md:text-[10px] tracking-widest bg-primary/5">
                                {language === 'ar' ? `الخيار #${index + 1}` : `Option #${index + 1}`}
                            </Badge>
                            <Badge className={cn("px-3 py-1 rounded-full font-bold border text-[10px] md:text-sm", difficultyColor[pathway.difficulty as keyof typeof difficultyColor] || difficultyColor.Medium)}>
                                {t.results.pathway.difficulty}: {pathway.difficulty}
                            </Badge>
                            <div className={cn("flex items-center gap-4 text-xs md:text-sm font-bold text-muted-foreground/80", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                <span className={cn("flex items-center gap-1.5", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                    <Clock className="h-4 w-4 text-primary" /> {pathway.timeline}
                                </span>
                                <span className={cn("flex items-center gap-1.5", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                    <Coins className="h-4 w-4 text-primary" /> {pathway.estimated_cost}
                                </span>
                            </div>
                        </div>
                        <div className={cn("flex items-center gap-3 md:gap-5", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                            <div className="text-4xl md:text-6xl filter drop-shadow-lg scale-110 md:scale-125 hover:scale-150 transition-transform duration-500 cursor-default">
                                {getCountryFlag(pathway.title)}
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">{pathway.title}</CardTitle>
                                <CardDescription className={cn("flex items-center gap-2 text-primary font-bold text-lg md:text-xl", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                    <Target className="h-5 w-5 animate-pulse shrink-0" /> {t.results.pathway.bestFor}: {pathway.best_for}
                                </CardDescription>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl hover:bg-primary/10 transition-transform duration-300 self-end md:self-start" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
                        <ChevronDown className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    </Button>
                </div>
            </CardHeader>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <CardContent className="px-5 md:px-8 pb-8 md:pb-10 space-y-8 md:space-y-10">
                            <Separator className="bg-white/5" />

                            {/* Steps */}
                            <section className="space-y-4 md:space-y-6">
                                <h4 className={cn("font-black flex items-center gap-3 text-lg md:text-xl uppercase tracking-tighter", dir === 'rtl' ? 'flex-row-reverse text-right' : '')}>
                                    <ListOrdered className="h-5 w-5 md:h-6 md:w-6 text-primary" /> {t.results.pathway.steps}
                                </h4>
                                <div className={cn("space-y-4 md:space-y-6 ml-3", dir === 'rtl' ? 'pr-4 border-r-4 border-l-0 border-primary/20 mr-3 ml-0' : 'pl-4 border-l-4 border-primary/20')}>
                                    {pathway.steps.map((step, i) => (
                                        <div key={i} className={cn("relative group", dir === 'rtl' ? 'pr-6 md:pr-8 pl-0' : 'pl-6 md:pl-8')}>
                                            <div className={cn("absolute top-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-background border-2 md:border-4 border-primary flex items-center justify-center text-xs md:text-sm font-black shadow-lg shadow-primary/20", dir === 'rtl' ? 'right-[-22px]' : 'left-[-22px]')}>
                                                {i + 1}
                                            </div>
                                            <p className={cn("text-base md:text-lg font-medium leading-relaxed pt-0.5 md:pt-1", dir === 'rtl' ? 'text-right' : 'text-left')}>{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-left">
                                {/* Requirements & Documents */}
                                <div className="space-y-6 md:space-y-8">
                                    <section className={cn("space-y-3 md:space-y-4 p-5 md:p-6 rounded-2xl md:rounded-3xl bg-green-500/5 border border-green-500/10", dir === 'rtl' ? 'text-right' : 'text-left')}>
                                        <h4 className={cn("font-extrabold flex items-center gap-3 text-green-600 text-sm md:text-base", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                            <ClipboardCheck className="h-5 w-5 md:h-6 md:w-6" /> {t.results.pathway.requirements}
                                        </h4>
                                        <ul className="space-y-2 md:space-y-3">
                                            {pathway.requirements.map((req, i) => (
                                                <li key={i} className={cn("text-xs md:text-sm font-bold flex items-start gap-2 md:gap-3", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 shrink-0 mt-0.5" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section className={cn("space-y-3 md:space-y-4 p-5 md:p-6 rounded-2xl md:rounded-3xl bg-blue-500/5 border border-blue-500/10", dir === 'rtl' ? 'text-right' : 'text-left')}>
                                        <h4 className={cn("font-extrabold flex items-center gap-3 text-blue-600 text-sm md:text-base", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                            <FileText className="h-5 w-5 md:h-6 md:w-6" /> {t.results.pathway.documents}
                                        </h4>
                                        <ul className="space-y-2 md:space-y-3">
                                            {pathway.documents.map((doc, i) => (
                                                <li key={i} className={cn("text-xs md:text-sm font-bold flex items-start gap-2 md:gap-3 text-foreground/80", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                                    <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-blue-500 shrink-0 mt-1.5 md:mt-2 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                                    {doc}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>

                                {/* Warnings & Links */}
                                <div className="space-y-6 md:space-y-8">
                                    <section className={cn("space-y-3 md:space-y-4 p-5 md:p-6 rounded-2xl md:rounded-3xl bg-amber-500/5 border border-amber-500/10", dir === 'rtl' ? 'text-right' : 'text-left')}>
                                        <h4 className={cn("font-extrabold flex items-center gap-3 text-amber-600 text-sm md:text-base", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                            <AlertTriangle className="h-5 w-5 md:h-6 md:w-6" /> {t.results.pathway.warnings}
                                        </h4>
                                        <div className="space-y-2 md:space-y-3">
                                            {pathway.warnings.map((warning, i) => (
                                                <div key={i} className="text-[11px] md:text-sm font-bold bg-white/50 dark:bg-amber-950/20 p-3 md:p-4 rounded-xl md:rounded-2xl border border-amber-500/20 text-amber-800 dark:text-amber-400">
                                                    {warning}
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className={cn("space-y-3 md:space-y-4", dir === 'rtl' ? 'text-right' : 'text-left')}>
                                        <h4 className="font-black text-lg md:text-xl uppercase tracking-tighter">{t.results.pathway.officialLinks}</h4>
                                        <div className="flex flex-col gap-2 md:gap-3">
                                            {pathway.official_links.map((link, i) => (
                                                <Button key={i} variant="outline" className={cn("justify-between h-auto py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl border-primary/20 hover:bg-primary/10 hover:border-primary transition-all group", dir === 'rtl' ? 'flex-row-reverse' : '')} asChild>
                                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                        <span className={cn("truncate mr-4 font-black text-primary uppercase text-[10px] md:text-xs tracking-widest", dir === 'rtl' ? 'mr-0 ml-4' : '')}>{link.label}</span>
                                                        <ExternalLink className={cn("h-4 w-4 md:h-5 md:w-5 shrink-0 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform", dir === 'rtl' ? 'group-hover:-translate-x-1' : '')} />
                                                    </a>
                                                </Button>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
