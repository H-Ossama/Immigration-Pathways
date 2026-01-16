export type EducationLevel = 'High School' | 'Bachelor' | 'Master' | 'PhD';
export type Goal = 'Study' | 'Work' | 'Both' | 'Business' | 'Family' | 'Asylum';
export type BudgetRange = 'Low' | 'Medium' | 'High';
export type Timeframe = 'ASAP' | '6 months' | '1 year+';

export interface FormData {
  // Step 1: Basic Info
  nationality: string;
  residence: string;
  age: string;
  languages: string[];
  maritalStatus?: string;

  // Step 2: Goal
  goal: Goal;

  // Step 3: Education
  educationLevel: EducationLevel;
  fieldOfStudy: string;
  gpa?: string;
  certificates?: string;

  // Step 4: Work Experience
  yearsOfExperience: string;
  jobTitle: string;
  skills: string;
  portfolio?: string;

  // Step 5: Preferences
  targetCountries: string[];
  budget: BudgetRange;
  timeframe: Timeframe;
  willingToLearnLanguage: boolean;

  // Step 6: Documents
  documents: {
    passport: boolean;
    bankStatement: boolean;
    languageTest: boolean;
    degree: boolean;
    cv: boolean;
  };

  // Step 7: API Key & Model
  apiKey?: string;
  aiProvider: 'google' | 'openai';
  aiModel: string;
}

export interface PathwayLink {
  label: string;
  url: string;
}

export interface Pathway {
  title: string;
  best_for: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeline: string;
  estimated_cost: string;
  steps: string[];
  requirements: string[];
  documents: string[];
  official_links: PathwayLink[];
  warnings: string[];
  next_actions: string[];
}

export interface AIResponse {
  summary: string;
  pathways: Pathway[];
}
