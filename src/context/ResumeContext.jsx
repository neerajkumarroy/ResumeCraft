import React, { createContext, useContext, useState, useCallback } from 'react';
import { createEmptyResume } from '../utils/resumeModel';
import { upsertResume, getResumeById } from '../services/storageService';
import { getTemplateMeta } from '../utils/templatesData';

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(createEmptyResume());
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  const loadResume = useCallback((id) => {
    const found = getResumeById(id);
    if (found) setResume(found);
    return found;
  }, []);

  const startNewResume = useCallback((templateId) => {
    const fresh = createEmptyResume(templateId);
    const meta = getTemplateMeta(templateId);
    fresh.customization.primaryColor = meta.defaultColor;
    fresh.customization.secondaryColor = meta.defaultSecondary;
    fresh.customization.fontFamily = meta.defaultFont;
    fresh.title = `${meta.name} Resume`;
    setResume(fresh);
    return fresh;
  }, []);

  const updateField = useCallback((path, value) => {
    setResume((prev) => {
      const next = structuredClone(prev);
      const keys = path.split('.');
      let target = next;
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      return next;
    });
  }, []);

  const updateList = useCallback((listName, newList) => {
    setResume((prev) => ({ ...prev, [listName]: newList }));
  }, []);

  const setTemplate = useCallback((templateId) => {
    setResume((prev) => ({ ...prev, templateId }));
  }, []);

  const saveResume = useCallback(() => {
    setIsSaving(true);
    const saved = upsertResume(resume);
    // Note: we intentionally do NOT call setResume(saved) here. Doing so would
    // replace `resume` with a copy that has a fresh `updatedAt`, which would
    // re-trigger any effect watching `resume` and cause an autosave loop.
    setLastSavedAt(new Date());
    setIsSaving(false);
    return saved;
  }, [resume]);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        loadResume,
        startNewResume,
        updateField,
        updateList,
        setTemplate,
        saveResume,
        isSaving,
        lastSavedAt,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};
