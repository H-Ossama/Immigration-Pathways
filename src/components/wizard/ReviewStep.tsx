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
    Loader2,
    ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function ReviewStep() {
    const router = useRouter();
    const { formData, prevStep, setIsLoading, setResults, setError, isLoading } = useFormStore();
    const { t, language, dir } = useTranslation();

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/generate-pathways", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    language // Pass the selected language to the AI
                }),
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
                        <CardTitle className={cn("text-sm font-medium flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                            <User className="h-4 w-4 text-primary" /> {t.wizard.steps.basic}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("text-sm space-y-1", dir === 'rtl' ? 'text-right' : 'text-left')}>
                        <p><span className="text-muted-foreground">{t.wizard.basicInfo.nationality}:</span> {formData.nationality}</p>
                        <p><span className="text-muted-foreground">{t.wizard.basicInfo.residence}:</span> {formData.residence}</p>
                        <p><span className="text-muted-foreground">{t.wizard.basicInfo.age}:</span> {formData.age}</p>
                        <p><span className="text-muted-foreground">{t.wizard.basicInfo.languages}:</span> {formData.languages.join(", ")}</p>
                    </CardContent>
                </Card>

                {/* Goal */}
                <Card className="border-none bg-muted/30">
                    <CardHeader className="pb-2">
                        <CardTitle className={cn("text-sm font-medium flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                            <Target className="h-4 w-4 text-primary" /> {t.wizard.steps.goal}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("text-sm", dir === 'rtl' ? 'text-right' : 'text-left')}>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                            {formData.goal}
                        </Badge>
                    </CardContent>
                </Card>

                {/* Education */}
                <Card className="border-none bg-muted/30">
                    <CardHeader className="pb-2">
                        <CardTitle className={cn("text-sm font-medium flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                            <GraduationCap className="h-4 w-4 text-primary" /> {t.wizard.steps.education}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("text-sm space-y-1", dir === 'rtl' ? 'text-right' : 'text-left')}>
                        <p className="font-medium">{formData.educationLevel}</p>
                        <p>{formData.fieldOfStudy}</p>
                        {formData.gpa && <p className="text-xs text-muted-foreground">GPA: {formData.gpa}</p>}
                    </CardContent>
                </Card>

                {/* Work */}
                <Card className="border-none bg-muted/30">
                    <CardHeader className="pb-2">
                        <CardTitle className={cn("text-sm font-medium flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                            <Briefcase className="h-4 w-4 text-primary" /> {t.wizard.steps.work}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("text-sm space-y-1", dir === 'rtl' ? 'text-right' : 'text-left')}>
                        <p className="font-medium">{formData.jobTitle}</p>
                        <p>{formData.yearsOfExperience} {t.wizard.yearsLabel}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{formData.skills}</p>
                    </CardContent>
                </Card>

                {/* Preferences */}
                <Card className="border-none bg-muted/30 md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className={cn("text-sm font-medium flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                            <Globe className="h-4 w-4 text-primary" /> {t.wizard.steps.preferences}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("text-sm grid grid-cols-2 md:grid-cols-3 gap-4", dir === 'rtl' ? 'text-right' : 'text-left')}>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">{t.wizard.preferences.countries}</p>
                            <div className={cn("flex flex-wrap gap-1", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                {formData.targetCountries.map(c => (
                                    <Badge key={c} variant="outline" className="text-[10px] py-0">{c}</Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">{t.wizard.preferences.budget}</p>
                            <p className="font-medium">{formData.budget}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">{t.wizard.preferences.learnLanguage}</p>
                            <p className="font-medium">{formData.willingToLearnLanguage ? t.wizard.yes : t.wizard.no}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Documents */}
                <Card className="border-none bg-muted/30 md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className={cn("text-sm font-medium flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                            <FileText className="h-4 w-4 text-primary" /> {t.wizard.steps.documents}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={cn("text-sm grid grid-cols-2 md:grid-cols-5 gap-2", dir === 'rtl' ? 'text-right' : 'text-left')}>
                        {Object.entries(formData.documents).map(([key, val]) => (
                            <div key={key} className={cn("flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                                <div className={cn("h-2 w-2 rounded-full", val ? "bg-green-500" : "bg-muted-foreground/30")} />
                                <span className={cn("text-[10px] capitalize", val ? "font-medium" : "text-muted-foreground")}>
                                    {t.wizard.documents[key as keyof typeof t.wizard.documents] || key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Separator className="my-4" />

            <div className={cn("flex justify-between items-center bg-primary/5 p-4 rounded-xl border border-primary/20", dir === 'rtl' ? 'flex-row-reverse text-right' : '')}>
                <div className="space-y-1">
                    <p className="text-sm font-bold">{t.wizard.review.ready}</p>
                    <p className="text-xs text-muted-foreground">{t.wizard.review.clickGenerate}</p>
                </div>
                <div className={cn("flex items-center gap-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                    <Button type="button" variant="outline" onClick={prevStep} disabled={isLoading}>
                        {dir === 'rtl' ? <ArrowRight className="ml-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />} {t.wizard.back}
                    </Button>
                    <Button type="button" onClick={handleGenerate} disabled={isLoading} className="relative btn-premium">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t.wizard.generating}
                            </>
                        ) : (
                            <>
                                {t.wizard.generate} <Send className={cn("ml-2 h-4 w-4", dir === 'rtl' ? 'rotate-180 mr-2 ml-0' : '')} />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

