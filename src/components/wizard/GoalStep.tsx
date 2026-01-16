import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { goalSchema } from "@/lib/validations";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GOALS } from "@/lib/constants";
import { GraduationCap, Briefcase, Rocket, Users, ShieldAlert, Heart, ArrowLeft } from "lucide-react";
import { z } from "zod";

import { useTranslation } from "@/context/LanguageContext";

type GoalValues = z.infer<typeof goalSchema>;

const GOAL_ICONS: Record<string, any> = {
    Study: GraduationCap,
    Work: Briefcase,
    Both: Heart,
    Business: Rocket,
    Family: Users,
    Asylum: ShieldAlert,
};

export function GoalStep() {
    const { formData, setFormData, nextStep, prevStep } = useFormStore();
    const { t, dir } = useTranslation();

    const GOAL_DATA: Record<string, { title: string, description: string }> = {
        Study: t.wizard.goals.study,
        Work: t.wizard.goals.work,
        Both: t.wizard.goals.both,
        Business: t.wizard.goals.business,
        Family: t.wizard.goals.family,
        Asylum: t.wizard.goals.asylum,
    };

    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<GoalValues>({
        resolver: zodResolver(goalSchema),
        defaultValues: {
            goal: formData.goal,
        },
    });

    const selectedGoal = watch("goal");

    const onSubmit = (data: GoalValues) => {
        setFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-8", dir === 'rtl' ? 'text-right' : 'text-left')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GOALS.map((goal) => {
                    const Icon = GOAL_ICONS[goal];
                    const data = GOAL_DATA[goal];
                    return (
                        <Card
                            key={goal}
                            className={cn(
                                "cursor-pointer transition-all duration-300 hover:border-primary/50 group rounded-3xl overflow-hidden border-border/50",
                                selectedGoal === goal ? "ring-2 ring-primary border-primary bg-primary/5 shadow-xl shadow-primary/10" : "bg-card/50"
                            )}
                            onClick={() => setValue("goal", goal, { shouldValidate: true })}
                        >
                            <CardContent className={cn("p-8 flex items-start gap-5", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                <div className={cn(
                                    "p-4 rounded-2xl transition-all duration-300",
                                    selectedGoal === goal ? "bg-primary text-white scale-110" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                )}>
                                    <Icon className="h-7 w-7" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-extrabold text-xl tracking-tight">{data.title}</h3>
                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                        {data.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {selectedGoal === 'Asylum' && (
                <div className={cn("p-6 rounded-[1.5rem] bg-amber-500/10 border border-amber-500/20 flex gap-4 text-amber-700 dark:text-amber-400 backdrop-blur-md", dir === 'rtl' ? 'flex-row-reverse text-right' : '')}>
                    <ShieldAlert className="h-6 w-6 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-sm font-bold">
                            {dir === 'rtl' ? 'ملاحظة هامة:' : 'Important Note:'}
                        </p>
                        <p className="text-xs font-medium leading-relaxed opacity-90">
                            {dir === 'rtl'
                                ? 'نحن نقدم فقط توجيهات إعلامية عامة وروابط رسمية لطالبي اللجوء. هذه ليست نصيحة قانونية. لسلامتك، استشر دائماً ممثلي الأمم المتحدة أو الممثلين الحكوميين الرسميين.'
                                : 'We only provide general informational guidance and official links for asylum seekers. This is NOT legal advice. For your safety, always consult with official UN or government representatives.'}
                        </p>
                    </div>
                </div>
            )}

            {errors.goal && (
                <p className="text-sm text-destructive font-black tracking-tight">{errors.goal.message}</p>
            )}

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
