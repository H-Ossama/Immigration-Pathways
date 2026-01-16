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

type PreferencesValues = z.infer<typeof preferencesSchema>;

export function PreferencesStep() {
    const { formData, setFormData, nextStep, prevStep } = useFormStore();

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
                <Label className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Target Countries (Select Multiple)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[200px] overflow-y-auto p-4 border rounded-lg bg-muted/20">
                    {COUNTRIES.map((country) => (
                        <div key={country} className="flex items-center space-x-2">
                            <Checkbox
                                id={`country-${country}`}
                                checked={selectedCountries.includes(country)}
                                onCheckedChange={() => toggleCountry(country)}
                            />
                            <label htmlFor={`country-${country}`} className="text-sm font-medium cursor-pointer">
                                {country}
                            </label>
                        </div>
                    ))}
                </div>
                {errors.targetCountries && (
                    <p className="text-sm text-destructive">{errors.targetCountries.message}</p>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <Label className="text-base flex items-center gap-2">
                        <Coins className="h-4 w-4 text-primary" /> Budget Range
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                        {BUDGET_RANGES.map((b) => (
                            <Button
                                key={b}
                                type="button"
                                variant={selectedBudget === b ? "default" : "outline"}
                                className="w-full"
                                onClick={() => setValue("budget", b, { shouldValidate: true })}
                            >
                                {b}
                            </Button>
                        ))}
                    </div>
                    {errors.budget && (
                        <p className="text-sm text-destructive">{errors.budget.message}</p>
                    )}
                </div>

                <div className="space-y-4">
                    <Label className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" /> Timeframe
                    </Label>
                    <Select
                        onValueChange={(val: any) => setValue("timeframe", val, { shouldValidate: true })}
                        defaultValue={selectedTimeframe}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="When do you want to move?" />
                        </SelectTrigger>
                        <SelectContent>
                            {TIMEFRAMES.map((t) => (
                                <SelectItem key={t} value={t}>
                                    {t}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.timeframe && (
                        <p className="text-sm text-destructive">{errors.timeframe.message}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2">
                        <Languages className="h-4 w-4 text-primary" /> Willing to learn a new language?
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        This expands your opportunities in countries like Germany, France, or Japan.
                    </p>
                </div>
                <Checkbox
                    className="h-6 w-6"
                    checked={willingToLearn}
                    onCheckedChange={(checked) => setValue("willingToLearnLanguage", !!checked)}
                />
            </div>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit">Next Step</Button>
            </div>
        </form>
    );
}
