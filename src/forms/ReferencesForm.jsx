import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';
import { createEmptyReference } from '../utils/resumeModel';
import './forms.css';

const ReferencesForm = () => {
  const { resume, updateList } = useResume();
  const { references } = resume;

  const update = (id, field, value) => {
    updateList('references', references.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const remove = (id) => updateList('references', references.filter((r) => r.id !== id));
  const add = () => updateList('references', [...references, createEmptyReference()]);

  return (
    <div>
      {references.length === 0 && <p className="form-empty-hint">No references added yet.</p>}

      {references.map((r, i) => (
        <div className="entry-card" key={r.id}>
          <div className="entry-card-header">
            <span>Reference {i + 1}</span>
            <button className="entry-remove-btn" onClick={() => remove(r.id)}><FiTrash2 /></button>
          </div>
          <div className="form-row">
            <div className="field">
              <label>Name</label>
              <input value={r.name} onChange={(e) => update(r.id, 'name', e.target.value)} placeholder="John Smith" />
            </div>
            <div className="field">
              <label>Relation / Title</label>
              <input value={r.relation} onChange={(e) => update(r.id, 'relation', e.target.value)} placeholder="Former Manager" />
            </div>
          </div>
          <div className="field">
            <label>Contact</label>
            <input value={r.contact} onChange={(e) => update(r.id, 'contact', e.target.value)} placeholder="john@email.com" />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add}><FiPlus /> Add Reference</button>
    </div>
  );
};

export default ReferencesForm;
