// All resume persistence goes through this file.
// Today it talks to localStorage; tomorrow it can be swapped for real
// fetch() calls to a Node/Express + MongoDB API without touching the UI.

const STORAGE_KEY = 'resumecraft_resumes';

export const getAllResumes = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read resumes from storage', err);
    return [];
  }
};

export const saveAllResumes = (resumes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    return true;
  } catch (err) {
    console.error('Failed to persist resumes', err);
    return false;
  }
};

export const upsertResume = (resume) => {
  const resumes = getAllResumes();
  const index = resumes.findIndex((r) => r.id === resume.id);
  const updated = { ...resume, updatedAt: new Date().toISOString() };

  if (index >= 0) {
    resumes[index] = updated;
  } else {
    resumes.push(updated);
  }

  saveAllResumes(resumes);
  return updated;
};

export const deleteResume = (id) => {
  const resumes = getAllResumes().filter((r) => r.id !== id);
  saveAllResumes(resumes);
  return resumes;
};

export const getResumeById = (id) => {
  return getAllResumes().find((r) => r.id === id) || null;
};
