import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import {
  getAllResumes,
  saveAllResumes,
  deleteResume as deleteResumeFromStorage,
} from '../services/storageService';

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    setResumes(getAllResumes());
  }, []);

  const refresh = useCallback(() => {
    setResumes(getAllResumes());
  }, []);

  const removeResume = useCallback((id) => {
    const updated = deleteResumeFromStorage(id);
    setResumes(updated);
  }, []);

  const duplicateResume = useCallback((id) => {
    const all = getAllResumes();
    const original = all.find((r) => r.id === id);
    if (!original) return;

    const copy = {
      ...original,
      id: uuid(),
      title: `${original.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...all, copy];
    saveAllResumes(updated);
    setResumes(updated);
  }, []);

  const renameResume = useCallback((id, title) => {
    const all = getAllResumes();
    const updated = all.map((r) => (r.id === id ? { ...r, title } : r));
    saveAllResumes(updated);
    setResumes(updated);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ resumes, refresh, removeResume, duplicateResume, renameResume }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
};
