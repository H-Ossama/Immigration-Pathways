"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <Compass className="h-8 w-8 text-primary transition-transform duration-500 group-hover:rotate-180" />
                            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse-glow" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70">
                            Immigration<span className="text-primary italic">Pathways</span>
                        </span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    {['About', 'Privacy'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-sm font-semibold text-muted-foreground/80 transition-all hover:text-primary relative group py-2"
                        >
                            {item}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Button asChild className="btn-premium px-6 py-2 h-10">
                        <Link href="/start">Start Now</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-primary/10"
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
                        {['About', 'Privacy'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-lg font-semibold text-muted-foreground/80 transition-all hover:text-primary hover:bg-primary/5 px-4 py-3 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="border-t border-white/10 my-2" />
                        <Button asChild className="btn-premium w-full h-12 text-lg">
                            <Link href="/start" onClick={() => setIsMenuOpen(false)}>Start Now</Link>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
