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

type WorkValues = z.infer<typeof workExperienceSchema>;

export function WorkExperienceStep() {
    const { formData, setFormData, nextStep, prevStep } = useFormStore();

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="jobTitle">Recent Job Title / Professional Role</Label>
                        <Input
                            id="jobTitle"
                            placeholder="e.g. Software Engineer, Nurse, Accountant"
                            {...register("jobTitle")}
                            className={errors.jobTitle ? "border-destructive" : ""}
                        />
                        {errors.jobTitle && (
                            <p className="text-sm text-destructive font-medium">{errors.jobTitle.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                        <Input
                            id="yearsOfExperience"
                            type="number"
                            placeholder="e.g. 3"
                            {...register("yearsOfExperience")}
                            className={errors.yearsOfExperience ? "border-destructive" : ""}
                        />
                        {errors.yearsOfExperience && (
                            <p className="text-sm text-destructive font-medium">{errors.yearsOfExperience.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="skills">Key Skills & Tools</Label>
                    <Textarea
                        id="skills"
                        placeholder="e.g. Programming (Python), Project Management, Customer Service, Fluent German..."
                        className={cn("min-h-[100px]", errors.skills ? "border-destructive" : "")}
                        {...register("skills")}
                    />
                    {errors.skills && (
                        <p className="text-sm text-destructive font-medium">{errors.skills.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio or LinkedIn URL (Optional)</Label>
                    <Input
                        id="portfolio"
                        placeholder="https://linkedin.com/in/username"
                        {...register("portfolio")}
                        className={errors.portfolio ? "border-destructive" : ""}
                    />
                    {errors.portfolio && (
                        <p className="text-sm text-destructive font-medium">{errors.portfolio.message}</p>
                    )}
                </div>
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

// Helper function to handle conditional imports if needed, but cn is in lib/utils
import { cn } from "@/lib/utils";
