import { v4 as uuid } from 'uuid';

// Central shape of a single resume document.
// Kept flat & serializable so it can later be sent as-is to a MongoDB backend.
export const createEmptyResume = (templateId = 'modern-blue') => ({
  id: uuid(),
  title: 'Untitled Resume',
  templateId,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    summary: '',
    photo: '',
  },

  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  interests: [],
  achievements: [],
  references: [],

  customization: {
    primaryColor: '#4f46e5',
    secondaryColor: '#171923',
    fontFamily: 'Inter',
    fontSize: 'medium', // small | medium | large
    sectionOrder: [
      'summary',
      'experience',
      'education',
      'skills',
      'projects',
      'certifications',
      'languages',
      'achievements',
      'interests',
      'references',
    ],
    sectionVisibility: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      languages: true,
      achievements: true,
      interests: true,
      references: true,
    },
  },
});

export const createEmptyEducation = () => ({
  id: uuid(),
  school: '',
  degree: '',
  fieldOfStudy: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
});

export const createEmptyExperience = () => ({
  id: uuid(),
  company: '',
  role: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
});

export const createEmptySkill = () => ({
  id: uuid(),
  name: '',
  level: 80,
});

export const createEmptyProject = () => ({
  id: uuid(),
  name: '',
  link: '',
  description: '',
});

export const createEmptyCertification = () => ({
  id: uuid(),
  name: '',
  issuer: '',
  date: '',
});

export const createEmptyLanguage = () => ({
  id: uuid(),
  name: '',
  proficiency: 'Fluent',
});

export const createEmptyInterest = () => ({
  id: uuid(),
  name: '',
});

export const createEmptyAchievement = () => ({
  id: uuid(),
  title: '',
  description: '',
});

export const createEmptyReference = () => ({
  id: uuid(),
  name: '',
  relation: '',
  contact: '',
});

export const SECTION_LABELS = {
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  achievements: 'Achievements',
  interests: 'Interests',
  references: 'References',
};
