export const COUNTRIES = [
    'Germany', 'Canada', 'France', 'USA', 'UK', 'Netherlands', 'Sweden',
    'Spain', 'Italy', 'Australia', 'New Zealand', 'Switzerland', 'Belgium', 'Norway'
].sort();

export const LANGUAGES = [
    'English', 'French', 'German', 'Spanish', 'Arabic', 'Chinese', 'Japanese', 'Russian', 'Portuguese'
].sort();

export const EDUCATION_LEVELS = ['High School', 'Bachelor', 'Master', 'PhD'] as const;

export const GOALS = ['Study', 'Work', 'Both', 'Business', 'Family', 'Asylum'] as const;

export const BUDGET_RANGES = ['Low', 'Medium', 'High'] as const;

export const TIMEFRAMES = ['ASAP', '6 months', '1 year+'] as const;

export const AI_PROVIDERS = [
    {
        id: 'google' as const,
        name: 'Google Gemini',
        models: [
            { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
            { id: 'gemini-3-flash', name: 'Gemini 3 Flash' },
            { id: 'gemini-3-pro-low', name: 'Gemini 3 Pro (Low)' },
            { id: 'gemini-3-pro-high', name: 'Gemini 3 Pro (High)' },
        ]
    },
    {
        id: 'openai' as const,
        name: 'OpenAI GPT',
        models: [
            { id: 'gpt-5.2', name: 'GPT 5.2' },
            { id: 'gpt-5.1', name: 'GPT 5.1' },
            { id: 'gpt-5', name: 'GPT 5' },
        ]
    }
];

export const DEFAULT_FREE_KEY = "AIzaSyCp9EGnlA3G7lb1xQbkTqWUTVvxMN-QIFI";

export const DEFAULT_FORM_DATA = {
    nationality: '',
    residence: '',
    age: '',
    languages: [],
    maritalStatus: '',
    goal: 'Both' as const,
    educationLevel: 'Bachelor' as const,
    fieldOfStudy: '',
    gpa: '',
    certificates: '',
    yearsOfExperience: '',
    jobTitle: '',
    skills: '',
    portfolio: '',
    targetCountries: [],
    budget: 'Medium' as const,
    timeframe: '6 months' as const,
    willingToLearnLanguage: true,
    documents: {
        passport: false,
        bankStatement: false,
        languageTest: false,
        degree: false,
        cv: false,
    },
    apiKey: '',
    aiProvider: 'google' as const,
    aiModel: 'gemini-2.5-flash',
};

export const EXAMPLE_PROFILE = {
    nationality: 'Morocco',
    residence: 'Morocco',
    age: '24',
    languages: ['English', 'French', 'Arabic'],
    maritalStatus: 'Single',
    goal: 'Work' as const,
    educationLevel: 'Bachelor' as const,
    fieldOfStudy: 'Software Engineering',
    gpa: '3.5/4.0',
    certificates: 'AWS Certified Solutions Architect',
    yearsOfExperience: '2',
    jobTitle: 'Frontend Developer',
    skills: 'React, Next.js, TypeScript, Tailwind CSS',
    portfolio: 'https://github.com/example',
    targetCountries: ['Germany', 'Canada', 'Netherlands'],
    budget: 'Medium' as const,
    timeframe: '6 months' as const,
    willingToLearnLanguage: true,
    documents: {
        passport: true,
        bankStatement: true,
        languageTest: true,
        degree: true,
        cv: true,
    },
};
