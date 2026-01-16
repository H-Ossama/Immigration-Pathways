"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/context/LanguageContext';

import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { language, t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (!mounted) {
        return (
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="h-8 w-32 bg-muted animate-pulse rounded" />
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <Compass className="h-8 w-8 text-primary transition-transform duration-500 group-hover:rotate-180" />
                            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse-glow" />
                        </div>
                        <span className="text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70">
                            Immigration<span className="text-primary italic">Pathways</span>
                        </span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/about"
                        className="text-sm font-semibold text-muted-foreground/80 transition-all hover:text-primary relative group py-2"
                    >
                        {t.nav.about}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                    <Link
                        href="/privacy"
                        className="text-sm font-semibold text-muted-foreground/80 transition-all hover:text-primary relative group py-2"
                    >
                        {t.nav.privacy}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>

                    <div className="flex items-center gap-2 border-l border-white/10 pl-6 ml-2">
                        <LanguageSwitcher />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-primary/10 transition-colors"
                            onClick={toggleTheme}
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            <span className="sr-only">Theme</span>
                        </Button>
                    </div>

                    <Button asChild className="btn-premium px-6 py-2 h-10 ml-2">
                        <Link href="/start">{t.nav.startNow}</Link>
                    </Button>
                </nav>

                {/* Mobile Controls */}
                <div className="flex md:hidden items-center gap-2">
                    <LanguageSwitcher />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-lg animate-in slide-in-from-top-2 duration-200">
                    <nav className="container mx-auto flex flex-col px-4 py-4 gap-2">
                        <Link
                            href="/about"
                            className="text-lg font-semibold text-muted-foreground/80 transition-all hover:text-primary hover:bg-primary/5 px-4 py-3 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t.nav.about}
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-lg font-semibold text-muted-foreground/80 transition-all hover:text-primary hover:bg-primary/5 px-4 py-3 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t.nav.privacy}
                        </Link>
                        <div className="border-t border-white/10 my-2" />
                        <Button asChild className="btn-premium w-full h-12 text-lg">
                            <Link href="/start" onClick={() => setIsMenuOpen(false)}>{t.nav.startNow}</Link>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
