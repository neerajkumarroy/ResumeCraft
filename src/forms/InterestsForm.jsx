import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';
import { createEmptyInterest } from '../utils/resumeModel';
import './forms.css';

const InterestsForm = () => {
  const { resume, updateList } = useResume();
  const { interests } = resume;

  const update = (id, value) => {
    updateList('interests', interests.map((i) => (i.id === id ? { ...i, name: value } : i)));
  };

  const remove = (id) => updateList('interests', interests.filter((i) => i.id !== id));
  const add = () => updateList('interests', [...interests, createEmptyInterest()]);

  return (
    <div>
      {interests.length === 0 && <p className="form-empty-hint">No interests added yet.</p>}

      {interests.map((i) => (
        <div className="entry-card" key={i.id}>
          <div className="entry-card-header">
            <span>Interest</span>
            <button className="entry-remove-btn" onClick={() => remove(i.id)}><FiTrash2 /></button>
          </div>
          <div className="field">
            <input value={i.name} onChange={(e) => update(i.id, e.target.value)} placeholder="Photography" />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add}><FiPlus /> Add Interest</button>
    </div>
  );
};

export default InterestsForm;
