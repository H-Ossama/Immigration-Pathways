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

type GoalValues = z.infer<typeof goalSchema>;

const GOAL_ICONS: Record<string, any> = {
    Study: GraduationCap,
    Work: Briefcase,
    Both: Heart,
    Business: Rocket,
    Family: Users,
    Asylum: ShieldAlert,
};

const GOAL_DESCRIPTIONS: Record<string, string> = {
    Study: "Perfect if you want to pursue a degree, diploma, or certification.",
    Work: "For those looking for job offers, skilled migration, or work permits.",
    Both: "Considering both academic and professional opportunities.",
    Business: "For entrepreneurs planning to start or invest in a business.",
    Family: "Moving to join family members already residing abroad.",
    Asylum: "Seeking international protection (Provide only general info).",
};

export function GoalStep() {
    const { formData, setFormData, nextStep, prevStep } = useFormStore();

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GOALS.map((goal) => {
                    const Icon = GOAL_ICONS[goal];
                    return (
                        <Card
                            key={goal}
                            className={cn(
                                "cursor-pointer transition-all hover:border-primary/50",
                                selectedGoal === goal ? "ring-2 ring-primary border-primary bg-primary/5" : ""
                            )}
                            onClick={() => setValue("goal", goal, { shouldValidate: true })}
                        >
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className={cn(
                                    "p-3 rounded-full",
                                    selectedGoal === goal ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                                )}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold">{goal}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {GOAL_DESCRIPTIONS[goal]}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {selectedGoal === 'Asylum' && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 flex gap-3 text-red-800 dark:text-red-400">
                    <ShieldAlert className="h-5 w-5 shrink-0" />
                    <p className="text-sm">
                        <strong>Note:</strong> We only provide general informational guidance and official links for asylum seekers. This is NOT legal advice. For your safety, always consult with official UN or government representatives.
                    </p>
                </div>
            )}

            {errors.goal && (
                <p className="text-sm text-destructive font-medium">{errors.goal.message}</p>
            )}

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit">Next Step</Button>
            </div>
        </form>
    );
}
