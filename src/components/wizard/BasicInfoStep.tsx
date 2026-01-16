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

type BasicInfoValues = z.infer<typeof basicInfoSchema>;

export function BasicInfoStep() {
    const { formData, setFormData, nextStep } = useFormStore();

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                        id="nationality"
                        placeholder="e.g. Morocco"
                        {...register("nationality")}
                        className={errors.nationality ? "border-destructive" : ""}
                    />
                    {errors.nationality && (
                        <p className="text-sm text-destructive">{errors.nationality.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="residence">Country of Residence</Label>
                    <Input
                        id="residence"
                        placeholder="e.g. Morocco"
                        {...register("residence")}
                        className={errors.residence ? "border-destructive" : ""}
                    />
                    {errors.residence && (
                        <p className="text-sm text-destructive">{errors.residence.message}</p>
                    )}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                        id="age"
                        type="number"
                        placeholder="e.g. 25"
                        {...register("age")}
                        className={errors.age ? "border-destructive" : ""}
                    />
                    {errors.age && (
                        <p className="text-sm text-destructive">{errors.age.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status (Optional)</Label>
                    <Input
                        id="maritalStatus"
                        placeholder="e.g. Single, Married"
                        {...register("maritalStatus")}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <Label>Languages You Speak</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                    {LANGUAGES.map((lang) => (
                        <div key={lang} className="flex items-center space-x-2">
                            <Checkbox
                                id={`lang-${lang}`}
                                checked={selectedLanguages?.includes(lang)}
                                onCheckedChange={() => toggleLanguage(lang)}
                            />
                            <label
                                htmlFor={`lang-${lang}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {lang}
                            </label>
                        </div>
                    ))}
                </div>
                {errors.languages && (
                    <p className="text-sm text-destructive">{errors.languages.message}</p>
                )}
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit">Next Step</Button>
            </div>
        </form>
    );
}
