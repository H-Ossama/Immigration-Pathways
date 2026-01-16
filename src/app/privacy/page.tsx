import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl border-none">Privacy Policy</h1>
                    <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Your Privacy is Our Priority</h2>
                    <p>
                        Immigration Pathways is designed with a privacy-first approach. We believe that your personal data and
                        credentials should remain under your control at all times.
                    </p>
                </section>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="p-6 border rounded-xl space-y-2 bg-muted/50">
                        <Lock className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">Local API Key Storage</h3>
                        <p className="text-sm text-muted-foreground">
                            Your AI API key is stored only in your browser's local storage. We never send it to our servers.
                        </p>
                    </div>
                    <div className="p-6 border rounded-xl space-y-2 bg-muted/50">
                        <ServerOff className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">No Database Storage</h3>
                        <p className="text-sm text-muted-foreground">
                            We do not use a database to store your personal profile information. Everything stays in your browser.
                        </p>
                    </div>
                    <div className="p-6 border rounded-xl space-y-2 bg-muted/50">
                        <EyeOff className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">No Tracking</h3>
                        <p className="text-sm text-muted-foreground">
                            We do not track your specific searches or the pathways generated. Your session is private.
                        </p>
                    </div>
                    <div className="p-6 border rounded-xl space-y-2 bg-muted/50">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <h3 className="font-bold">Secure AI Calls</h3>
                        <p className="text-sm text-muted-foreground">
                            API calls are made using your key directly to the AI provider. We act only as a bridge.
                        </p>
                    </div>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Information We Collect</h2>
                    <p>
                        The profile information you enter in the wizard (nationality, age, work experience, etc.) is processed
                        only to generate the AI prompt. It is not permanently stored anywhere outside of your local browser session.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">AI Usage</h2>
                    <p>
                        When you use this application, your data is sent to the AI provider (e.g., OpenAI) to generate your pathways.
                        By using your own API key, you are subject to that provider's privacy policy and terms of service.
                    </p>
                </section>
            </div>
        </div>
    );
}
