import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';
import { createEmptyAchievement } from '../utils/resumeModel';
import './forms.css';

const AchievementsForm = () => {
  const { resume, updateList } = useResume();
  const { achievements } = resume;

  const update = (id, field, value) => {
    updateList('achievements', achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const remove = (id) => updateList('achievements', achievements.filter((a) => a.id !== id));
  const add = () => updateList('achievements', [...achievements, createEmptyAchievement()]);

  return (
    <div>
      {achievements.length === 0 && <p className="form-empty-hint">No achievements added yet.</p>}

      {achievements.map((a, i) => (
        <div className="entry-card" key={a.id}>
          <div className="entry-card-header">
            <span>Achievement {i + 1}</span>
            <button className="entry-remove-btn" onClick={() => remove(a.id)}><FiTrash2 /></button>
          </div>
          <div className="field">
            <label>Title</label>
            <input value={a.title} onChange={(e) => update(a.id, 'title', e.target.value)} placeholder="Employee of the Year" />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea value={a.description} onChange={(e) => update(a.id, 'description', e.target.value)} placeholder="Brief context on the achievement..." />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add}><FiPlus /> Add Achievement</button>
    </div>
  );
};

export default AchievementsForm;
