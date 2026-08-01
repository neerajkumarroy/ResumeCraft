import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';
import { createEmptyEducation } from '../utils/resumeModel';
import './forms.css';

const EducationForm = () => {
  const { resume, updateList } = useResume();
  const { education } = resume;

  const update = (id, field, value) => {
    updateList('education', education.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const remove = (id) => updateList('education', education.filter((e) => e.id !== id));
  const add = () => updateList('education', [...education, createEmptyEducation()]);

  return (
    <div>
      {education.length === 0 && <p className="form-empty-hint">No education added yet.</p>}

      {education.map((ed, i) => (
        <div className="entry-card" key={ed.id}>
          <div className="entry-card-header">
            <span>Education {i + 1}</span>
            <button className="entry-remove-btn" onClick={() => remove(ed.id)}><FiTrash2 /></button>
          </div>

          <div className="form-row">
            <div className="field">
              <label>School / University</label>
              <input value={ed.school} onChange={(e) => update(ed.id, 'school', e.target.value)} placeholder="Harvard University" />
            </div>
            <div className="field">
              <label>Degree</label>
              <input value={ed.degree} onChange={(e) => update(ed.id, 'degree', e.target.value)} placeholder="B.A." />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Field of Study</label>
              <input value={ed.fieldOfStudy} onChange={(e) => update(ed.id, 'fieldOfStudy', e.target.value)} placeholder="Computer Science" />
            </div>
            <div className="field">
              <label>Location</label>
              <input value={ed.location} onChange={(e) => update(ed.id, 'location', e.target.value)} placeholder="Boston, MA" />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Start Date</label>
              <input value={ed.startDate} onChange={(e) => update(ed.id, 'startDate', e.target.value)} placeholder="Aug 2016" />
            </div>
            <div className="field">
              <label>End Date</label>
              <input
                value={ed.endDate}
                onChange={(e) => update(ed.id, 'endDate', e.target.value)}
                placeholder="May 2020"
                disabled={ed.current}
              />
            </div>
          </div>

          <label className="form-checkbox">
            <input type="checkbox" checked={ed.current} onChange={(e) => update(ed.id, 'current', e.target.checked)} />
            I currently study here
          </label>

          <div className="field">
            <label>Description</label>
            <textarea value={ed.description} onChange={(e) => update(ed.id, 'description', e.target.value)} placeholder="Relevant coursework, honors, GPA..." />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add}><FiPlus /> Add Education</button>
    </div>
  );
};

export default EducationForm;
