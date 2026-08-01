import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';
import { createEmptyProject } from '../utils/resumeModel';
import './forms.css';

const ProjectsForm = () => {
  const { resume, updateList } = useResume();
  const { projects } = resume;

  const update = (id, field, value) => {
    updateList('projects', projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const remove = (id) => updateList('projects', projects.filter((p) => p.id !== id));
  const add = () => updateList('projects', [...projects, createEmptyProject()]);

  return (
    <div>
      {projects.length === 0 && <p className="form-empty-hint">No projects added yet.</p>}

      {projects.map((p, i) => (
        <div className="entry-card" key={p.id}>
          <div className="entry-card-header">
            <span>Project {i + 1}</span>
            <button className="entry-remove-btn" onClick={() => remove(p.id)}><FiTrash2 /></button>
          </div>
          <div className="field">
            <label>Project Name</label>
            <input value={p.name} onChange={(e) => update(p.id, 'name', e.target.value)} placeholder="Portfolio Website" />
          </div>
          <div className="field">
            <label>Link</label>
            <input value={p.link} onChange={(e) => update(p.id, 'link', e.target.value)} placeholder="github.com/you/project" />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea value={p.description} onChange={(e) => update(p.id, 'description', e.target.value)} placeholder="What you built and the impact it had..." />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={add}><FiPlus /> Add Project</button>
    </div>
  );
};

export default ProjectsForm;
