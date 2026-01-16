import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workExperienceSchema } from "@/lib/validations";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";

import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type WorkValues = z.infer<typeof workExperienceSchema>;

export function WorkExperienceStep() {
    const { formData, setFormData, nextStep, prevStep } = useFormStore();
    const { t, dir } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkValues>({
        resolver: zodResolver(workExperienceSchema),
        defaultValues: {
            yearsOfExperience: formData.yearsOfExperience,
            jobTitle: formData.jobTitle,
            skills: formData.skills,
            portfolio: formData.portfolio,
        },
    });

    const onSubmit = (data: WorkValues) => {
        setFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", dir === 'rtl' ? 'text-right' : 'text-left')}>
            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="jobTitle" className="font-bold">{t.wizard.work.titleLabel}</Label>
                        <Input
                            id="jobTitle"
                            placeholder={t.wizard.work.titlePlaceholder}
                            {...register("jobTitle")}
                            className={cn(errors.jobTitle ? "border-destructive" : "", "rounded-xl py-6 font-medium")}
                        />
                        {errors.jobTitle && (
                            <p className="text-sm text-destructive font-black tracking-tight">{errors.jobTitle.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yearsOfExperience" className="font-bold">{t.wizard.work.years}</Label>
                        <Input
                            id="yearsOfExperience"
                            type="number"
                            placeholder="e.g. 3"
                            {...register("yearsOfExperience")}
                            className={cn(errors.yearsOfExperience ? "border-destructive" : "", "rounded-xl py-6 font-medium")}
                        />
                        {errors.yearsOfExperience && (
                            <p className="text-sm text-destructive font-black tracking-tight">{errors.yearsOfExperience.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="skills" className="font-bold">{t.wizard.work.skills}</Label>
                    <Textarea
                        id="skills"
                        placeholder={t.wizard.work.skillsPlaceholder}
                        className={cn("min-h-[120px] rounded-2xl p-4 font-medium leading-relaxed", errors.skills ? "border-destructive" : "")}
                        {...register("skills")}
                    />
                    {errors.skills && (
                        <p className="text-sm text-destructive font-black tracking-tight">{errors.skills.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="portfolio" className="font-bold">
                        {dir === 'rtl' ? 'رابط الملف الشخصي أو LinkedIn (اختياري)' : 'Portfolio or LinkedIn URL (Optional)'}
                    </Label>
                    <Input
                        id="portfolio"
                        placeholder="https://linkedin.com/in/username"
                        {...register("portfolio")}
                        className={cn(errors.portfolio ? "border-destructive" : "", "rounded-xl py-6 font-medium")}
                    />
                    {errors.portfolio && (
                        <p className="text-sm text-destructive font-black tracking-tight">{errors.portfolio.message}</p>
                    )}
                </div>
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

