import { z } from 'zod';
import { EDUCATION_LEVELS, GOALS, BUDGET_RANGES, TIMEFRAMES } from './constants';

export const basicInfoSchema = z.object({
    nationality: z.string().min(1, 'Nationality is required'),
    residence: z.string().min(1, 'Country of residence is required'),
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Age must be a positive number',
    }),
    languages: z.array(z.string()).min(1, 'Select at least one language'),
    maritalStatus: z.string().optional(),
});

export const goalSchema = z.object({
    goal: z.enum(GOALS, {
        message: 'Please select a goal',
    }),
});

export const educationSchema = z.object({
    educationLevel: z.enum(EDUCATION_LEVELS, {
        message: 'Please select your education level',
    }),
    fieldOfStudy: z.string().min(1, 'Field of study is required'),
    gpa: z.string().optional(),
    certificates: z.string().optional(),
});

export const workExperienceSchema = z.object({
    yearsOfExperience: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Years of experience must be a number',
    }),
    jobTitle: z.string().min(1, 'Job title is required'),
    skills: z.string().min(1, 'Please list some skills'),
    portfolio: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

export const preferencesSchema = z.object({
    targetCountries: z.array(z.string()).min(1, 'Select at least one country'),
    budget: z.enum(BUDGET_RANGES, {
        message: 'Please select a budget range',
    }),
    timeframe: z.enum(TIMEFRAMES, {
        message: 'Please select a timeframe',
    }),
    willingToLearnLanguage: z.boolean(),
});

export const documentsSchema = z.object({
    documents: z.object({
        passport: z.boolean(),
        bankStatement: z.boolean(),
        languageTest: z.boolean(),
        degree: z.boolean(),
        cv: z.boolean(),
    }),
});

export const apiKeySchema = z.object({
    apiKey: z.string().optional().or(z.literal('')),
    aiProvider: z.enum(['google', 'openai']),
    aiModel: z.string().min(1, 'Please select a model'),
});

export const wizardSchema = z.object({
    ...basicInfoSchema.shape,
    ...goalSchema.shape,
    ...educationSchema.shape,
    ...workExperienceSchema.shape,
    ...preferencesSchema.shape,
    ...documentsSchema.shape,
    ...apiKeySchema.shape,
});
