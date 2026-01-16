import { Info, HelpCircle, AlertTriangle, Lightbulb } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl border-none">About Immigration Pathways</h1>
                    <p className="text-muted-foreground md:text-xl">Empowering your global journey with AI-driven insights.</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Lightbulb className="h-6 w-6 text-yellow-500" />
                        Our Mission
                    </h2>
                    <p>
                        The world is full of opportunities, but navigating immigration laws and pathways can be overwhelming.
                        Immigration Pathways was built to bridge the gap between complex government regulations and
                        individuals seeking a better future abroad.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <HelpCircle className="h-6 w-6 text-blue-500" />
                        How it works
                    </h2>
                    <p>
                        Our tool uses advanced AI to analyze your profile—background, education, skills, and goals—and
                        cross-references them with known immigration programs worldwide. By providing your own API key,
                        you get access to state-of-the-art analysis while maintaining full control over your credentials.
                    </p>
                </section>

                <section className="p-6 border-2 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 rounded-xl space-y-3">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-amber-800 dark:text-amber-400">
                        <AlertTriangle className="h-5 w-5" />
                        Disclaimer
                    </h2>
                    <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed">
                        <strong>Not Legal Advice:</strong> This application provides general information and guidance based on available data.
                        It does not constitute legal advice. Immigration laws are subject to change, and we strongly recommend
                        consulting with authorized immigration consultants or legal professionals before making any firm decisions.
                        Always refer to official government websites for the most up-to-date and accurate information.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Open & Transparent</h2>
                    <p>
                        We believe in transparency. This tool doesn't hide information behind paywalls or complex agreements.
                        It is a free-to-use assistant for anyone willing to take the first step towards a new life.
                    </p>
                </section>
            </div>
        </div>
    );
}
