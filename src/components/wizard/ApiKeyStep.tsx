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

type ApiKeyValues = z.infer<typeof apiKeySchema>;

export function ApiKeyStep() {
    const { formData, setFormData, nextStep, prevStep, loadExampleProfile } = useFormStore();
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
                setTestMessage(data.message || "Model is working perfectly!");
            } else {
                setTestStatus('error');
                setTestMessage(data.message || "Test failed. Please check your key.");
            }
        } catch (err: any) {
            setTestStatus('error');
            setTestMessage("Network error during test.");
        }
    };

    const onSubmit = (data: ApiKeyValues) => {
        // If they provided a custom key but didn't test it successfully, warn them
        if (enteredKey && testStatus !== 'success') {
            setTestStatus('error');
            setTestMessage("Please test and save your credentials before proceeding, or clear the key to use the default.");
            return;
        }
        setFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <Key className="h-5 w-5 text-primary" />
                    <Label className="text-xl font-bold">AI Configuration</Label>
                </div>

                <div className="p-4 rounded-2xl border bg-primary/5 dark:bg-primary/10 border-primary/20 space-y-3 text-sm">
                    <p className="font-medium text-primary flex items-center gap-2">
                        <Sparkles className="h-4 w-4" /> Default Free Access
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        By default, we use a <strong>free Gemini 2.5 Flash</strong> module. You don't need to provide a key to get started.
                        If you want better output, please select your module, add your API key, and click Test & Save.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Select AI Company</Label>
                        <Select
                            onValueChange={(val: any) => {
                                setValue("aiProvider", val);
                                setTestStatus('idle'); // Reset test status on change
                            }}
                            value={selectedProvider}
                        >
                            <SelectTrigger className="bg-white/50 dark:bg-slate-900/50">
                                <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                            <SelectContent>
                                {AI_PROVIDERS.map((p) => (
                                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Select Model</Label>
                        <Select
                            onValueChange={(val: any) => {
                                setValue("aiModel", val);
                                setTestStatus('idle'); // Reset test status on change
                            }}
                            value={selectedModel}
                        >
                            <SelectTrigger className="bg-white/50 dark:bg-slate-900/50">
                                <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                                {AI_PROVIDERS.find(p => p.id === selectedProvider)?.models.map((m) => (
                                    <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="apiKey">API Key (Optional)</Label>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Secure Browser Storage</p>
                    </div>
                    <div className="relative">
                        <Input
                            id="apiKey"
                            type="password"
                            placeholder={selectedProvider === 'google' ? "AIza..." : "sk-..."}
                            className={cn("pr-10 bg-white/50 dark:bg-slate-900/50", errors.apiKey ? "border-destructive" : "")}
                            {...register("apiKey")}
                            onChange={(e) => {
                                register("apiKey").onChange(e);
                                setTestStatus('idle');
                            }}
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>

                {/* Test Feedback Area */}
                <div className="flex flex-col gap-4">
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-full h-12 text-base font-bold shadow-lg"
                        disabled={testStatus === 'testing'}
                        onClick={handleTest}
                    >
                        {testStatus === 'testing' ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying Connection...</>
                        ) : (
                            "Test & Save Configuration"
                        )}
                    </Button>

                    {testStatus !== 'idle' && (
                        <div className={cn(
                            "p-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in-95",
                            testStatus === 'success' ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-destructive/10 text-destructive border border-destructive/20"
                        )}>
                            {testStatus === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                            <p className="text-sm font-medium">{testMessage}</p>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center pt-2">
                    <Button type="button" variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary" onClick={() => {
                        loadExampleProfile();
                        setTestStatus('idle');
                    }}>
                        <Sparkles className="h-3 w-3 mr-2" /> Auto-fill with example profile
                    </Button>
                </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-white/10">
                <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                    type="submit"
                    className="px-10 btn-premium"
                    disabled={testStatus !== 'success' && !!enteredKey}
                >
                    Continue & Review
                </Button>
            </div>
        </form>
    );
}

