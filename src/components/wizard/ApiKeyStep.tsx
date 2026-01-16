"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiKeySchema } from "@/lib/validations";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ArrowLeft, Key, Lock, Sparkles, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { AI_PROVIDERS, DEFAULT_FREE_KEY } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { useTranslation } from "@/context/LanguageContext";

type ApiKeyValues = z.infer<typeof apiKeySchema>;

export function ApiKeyStep() {
    const { formData, setFormData, nextStep, prevStep, loadExampleProfile } = useFormStore();
    const { t, dir } = useTranslation();
    const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
    const [testMessage, setTestMessage] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ApiKeyValues>({
        resolver: zodResolver(apiKeySchema),
        defaultValues: {
            apiKey: formData.apiKey || "",
            aiProvider: formData.aiProvider || "google",
            aiModel: formData.aiModel || "gemini-2.5-flash",
        },
    });

    const selectedProvider = watch("aiProvider");
    const selectedModel = watch("aiModel");
    const enteredKey = watch("apiKey");

    // Reset model if provider changes
    useEffect(() => {
        const provider = AI_PROVIDERS.find(p => p.id === selectedProvider);
        if (provider) {
            // Check if current model belongs to this provider
            const modelExists = provider.models.some(m => m.id === selectedModel);
            if (!modelExists) {
                setValue("aiModel", provider.models[0].id);
            }
        }
    }, [selectedProvider, setValue, selectedModel]);

    const handleTest = async () => {
        setTestStatus('testing');
        setTestMessage('');

        try {
            const response = await fetch("/api/test-ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    apiKey: enteredKey || DEFAULT_FREE_KEY,
                    provider: selectedProvider,
                    model: selectedModel,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setTestStatus('success');
                setTestMessage(t.wizard.ai.working);
            } else {
                setTestStatus('error');
                setTestMessage(t.wizard.ai.testFailed);
            }
        } catch (err: any) {
            setTestStatus('error');
            setTestMessage(t.wizard.ai.networkError);
        }
    };

    const onSubmit = (data: ApiKeyValues) => {
        // If they provided a custom key but didn't test it successfully, warn them
        if (enteredKey && testStatus !== 'success') {
            setTestStatus('error');
            setTestMessage(dir === 'rtl' ? 'يرجى اختبار وحفظ بيانات الاعتماد الخاصة بك قبل المتابعة، أو مسح المفتاح لاستخدام الإعداد الافتراضي.' : "Please test and save your credentials before proceeding, or clear the key to use the default.");
            return;
        }
        setFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", dir === 'rtl' ? 'text-right' : 'text-left')}>
            <div className="space-y-6">
                <div className={cn("flex items-center gap-2 mb-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                    <Key className="h-6 w-6 text-primary" />
                    <Label className="text-xl font-bold">{t.wizard.ai.title}</Label>
                </div>

                <div className="p-6 rounded-[1.5rem] border bg-primary/5 dark:bg-primary/10 border-primary/20 space-y-3">
                    <p className={cn("font-black text-primary flex items-center gap-2 text-sm uppercase tracking-tighter", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                        <Sparkles className="h-4 w-4" /> {t.wizard.ai.freeAccess}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                        {t.wizard.ai.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="font-bold">{t.wizard.ai.company}</Label>
                        <Select
                            onValueChange={(val: any) => {
                                setValue("aiProvider", val);
                                setTestStatus('idle'); // Reset test status on change
                            }}
                            value={selectedProvider}
                        >
                            <SelectTrigger className="rounded-xl py-6 font-bold bg-white/50 dark:bg-slate-900/50 border-border/50">
                                <SelectValue placeholder={t.wizard.ai.company} />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-border/50 shadow-2xl">
                                {AI_PROVIDERS.map((p) => (
                                    <SelectItem key={p.id} value={p.id} className="rounded-lg font-medium p-3">{p.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold">{t.wizard.ai.model}</Label>
                        <Select
                            onValueChange={(val: any) => {
                                setValue("aiModel", val);
                                setTestStatus('idle'); // Reset test status on change
                            }}
                            value={selectedModel}
                        >
                            <SelectTrigger className="rounded-xl py-6 font-bold bg-white/50 dark:bg-slate-900/50 border-border/50">
                                <SelectValue placeholder={t.wizard.ai.model} />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-border/50 shadow-2xl">
                                {AI_PROVIDERS.find(p => p.id === selectedProvider)?.models.map((m) => (
                                    <SelectItem key={m.id} value={m.id} className="rounded-lg font-medium p-3">{m.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className={cn("flex justify-between items-center", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                        <Label htmlFor="apiKey" className="font-bold">{t.wizard.ai.apiKeyLabel}</Label>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{t.wizard.ai.secureStorage}</p>
                    </div>
                    <div className="relative group">
                        <Input
                            id="apiKey"
                            type="password"
                            placeholder={selectedProvider === 'google' ? t.wizard.ai.placeholderGoogle : t.wizard.ai.placeholderOpenAI}
                            className={cn(
                                "pr-10 rounded-xl py-6 font-medium bg-white/50 dark:bg-slate-900/50 transition-all focus:ring-2 focus:ring-primary/20",
                                errors.apiKey ? "border-destructive" : "border-border/50",
                                dir === 'rtl' ? 'pl-10 pr-4 text-right' : 'pr-10'
                            )}
                            {...register("apiKey")}
                            onChange={(e) => {
                                register("apiKey").onChange(e);
                                setTestStatus('idle');
                            }}
                        />
                        <Lock className={cn("absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors", dir === 'rtl' ? 'left-4' : 'right-4')} />
                    </div>
                </div>

                {/* Test Feedback Area */}
                <div className="flex flex-col gap-4">
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-full h-14 text-base font-black shadow-xl shadow-secondary/10 rounded-2xl glow-on-hover"
                        disabled={testStatus === 'testing'}
                        onClick={handleTest}
                    >
                        {testStatus === 'testing' ? (
                            <><Loader2 className={cn("h-5 w-5 animate-spin", dir === 'rtl' ? 'ml-2' : 'mr-2')} /> {t.wizard.ai.verifying}</>
                        ) : (
                            t.wizard.ai.testButton
                        )}
                    </Button>

                    {testStatus !== 'idle' && (
                        <div className={cn(
                            "p-5 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in-95 backdrop-blur-md",
                            testStatus === 'success' ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-destructive/10 text-destructive border border-destructive/20",
                            dir === 'rtl' ? 'flex-row-reverse' : ''
                        )}>
                            {testStatus === 'success' ? <CheckCircle2 className="h-6 w-6 shrink-0" /> : <XCircle className="h-6 w-6 shrink-0" />}
                            <p className="text-sm font-bold leading-tight">{testMessage}</p>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center pt-2">
                    <Button type="button" variant="ghost" size="sm" className="text-xs font-black text-muted-foreground hover:text-primary rounded-lg px-4" onClick={() => {
                        loadExampleProfile();
                        setTestStatus('idle');
                    }}>
                        <Sparkles className={cn("h-4 w-4 text-primary/60", dir === 'rtl' ? 'ml-2' : 'mr-2')} /> {t.wizard.ai.autoFill}
                    </Button>
                </div>
            </div>

            <div className={cn("flex justify-between pt-8 items-center border-t border-border/30", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                <Button type="button" variant="ghost" onClick={prevStep} className="rounded-xl px-6 font-bold hover:bg-primary/5">
                    {dir === 'rtl' ? <ArrowLeft className="ml-2 h-4 w-4 rotate-180" /> : <ArrowLeft className="mr-2 h-4 w-4" />}
                    {t.wizard.back}
                </Button>
                <Button
                    type="submit"
                    className="rounded-2xl px-12 py-7 font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                    disabled={testStatus !== 'success' && !!enteredKey}
                >
                    {t.wizard.continue}
                </Button>
            </div>
        </form>
    );
}

