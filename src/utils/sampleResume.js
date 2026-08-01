import { createEmptyResume } from './resumeModel';
import { getTemplateMeta } from './templatesData';

export const buildSampleResume = (templateId) => {
  const base = createEmptyResume(templateId);
  const meta = getTemplateMeta(templateId);

  return {
    ...base,
    personalInfo: {
      fullName: 'Neeraj Kumar',
      jobTitle: 'Senior Product Designer',
      email: 'neeraj.123@email.com',
      phone: '+91 98765 43210',
      address: 'Dehradun',
      website: 'https://my-profile-kods.onrender.com/',
      linkedin: 'https://linkedin.com/in/neerajroy',
      summary:
        'Product designer with 2+ years crafting user-centered digital experiences for fintech and SaaS products. Skilled at translating complex requirements into simple, elegant interfaces.',
      photo: '',
    },
    experience: [
      {
        id: 'exp-1',
        company: 'Nimbus Technologies',
        role: 'Software Developer Designer',
        location: 'Bengaluru',
        startDate: 'Jan 2022',
        endDate: '',
        current: true,
        description: 'Led design for the core dashboard used by 40k+ daily active users; partnered with PM and engineering to ship 12 major releases.',
      },
      {
        id: 'exp-2',
        company: 'Lightbox Studio',
        role: 'Product Designer',
        location: 'Pune',
        startDate: 'Jun 2019',
        endDate: 'Dec 2021',
        current: false,
        description: 'Owned end-to-end design for two B2B SaaS products, from research to high-fidelity prototypes and design systems.',
      },
    ],
    education: [
      {
        id: 'edu-1',
        school: 'National Institute of Design',
        degree: 'B.Des',
        fieldOfStudy: 'Interaction Design',
        location: 'Ahmedabad',
        startDate: '2015',
        endDate: '2019',
        current: false,
        description: '',
      },
    ],
    skills: [
      { id: 'sk-1', name: 'Figma', level: 95 },
      { id: 'sk-2', name: 'Design Systems', level: 90 },
      { id: 'sk-3', name: 'User Research', level: 80 },
      { id: 'sk-4', name: 'Prototyping', level: 88 },
    ],
    projects: [
      {
        id: 'pr-1',
        name: 'Fintech Onboarding Redesign',
        link: 'case-study.neeraj.design',
        description: 'Reduced onboarding drop-off by 28% through a redesigned KYC flow.',
      },
    ],
    certifications: [
      { id: 'cert-1', name: 'Google UX Design Certificate', issuer: 'Google', date: '2021' },
    ],
    languages: [
      { id: 'lang-1', name: 'English', proficiency: 'Fluent' },
      { id: 'lang-2', name: 'Hindi', proficiency: 'Native' },
    ],
    interests: [
      { id: 'int-1', name: 'Illustration' },
      { id: 'int-2', name: 'Travel' },
      { id: 'int-3', name: 'Chess' },
    ],
    achievements: [
      { id: 'ach-1', title: 'Design Excellence Award 2023', description: 'Awarded for the dashboard redesign project.' },
    ],
    references: [
      { id: 'ref-1', name: 'Neeraj Kumar', relation: 'Design Director, Nimbus Technologies', contact: 'rohan@nimbus.io' },
    ],
    customization: {
      ...base.customization,
      primaryColor: meta.defaultColor,
      secondaryColor: meta.defaultSecondary,
      fontFamily: meta.defaultFont,
    },
  };
};
