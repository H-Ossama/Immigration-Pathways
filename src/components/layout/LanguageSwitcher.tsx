"use client";

import * as React from "react";
import { Check, Globe, ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇲🇦" },
] as const;

export function LanguageSwitcher() {
    const { language, setLanguage, t } = useTranslation();

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 rounded-full px-3 hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20"
                >
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider">{language}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="z-[100] min-w-[140px] overflow-hidden rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                    sideOffset={8}
                    align="end"
                >
                    {languages.map((lang) => (
                        <DropdownMenu.Item
                            key={lang.code}
                            className={cn(
                                "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors",
                                language === lang.code
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => setLanguage(lang.code as any)}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{lang.flag}</span>
                                <span>{lang.name}</span>
                            </div>
                            {language === lang.code && <Check className="h-4 w-4" />}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
