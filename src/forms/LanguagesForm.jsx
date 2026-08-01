import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';
import { createEmptyLanguage } from '../utils/resumeModel';
import './forms.css';

const PROFICIENCY_LEVELS = ['Basic', 'Conversational', 'Fluent', 'Native'];

const LanguagesForm = () => {
  const { resume, updateList } = useResume();
  const { languages } = resume;

  const update = (id, field, value) => {
    updateList('languages', languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const remove = (id) => updateList('languages', languages.filter((l) => l.id !== id));
  const add = () => updateList('languages', [...languages, createEmptyLanguage()]);

  return (
    <div>
      {languages.length === 0 && <p className="form-empty-hint">No languages added yet.</p>}

      {languages.map((l) => (
        <div className="entry-card" key={l.id}>
          <div className="entry-card-header">
            <span>Language</span>
            <button className="entry-remove-btn" onClick={() => remove(l.id)}><FiTrash2 /></button>
          </div>
          <div className="form-row">
            <div className="field">
              <label>Language</label>
              <input value={l.name} onChange={(e) => update(l.id, 'name', e.target.value)} placeholder="Spanish" />
            </div>
            <div className="field">
              <label>Proficiency</label>
              <select value={l.proficiency} onChange={(e) => update(l.id, 'proficiency', e.target.value)}>
                {PROFICIENCY_LEVELS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add}><FiPlus /> Add Language</button>
    </div>
  );
};

export default LanguagesForm;
