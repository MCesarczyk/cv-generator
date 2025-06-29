export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  summary: string;
}

export interface WorkExperience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  isCurrentStudy: boolean;
  description?: string;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface CVData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
}