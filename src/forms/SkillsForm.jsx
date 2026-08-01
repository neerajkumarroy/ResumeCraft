import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';
import { createEmptySkill } from '../utils/resumeModel';
import './forms.css';

const SkillsForm = () => {
  const { resume, updateList } = useResume();
  const { skills } = resume;

  const update = (id, field, value) => {
    updateList('skills', skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const remove = (id) => updateList('skills', skills.filter((s) => s.id !== id));
  const add = () => updateList('skills', [...skills, createEmptySkill()]);

  return (
    <div>
      {skills.length === 0 && <p className="form-empty-hint">No skills added yet.</p>}

      {skills.map((s) => (
        <div className="entry-card" key={s.id}>
          <div className="entry-card-header">
            <span>Skill</span>
            <button className="entry-remove-btn" onClick={() => remove(s.id)}><FiTrash2 /></button>
          </div>
          <div className="field">
            <label>Skill Name</label>
            <input value={s.name} onChange={(e) => update(s.id, 'name', e.target.value)} placeholder="Project Management" />
          </div>
          <div className="field">
            <label>Proficiency</label>
            <div className="skill-level-row">
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={s.level}
                onChange={(e) => update(s.id, 'level', Number(e.target.value))}
              />
              <span className="skill-level-value">{s.level}%</span>
            </div>
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add}><FiPlus /> Add Skill</button>
    </div>
  );
};

export default SkillsForm;
