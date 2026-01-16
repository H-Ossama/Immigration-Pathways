import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentsSchema } from "@/lib/validations";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileCheck, Info } from "lucide-react";
import { z } from "zod";

import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type DocumentsValues = z.infer<typeof documentsSchema>;

export function DocumentsStep() {
    const { formData, setFormData, nextStep, prevStep } = useFormStore();
    const { t, dir } = useTranslation();

    const DOCUMENT_LABELS: Record<string, string> = {
        passport: t.wizard.documents.passport,
        bankStatement: t.wizard.documents.bankStatement,
        languageTest: t.wizard.documents.languageTest,
        degree: t.wizard.documents.degree,
        cv: t.wizard.documents.cv,
    };

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
        <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", dir === 'rtl' ? 'text-right' : 'text-left')}>
            <div className="space-y-6">
                <div className={cn("flex items-center gap-2 mb-2", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                    <FileCheck className="h-6 w-6 text-primary" />
                    <Label className="text-xl font-bold">{t.wizard.documents.title}</Label>
                </div>

                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    {t.wizard.documents.description}
                </p>

                <div className="grid gap-4 mt-8">
                    {(Object.keys(DOCUMENT_LABELS) as Array<keyof DocumentsValues["documents"]>).map((key) => (
                        <div key={key}>
                            <Label
                                htmlFor={`doc-${key}`}
                                className={cn(
                                    "flex items-center justify-between p-6 border rounded-[1.5rem] transition-all cursor-pointer hover:bg-primary/5 group",
                                    selectedDocs[key] ? "border-primary bg-primary/10 shadow-lg shadow-primary/5" : "bg-card/50 border-border/50",
                                    dir === 'rtl' ? 'flex-row-reverse' : ''
                                )}
                            >
                                <div className={cn("flex items-center space-x-5", dir === 'rtl' ? 'space-x-reverse' : '')}>
                                    <Checkbox
                                        id={`doc-${key}`}
                                        checked={selectedDocs[key]}
                                        onCheckedChange={() => toggleDoc(key)}
                                        className="h-6 w-6 rounded-lg border-2"
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

            <div className={cn("p-6 rounded-[1.5rem] bg-primary/5 border border-primary/10 flex gap-4 backdrop-blur-sm", dir === 'rtl' ? 'flex-row-reverse' : '')}>
                <Info className="h-6 w-6 shrink-0 text-primary" />
                <p className="text-sm font-medium leading-relaxed text-muted-foreground/80">
                    {t.wizard.documents.readinessNote}
                </p>
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


