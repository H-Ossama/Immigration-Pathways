"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslation } from '@/context/LanguageContext';

const GlobeScene = dynamic(() => import('@/components/globe/GlobeScene').then(mod => mod.GlobeScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
      <div className="h-32 w-32 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
    </div>
  )
});

export default function LandingPage() {
  const { t, dir } = useTranslation();

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full min-h-[90vh] flex items-center justify-center py-12 md:py-24 lg:py-32 relative overflow-hidden bg-white dark:bg-[#020617]">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-float" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-2s' }} />
        </div>

        <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className={`flex flex-col space-y-8 ${dir === 'rtl' ? 'text-right' : 'text-left'} max-w-2xl`}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 w-fit">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-primary">{t.hero.new}</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 dark:from-white dark:to-white/60">
                {t.hero.title} <span className="text-primary italic relative whitespace-nowrap">
                  {t.hero.profile}
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary/40" />
                  </svg>
                </span>
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl/relaxed lg:text-2xl/relaxed max-w-[600px] font-medium">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button asChild size="lg" className="btn-premium h-14 px-10 text-lg">
                  <Link href="/start" className="flex items-center gap-2">
                    {t.hero.startSearch} {dir === 'rtl' ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-primary/20 hover:bg-primary/5 backdrop-blur-sm transition-all" asChild>
                  <a href="#how-it-works">{t.hero.learnMore}</a>
                </Button>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground/80 font-medium">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px]" />
                  ))}
                </div>
                <span>{t.hero.trusted}</span>
              </div>
            </div>

            <div className="relative w-full overflow-visible">
              <GlobeScene />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-24 bg-slate-50 dark:bg-[#020617] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10" />

        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 dark:from-white dark:to-white/60">
              {t.howItWorks.title} <span className="text-primary italic">{t.howItWorks.future}</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl font-medium">
              {t.howItWorks.description}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {[
              {
                step: "1",
                title: t.howItWorks.step1.title,
                description: t.howItWorks.step1.description,
                icon: <Briefcase className="h-6 w-6" />
              },
              {
                step: "2",
                title: t.howItWorks.step2.title,
                description: t.howItWorks.step2.description,
                icon: <Zap className="h-6 w-6" />
              },
              {
                step: "3",
                title: t.howItWorks.step3.title,
                description: t.howItWorks.step3.description,
                icon: <Sparkles className="h-6 w-6" />
              }
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-blue-600 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
                <Card className="relative overflow-hidden border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 h-full p-8 rounded-3xl">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                    {item.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className={`space-y-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {t.features.title} <span className="text-primary underline underline-offset-8 decoration-primary/30">{t.features.aiGuidance}</span>
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed font-medium">
                {t.features.description}
              </p>

              <div className="grid gap-6">
                {(t.features.list as string[]).map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                      <CheckCircle2 className="h-5 w-5 text-green-500 group-hover:text-white" />
                    </div>
                    <span className="text-lg font-semibold">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full -z-10" />
              {[
                { label: t.features.categories.study, icon: <GraduationCap />, color: "bg-blue-500" },
                { label: t.features.categories.work, icon: <Briefcase />, color: "bg-emerald-500" },
                { label: t.features.categories.nomad, icon: <Globe2 />, color: "bg-indigo-500" },
                { label: t.features.categories.startups, icon: <Zap />, color: "bg-amber-500" }
              ].map((item, i) => (
                <div key={i} className="glass dark:glass-dark p-8 rounded-3xl flex flex-col items-center text-center space-y-4 hover:scale-105 transition-all duration-300 group">
                  <div className={`h-16 w-16 rounded-2xl ${item.color}/10 flex items-center justify-center text-white p-3 group-hover:scale-110 transition-transform`}>
                    <div className={item.color + " rounded-xl p-3 shadow-lg shadow-black/20"}>
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl">{item.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="glass dark:glass-dark rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tight sm:text-6xl text-gradient">
                {t.cta.title}
              </h2>
              <p className="text-muted-foreground text-xl md:text-2xl font-medium">
                {t.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <Button asChild size="lg" className="btn-premium h-16 px-12 text-xl rounded-full">
                  <Link href="/start">{t.cta.button}</Link>
                </Button>
                <Link href="/about" className="text-lg font-bold hover:underline underline-offset-8 decoration-primary/30 py-2">
                  {t.cta.successStories}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
