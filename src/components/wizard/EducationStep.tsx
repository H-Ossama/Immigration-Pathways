import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationSchema } from "@/lib/validations";
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
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { EDUCATION_LEVELS } from "@/lib/constants";

import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type EducationValues = z.infer<typeof educationSchema>;

export function EducationStep() {
    const { formData, setFormData, nextStep, prevStep } = useFormStore();
    const { t, dir } = useTranslation();

    const EDUCATION_LABELS: Record<string, string> = {
        'High School': t.wizard.education.levels.highSchool,
        'Bachelor': t.wizard.education.levels.bachelor,
        'Master': t.wizard.education.levels.master,
        'PhD': t.wizard.education.levels.phd,
    };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EducationValues>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            educationLevel: formData.educationLevel,
            fieldOfStudy: formData.fieldOfStudy,
            gpa: formData.gpa,
            certificates: formData.certificates,
        },
    });

    const educationLevel = watch("educationLevel");

    const onSubmit = (data: EducationValues) => {
        setFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", dir === 'rtl' ? 'text-right' : 'text-left')}>
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="educationLevel" className="font-bold">{t.wizard.education.level}</Label>
                    <Select
                        onValueChange={(val: any) => setValue("educationLevel", val, { shouldValidate: true })}
                        defaultValue={educationLevel}
                    >
                        <SelectTrigger id="educationLevel" className={cn(errors.educationLevel ? "border-destructive" : "", "rounded-xl py-6 font-medium")}>
                            <SelectValue placeholder={t.wizard.education.level} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border/50 shadow-2xl">
                            {EDUCATION_LEVELS.map((level) => (
                                <SelectItem key={level} value={level} className="rounded-lg font-medium p-3">
                                    {EDUCATION_LABELS[level]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.educationLevel && (
                        <p className="text-sm text-destructive font-black tracking-tight">{errors.educationLevel.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy" className="font-bold">{t.wizard.education.field}</Label>
                    <Input
                        id="fieldOfStudy"
                        placeholder={t.wizard.education.fieldPlaceholder}
                        {...register("fieldOfStudy")}
                        className={cn(errors.fieldOfStudy ? "border-destructive" : "", "rounded-xl py-6 font-medium")}
                    />
                    {errors.fieldOfStudy && (
                        <p className="text-sm text-destructive font-black tracking-tight">{errors.fieldOfStudy.message}</p>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="gpa" className="font-bold">{t.wizard.education.gpa}</Label>
                        <Input
                            id="gpa"
                            placeholder="e.g. 3.5/4.0"
                            {...register("gpa")}
                            className="rounded-xl py-6 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="certificates" className="font-bold">
                            {dir === 'rtl' ? 'الشهادات ذات الصلة (اختياري)' : 'Relevant Certificates (Optional)'}
                        </Label>
                        <Input
                            id="certificates"
                            placeholder="e.g. AWS Certified, IELTS 7.5"
                            {...register("certificates")}
                            className="rounded-xl py-6 font-medium"
                        />
                    </div>
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
