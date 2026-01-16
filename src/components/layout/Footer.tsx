import Link from 'next/link';
import { Compass, Globe, Github, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-slate-50 dark:bg-[#020617] py-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-2 group">
                            <Compass className="h-6 w-6 text-primary transition-transform group-hover:rotate-45" />
                            <span className="text-xl font-bold tracking-tight">Immigration <span className="text-primary italic">Pathways</span></span>
                        </div>
                        <p className="text-muted-foreground text-sm max-w-sm font-medium leading-relaxed">
                            Empowering global explorers with AI-powered immigration roadmaps. Our goal is to make moving abroad transparent, accessible, and structured for everyone.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] text-primary">Company</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                            <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                        </nav>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] text-primary">Resources</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/start" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Start Assessment</Link>
                            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Documentation</Link>
                            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Official Links</Link>
                        </nav>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-muted-foreground/60 font-medium">
                        &copy; {new Date().getFullYear()} Immigration Pathways AI. Built for global connectivity.
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground/40 font-black uppercase tracking-widest">
                        <Globe className="h-3 w-3" />
                        <span>Data Secured Locally</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
