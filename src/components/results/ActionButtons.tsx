"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download, Save, Check, Loader2 } from "lucide-react";
import { AIResponse } from "@/types";
import { jsPDF } from "jspdf";
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function ActionButtons({ results }: { results: AIResponse }) {
    const [isCopying, setIsCopying] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const { t, dir } = useTranslation();

    const handleCopy = async () => {
        setIsCopying(true);
        const text = `
${t.results.title}:
${results.summary}

${results.pathways.map((p, i) => `
Pathway #${i + 1}: ${p.title}
Best for: ${p.best_for}
Difficulty: ${p.difficulty} | Timeline: ${p.timeline}
Steps:
${p.steps.map(s => `- ${s}`).join('\n')}
`).join('\n')}
    `.trim();

        try {
            await navigator.clipboard.writeText(text);
            alert(dir === 'rtl' ? "تم نسخ النتائج إلى الحافظة!" : "Results copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy", err);
        } finally {
            setIsCopying(false);
        }
    };

    const handleDownloadPDF = () => {
        setIsExporting(true);
        try {
            const doc = new jsPDF();
            let y = 20;

            doc.setFontSize(22);
            doc.text("Your Immigration Pathways", 20, y);
            y += 15;

            doc.setFontSize(12);
            doc.text(doc.splitTextToSize(results.summary, 170), 20, y);
            y += 20;

            results.pathways.forEach((p, i) => {
                if (y > 250) {
                    doc.addPage();
                    y = 20;
                }

                doc.setFontSize(16);
                doc.text(`${i + 1}. ${p.title}`, 20, y);
                y += 10;

                doc.setFontSize(10);
                doc.text(`Best for: ${p.best_for}`, 20, y);
                y += 7;
                doc.text(`Difficulty: ${p.difficulty} | Timeline: ${p.timeline}`, 20, y);
                y += 10;

                doc.setFontSize(12);
                doc.text("Steps:", 20, y);
                y += 7;
                doc.setFontSize(10);
                p.steps.forEach(s => {
                    const lines = doc.splitTextToSize(`- ${s}`, 160);
                    doc.text(lines, 25, y);
                    y += lines.length * 5;
                });
                y += 10;
            });

            doc.save("immigration-pathways.pdf");
        } catch (err) {
            console.error("PDF generation failed", err);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className={cn("flex flex-wrap gap-3 items-center", dir === 'rtl' ? 'flex-row-reverse' : '')}>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={isCopying} className="rounded-xl px-4 font-bold border-primary/20">
                {isCopying ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Copy className={cn("h-4 w-4 mr-2", dir === 'rtl' ? 'ml-2 mr-0' : '')} />}
                {t.results.copy}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF} disabled={isExporting} className="rounded-xl px-4 font-bold border-primary/20">
                {isExporting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className={cn("h-4 w-4 mr-2", dir === 'rtl' ? 'ml-2 mr-0' : '')} />}
                {t.results.export}
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl px-4 font-bold border-primary/20">
                <Save className={cn("h-4 w-4 mr-2", dir === 'rtl' ? 'ml-2 mr-0' : '')} />
                {t.results.save}
            </Button>
        </div>
    );
}
