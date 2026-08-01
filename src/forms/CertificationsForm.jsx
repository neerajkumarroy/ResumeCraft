import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';
import { createEmptyCertification } from '../utils/resumeModel';
import './forms.css';

const CertificationsForm = () => {
  const { resume, updateList } = useResume();
  const { certifications } = resume;

  const update = (id, field, value) => {
    updateList('certifications', certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const remove = (id) => updateList('certifications', certifications.filter((c) => c.id !== id));
  const add = () => updateList('certifications', [...certifications, createEmptyCertification()]);

  return (
    <div>
      {certifications.length === 0 && <p className="form-empty-hint">No certifications added yet.</p>}

      {certifications.map((c, i) => (
        <div className="entry-card" key={c.id}>
          <div className="entry-card-header">
            <span>Certification {i + 1}</span>
            <button className="entry-remove-btn" onClick={() => remove(c.id)}><FiTrash2 /></button>
          </div>
          <div className="field">
            <label>Certification Name</label>
            <input value={c.name} onChange={(e) => update(c.id, 'name', e.target.value)} placeholder="AWS Certified Solutions Architect" />
          </div>
          <div className="form-row">
            <div className="field">
              <label>Issuer</label>
              <input value={c.issuer} onChange={(e) => update(c.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
            </div>
            <div className="field">
              <label>Date</label>
              <input value={c.date} onChange={(e) => update(c.id, 'date', e.target.value)} placeholder="2023" />
            </div>
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add}><FiPlus /> Add Certification</button>
    </div>
  );
};

export default CertificationsForm;
