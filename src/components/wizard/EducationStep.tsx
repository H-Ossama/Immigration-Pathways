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

type EducationValues = z.infer<typeof educationSchema>;

export function EducationStep() {
    const { formData, setFormData, nextStep, prevStep } = useFormStore();

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="educationLevel">Highest Education Level</Label>
                    <Select
                        onValueChange={(val: any) => setValue("educationLevel", val, { shouldValidate: true })}
                        defaultValue={educationLevel}
                    >
                        <SelectTrigger id="educationLevel" className={errors.educationLevel ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select your education level" />
                        </SelectTrigger>
                        <SelectContent>
                            {EDUCATION_LEVELS.map((level) => (
                                <SelectItem key={level} value={level}>
                                    {level}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.educationLevel && (
                        <p className="text-sm text-destructive font-medium">{errors.educationLevel.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Input
                        id="fieldOfStudy"
                        placeholder="e.g. Computer Science, Medicine, Law"
                        {...register("fieldOfStudy")}
                        className={errors.fieldOfStudy ? "border-destructive" : ""}
                    />
                    {errors.fieldOfStudy && (
                        <p className="text-sm text-destructive font-medium">{errors.fieldOfStudy.message}</p>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="gpa">GPA or Academic Grade (Optional)</Label>
                        <Input
                            id="gpa"
                            placeholder="e.g. 3.5/4.0, 15/20"
                            {...register("gpa")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="certificates">Relevant Certificates (Optional)</Label>
                        <Input
                            id="certificates"
                            placeholder="e.g. AWS Certified, IELTS 7.5"
                            {...register("certificates")}
                        />
                    </div>
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
