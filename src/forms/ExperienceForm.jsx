import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';
import { createEmptyExperience } from '../utils/resumeModel';
import './forms.css';

const ExperienceForm = () => {
  const { resume, updateList } = useResume();
  const { experience } = resume;

  const update = (id, field, value) => {
    updateList('experience', experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const remove = (id) => updateList('experience', experience.filter((e) => e.id !== id));
  const add = () => updateList('experience', [...experience, createEmptyExperience()]);

  return (
    <div>
      {experience.length === 0 && <p className="form-empty-hint">No experience added yet.</p>}

      {experience.map((e, i) => (
        <div className="entry-card" key={e.id}>
          <div className="entry-card-header">
            <span>Experience {i + 1}</span>
            <button className="entry-remove-btn" onClick={() => remove(e.id)}><FiTrash2 /></button>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Job Title</label>
              <input value={e.role} onChange={(ev) => update(e.id, 'role', ev.target.value)} placeholder="Software Engineer" />
            </div>
            <div className="field">
              <label>Company</label>
              <input value={e.company} onChange={(ev) => update(e.id, 'company', ev.target.value)} placeholder="Acme Corp" />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Location</label>
              <input value={e.location} onChange={(ev) => update(e.id, 'location', ev.target.value)} placeholder="Remote" />
            </div>
            <div className="field">
              <label>Start Date</label>
              <input value={e.startDate} onChange={(ev) => update(e.id, 'startDate', ev.target.value)} placeholder="Jan 2022" />
            </div>
          </div>

          <div className="field">
            <label>End Date</label>
            <input
              value={e.endDate}
              onChange={(ev) => update(e.id, 'endDate', ev.target.value)}
              placeholder="Present"
              disabled={e.current}
            />
          </div>

          <label className="form-checkbox">
            <input type="checkbox" checked={e.current} onChange={(ev) => update(e.id, 'current', ev.target.checked)} />
            I currently work here
          </label>

          <div className="field">
            <label>Description</label>
            <textarea value={e.description} onChange={(ev) => update(e.id, 'description', ev.target.value)} placeholder="Key responsibilities and measurable achievements..." />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add}><FiPlus /> Add Experience</button>
    </div>
  );
};

export default ExperienceForm;
