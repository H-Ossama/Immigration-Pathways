"use client";

import { useFormStore } from "@/store/form-store";
import { StepIndicator } from "./StepIndicator";
import { BasicInfoStep } from "./BasicInfoStep";
import { GoalStep } from "./GoalStep";
import { EducationStep } from "./EducationStep";
import { WorkExperienceStep } from "./WorkExperienceStep";
import { PreferencesStep } from "./PreferencesStep";
import { DocumentsStep } from "./DocumentsStep";
import { ApiKeyStep } from "./ApiKeyStep";
import { ReviewStep } from "./ReviewStep";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WizardContainer() {
    const currentStep = useFormStore((state) => state.currentStep);
    const error = useFormStore((state) => state.error);

    const renderStep = () => {
        switch (currentStep) {
            case 0: return <BasicInfoStep />;
            case 1: return <GoalStep />;
            case 2: return <EducationStep />;
            case 3: return <WorkExperienceStep />;
            case 4: return <PreferencesStep />;
            case 5: return <DocumentsStep />;
            case 6: return <ApiKeyStep />;
            case 7: return <ReviewStep />;
            default: return <BasicInfoStep />;
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 md:px-6 min-h-[80vh] flex flex-col items-center">
            <StepIndicator currentStep={currentStep} />

            <div className="w-full relative mt-8">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center gap-4 text-destructive backdrop-blur-md"
                    >
                        <AlertCircle className="h-6 w-6 shrink-0" />
                        <p className="text-sm font-bold tracking-tight">{error}</p>
                    </motion.div>
                )}

                <Card className="border-white/10 shadow-2xl bg-white/70 dark:bg-slate-950/40 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="md:px-12 pt-12 pb-6 text-center">
                        <CardTitle className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 dark:from-white dark:to-white/60">
                            {currentStep === 7 ? "Finalize Your Future" : "Tell us about yourself"}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium mt-2">
                            {currentStep === 7
                                ? "Verify your details before our AI generates your personalized immigration roadmap."
                                : "Complete the fields below to help our AI find the most accurate pathways for your profile."
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="md:px-12 pb-12">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-12 text-center text-sm text-muted-foreground/60 font-medium max-w-lg">
                <p>Your details are processed securely. We use advanced AI to match your unique profile with global government opportunities.</p>
            </div>
        </div>
    );
}
