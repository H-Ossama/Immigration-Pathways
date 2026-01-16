import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentsSchema } from "@/lib/validations";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileCheck, Info } from "lucide-react";
import { z } from "zod";

type DocumentsValues = z.infer<typeof documentsSchema>;

const DOCUMENT_LABELS: Record<string, string> = {
    passport: "Valid Passport",
    bankStatement: "Proof of Funds (Bank Statement)",
    languageTest: "Language Test Results (IELTS, TOEFL, etc.)",
    degree: "Educational Degrees & Transcripts",
    cv: "Updated Professional CV/Resume",
};

export function DocumentsStep() {
    const { formData, setFormData, nextStep, prevStep } = useFormStore();

    const {
        handleSubmit,
        setValue,
        watch,
    } = useForm<DocumentsValues>({
        resolver: zodResolver(documentsSchema),
        defaultValues: {
            documents: formData.documents,
        },
    });

    const selectedDocs = watch("documents");

    const onSubmit = (data: DocumentsValues) => {
        setFormData(data);
        nextStep();
    };

    const toggleDoc = (key: keyof typeof selectedDocs) => {
        setValue(`documents.${key}`, !selectedDocs[key]);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="h-5 w-5 text-primary" />
                    <Label className="text-base font-bold">Document Readiness Checklist</Label>
                </div>

                <p className="text-sm text-muted-foreground">
                    Checking these boxes helps the AI understand your current readiness and provide more accurate timelines.
                </p>

                <div className="grid gap-4 mt-4">
                    {(Object.keys(DOCUMENT_LABELS) as Array<keyof DocumentsValues["documents"]>).map((key) => (
                        <div key={key}>
                            <Label
                                htmlFor={`doc-${key}`}
                                className={cn(
                                    "flex items-center justify-between p-6 border rounded-[1.5rem] transition-all cursor-pointer hover:bg-primary/5 group",
                                    selectedDocs[key] ? "border-primary bg-primary/10 shadow-lg shadow-primary/5" : "bg-white/50 dark:bg-slate-900/50 border-white/10"
                                )}
                            >
                                <div className="flex items-center space-x-4">
                                    <Checkbox
                                        id={`doc-${key}`}
                                        checked={selectedDocs[key]}
                                        onCheckedChange={() => toggleDoc(key)}
                                        className="h-5 w-5 rounded-md"
                                    />
                                    <span className="text-lg font-bold group-hover:text-primary transition-colors">
                                        {DOCUMENT_LABELS[key]}
                                    </span>
                                </div>
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 flex gap-3 text-blue-800 dark:text-blue-400">
                <Info className="h-5 w-5 shrink-0" />
                <p className="text-xs leading-relaxed">
                    Don't worry if you don't have all these documents yet. The AI can still suggest pathways, but it will include these as required next steps in your plan.
                </p>
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

import { cn } from "@/lib/utils";
