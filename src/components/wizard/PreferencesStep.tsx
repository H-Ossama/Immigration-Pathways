import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preferencesSchema } from "@/lib/validations";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ArrowLeft, Coins, Clock, MapPin, Languages } from "lucide-react";
import { z } from "zod";
import { COUNTRIES, BUDGET_RANGES, TIMEFRAMES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { useTranslation } from "@/context/LanguageContext";

type PreferencesValues = z.infer<typeof preferencesSchema>;

export function PreferencesStep() {
    const { formData, setFormData, nextStep, prevStep } = useFormStore();
    const { t, dir } = useTranslation();

    const BUDGET_LABELS: Record<string, string> = {
        'Low': t.wizard.preferences.budgetLabels.low,
        'Medium': t.wizard.preferences.budgetLabels.medium,
        'High': t.wizard.preferences.budgetLabels.high,
    };

    const TIMEFRAME_LABELS: Record<string, string> = {
        'ASAP': t.wizard.preferences.timeframeLabels.asap,
        '6 months': t.wizard.preferences.timeframeLabels.sixMonths,
        '1 year+': t.wizard.preferences.timeframeLabels.oneYear,
    };

    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PreferencesValues>({
        resolver: zodResolver(preferencesSchema),
        defaultValues: {
            targetCountries: formData.targetCountries,
            budget: formData.budget,
            timeframe: formData.timeframe,
            willingToLearnLanguage: formData.willingToLearnLanguage,
        },
    });

    const selectedCountries = watch("targetCountries") || [];
    const selectedBudget = watch("budget");
    const selectedTimeframe = watch("timeframe");
    const willingToLearn = watch("willingToLearnLanguage");

    const onSubmit = (data: PreferencesValues) => {
        setFormData(data);
        nextStep();
    };

    const toggleCountry = (country: string) => {
        const updated = selectedCountries.includes(country)
            ? selectedCountries.filter((c) => c !== country)
            : [...selectedCountries, country];
        setValue("targetCountries", updated, { shouldValidate: true });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-8", dir === 'rtl' ? 'text-right' : 'text-left')}>
            <div className="space-y-4">
                <Label className={cn("text-base flex items-center gap-2 font-bold", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                    <MapPin className="h-5 w-5 text-primary" /> {t.wizard.preferences.countries}
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-[180px] overflow-y-auto p-6 border border-border/50 rounded-2xl bg-muted/20 custom-scrollbar">
                    {COUNTRIES.map((country) => (
                        <div key={country} className={cn("flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer", dir === 'rtl' ? 'space-x-reverse' : '')}>
                            <Checkbox
                                id={`country-${country}`}
                                checked={selectedCountries.includes(country)}
                                onCheckedChange={() => toggleCountry(country)}
                            />
                            <label htmlFor={`country-${country}`} className="text-sm font-bold cursor-pointer flex-1">
                                {country}
                            </label>
                        </div>
                    ))}
                </div>
                {errors.targetCountries && (
                    <p className="text-sm text-destructive font-black">{errors.targetCountries.message}</p>
                )}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    <Label className={cn("text-base flex items-center gap-2 font-bold", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                        <Coins className="h-5 w-5 text-primary" /> {t.wizard.preferences.budget}
                    </Label>
                    <div className={cn("grid grid-cols-3 gap-3", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                        {(Object.keys(BUDGET_LABELS) as Array<keyof typeof BUDGET_LABELS>).map((b) => (
                            <Button
                                key={b}
                                type="button"
                                variant={selectedBudget === b ? "default" : "outline"}
                                className={cn(
                                    "w-full rounded-xl py-6 font-bold transition-all",
                                    selectedBudget === b ? "shadow-lg shadow-primary/20 scale-105" : "hover:bg-primary/5"
                                )}
                                onClick={() => setValue("budget", b as any, { shouldValidate: true })}
                            >
                                {BUDGET_LABELS[b]}
                            </Button>
                        ))}
                    </div>
                    {errors.budget && (
                        <p className="text-sm text-destructive font-black">{errors.budget.message}</p>
                    )}
                </div>

                <div className="space-y-4">
                    <Label className={cn("text-base flex items-center gap-2 font-bold", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                        <Clock className="h-5 w-5 text-primary" /> {t.wizard.preferences.timeframe}
                    </Label>
                    <Select
                        onValueChange={(val: any) => setValue("timeframe", val, { shouldValidate: true })}
                        defaultValue={selectedTimeframe}
                    >
                        <SelectTrigger className="rounded-xl py-6 font-bold border-border/50">
                            <SelectValue placeholder={t.wizard.preferences.timeframe} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border/50 shadow-2xl">
                            {TIMEFRAMES.map((tf) => (
                                <SelectItem key={tf} value={tf} className="rounded-lg font-medium p-3">
                                    {TIMEFRAME_LABELS[tf]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.timeframe && (
                        <p className="text-sm text-destructive font-black">{errors.timeframe.message}</p>
                    )}
                </div>
            </div>

            <div className={cn("flex items-center justify-between p-6 border border-primary/10 rounded-[1.5rem] bg-primary/5 backdrop-blur-md", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                <div className={cn("space-y-1", dir === 'rtl' ? 'text-right' : 'text-left')}>
                    <Label className={cn("text-base flex items-center gap-2 font-black", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                        <Languages className="h-5 w-5 text-primary" /> {t.wizard.preferences.willingToLearn}
                    </Label>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed max-w-sm">
                        {t.wizard.preferences.languageNote}
                    </p>
                </div>
                <Checkbox
                    className="h-8 w-8 rounded-lg border-2 border-primary/20 bg-background"
                    checked={willingToLearn}
                    onCheckedChange={(checked) => setValue("willingToLearnLanguage", !!checked)}
                />
            </div>

            <div className={cn("flex justify-between pt-8 items-center", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                <Button type="button" variant="ghost" onClick={prevStep} className="rounded-xl px-6 font-bold hover:bg-primary/5">
                    {dir === 'rtl' ? <ArrowLeft className="ml-2 h-4 w-4 rotate-180" /> : <ArrowLeft className="mr-2 h-4 w-4" />}
                    {t.wizard.back}
                </Button>
                <Button type="submit" className="rounded-2xl px-12 py-7 font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                    {t.wizard.next}
                </Button>
            </div>
        </form>
    );
}
