import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicInfoSchema } from "@/lib/validations";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LANGUAGES } from "@/lib/constants";
import { z } from "zod";

import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type BasicInfoValues = z.infer<typeof basicInfoSchema>;

export function BasicInfoStep() {
    const { formData, setFormData, nextStep } = useFormStore();
    const { t, dir } = useTranslation();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<BasicInfoValues>({
        resolver: zodResolver(basicInfoSchema),
        defaultValues: {
            nationality: formData.nationality,
            residence: formData.residence,
            age: formData.age,
            languages: formData.languages,
            maritalStatus: formData.maritalStatus,
        },
    });

    const selectedLanguages = watch("languages");

    const onSubmit = (data: BasicInfoValues) => {
        setFormData(data);
        nextStep();
    };

    const toggleLanguage = (lang: string) => {
        const current = selectedLanguages || [];
        const updated = current.includes(lang)
            ? current.filter((l) => l !== lang)
            : [...current, lang];
        setValue("languages", updated, { shouldValidate: true });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", dir === 'rtl' ? 'text-right' : 'text-left')}>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="nationality" className="font-bold">{t.wizard.basicInfo.nationality}</Label>
                    <Input
                        id="nationality"
                        placeholder="e.g. Morocco"
                        {...register("nationality")}
                        className={cn(errors.nationality ? "border-destructive" : "", "rounded-xl py-6 font-medium")}
                    />
                    {errors.nationality && (
                        <p className="text-sm text-destructive font-bold">{errors.nationality.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="residence" className="font-bold">{t.wizard.basicInfo.residence}</Label>
                    <Input
                        id="residence"
                        placeholder="e.g. Morocco"
                        {...register("residence")}
                        className={cn(errors.residence ? "border-destructive" : "", "rounded-xl py-6 font-medium")}
                    />
                    {errors.residence && (
                        <p className="text-sm text-destructive font-bold">{errors.residence.message}</p>
                    )}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="age" className="font-bold">{t.wizard.basicInfo.age}</Label>
                    <Input
                        id="age"
                        type="number"
                        placeholder="e.g. 25"
                        {...register("age")}
                        className={cn(errors.age ? "border-destructive" : "", "rounded-xl py-6 font-medium")}
                    />
                    {errors.age && (
                        <p className="text-sm text-destructive font-bold">{errors.age.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="maritalStatus" className="font-bold">
                        {dir === 'rtl' ? 'الحالة الاجتماعية (اختياري)' : 'Marital Status (Optional)'}
                    </Label>
                    <Input
                        id="maritalStatus"
                        placeholder="e.g. Single, Married"
                        {...register("maritalStatus")}
                        className="rounded-xl py-6 font-medium"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <Label className="font-bold">{t.wizard.basicInfo.languages}</Label>
                <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4 pt-1", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                    {LANGUAGES.map((lang) => (
                        <div key={lang} className={cn("flex items-center space-x-3 p-3 rounded-xl border border-border/50 hover:bg-primary/5 transition-colors cursor-pointer group", dir === 'rtl' ? 'space-x-reverse' : '')}>
                            <Checkbox
                                id={`lang-${lang}`}
                                checked={selectedLanguages?.includes(lang)}
                                onCheckedChange={() => toggleLanguage(lang)}
                                className="h-5 w-5 rounded-md"
                            />
                            <label
                                htmlFor={`lang-${lang}`}
                                className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                            >
                                {lang}
                            </label>
                        </div>
                    ))}
                </div>
                {errors.languages && (
                    <p className="text-sm text-destructive font-bold">{errors.languages.message}</p>
                )}
            </div>

            <div className={cn("flex pt-8", dir === 'rtl' ? 'justify-start' : 'justify-end')}>
                <Button type="submit" className="rounded-2xl px-12 py-7 font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                    {t.wizard.next}
                </Button>
            </div>
        </form>
    );
}
