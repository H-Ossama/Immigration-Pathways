import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowLeft,
    Send,
    User,
    Target,
    GraduationCap,
    Briefcase,
    Globe,
    FileText,
    Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ReviewStep() {
    const router = useRouter();
    const { formData, prevStep, setIsLoading, setResults, setError, isLoading } = useFormStore();

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/generate-pathways", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to generate pathways");
            }

            const data = await response.json();
            setResults(data);
            router.push("/results");
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                {/* Basic Info */}
                <Card className="border-none bg-muted/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" /> Basic Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                        <p><span className="text-muted-foreground">Nationality:</span> {formData.nationality}</p>
                        <p><span className="text-muted-foreground">Residence:</span> {formData.residence}</p>
                        <p><span className="text-muted-foreground">Age:</span> {formData.age}</p>
                        <p><span className="text-muted-foreground">Languages:</span> {formData.languages.join(", ")}</p>
                    </CardContent>
                </Card>

                {/* Goal */}
                <Card className="border-none bg-muted/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" /> Migration Goal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                            {formData.goal}
                        </Badge>
                    </CardContent>
                </Card>

                {/* Education */}
                <Card className="border-none bg-muted/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" /> Education
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                        <p className="font-medium">{formData.educationLevel}</p>
                        <p>{formData.fieldOfStudy}</p>
                        {formData.gpa && <p className="text-xs text-muted-foreground">GPA: {formData.gpa}</p>}
                    </CardContent>
                </Card>

                {/* Work */}
                <Card className="border-none bg-muted/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" /> Professional
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                        <p className="font-medium">{formData.jobTitle}</p>
                        <p>{formData.yearsOfExperience} Years Experience</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{formData.skills}</p>
                    </CardContent>
                </Card>

                {/* Preferences */}
                <Card className="border-none bg-muted/30 md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary" /> Destination & Preferences
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Target Countries</p>
                            <div className="flex flex-wrap gap-1">
                                {formData.targetCountries.map(c => (
                                    <Badge key={c} variant="outline" className="text-[10px] py-0">{c}</Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Budget</p>
                            <p className="font-medium">{formData.budget}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Laguage Learning</p>
                            <p className="font-medium">{formData.willingToLearnLanguage ? "Yes" : "No"}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Documents */}
                <Card className="border-none bg-muted/30 md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" /> Document Readiness
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm grid grid-cols-2 md:grid-cols-5 gap-2">
                        {Object.entries(formData.documents).map(([key, val]) => (
                            <div key={key} className="flex items-center gap-2">
                                <div className={cn("h-2 w-2 rounded-full", val ? "bg-green-500" : "bg-muted-foreground/30")} />
                                <span className={cn("text-[10px] capitalize", val ? "font-medium" : "text-muted-foreground")}>
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center bg-primary/5 p-4 rounded-xl border border-primary/20">
                <div className="space-y-1">
                    <p className="text-sm font-bold">Ready to discover your pathways?</p>
                    <p className="text-xs text-muted-foreground">Clicking generate will call the AI using your provided key.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" onClick={prevStep} disabled={isLoading}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button type="button" onClick={handleGenerate} disabled={isLoading} className="relative">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                Generate Pathways <Send className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

import { cn } from "@/lib/utils";
