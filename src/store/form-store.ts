import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FormData, AIResponse } from '@/types';
import { DEFAULT_FORM_DATA, EXAMPLE_PROFILE } from '@/lib/constants';

interface FormState {
    formData: FormData;
    currentStep: number;
    results: AIResponse | null;
    isLoading: boolean;
    error: string | null;

    setFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
    resetForm: () => void;
    setResults: (results: AIResponse | null) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    loadExampleProfile: () => void;
}

export const useFormStore = create<FormState>()(
    persist(
        (set) => ({
            formData: DEFAULT_FORM_DATA,
            currentStep: 0,
            results: null,
            isLoading: false,
            error: null,

            setFormData: (data) =>
                set((state) => ({
                    formData: { ...state.formData, ...data },
                })),

            nextStep: () =>
                set((state) => ({
                    currentStep: Math.min(state.currentStep + 1, 7),
                })),

            prevStep: () =>
                set((state) => ({
                    currentStep: Math.max(state.currentStep - 1, 0),
                })),

            setStep: (step) =>
                set({
                    currentStep: step,
                }),

            resetForm: () =>
                set({
                    formData: DEFAULT_FORM_DATA,
                    currentStep: 0,
                    results: null,
                    error: null,
                }),

            setResults: (results) => set({ results }),
            setIsLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),

            loadExampleProfile: () =>
                set((state) => ({
                    formData: { ...state.formData, ...EXAMPLE_PROFILE },
                })),
        }),
        {
            name: 'immigration-pathways-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                formData: { ...state.formData, apiKey: state.formData.apiKey }, // Keep API key in localStorage
                currentStep: state.currentStep,
                results: state.results,
            }),
        }
    )
);
