import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TemplateCard from '../components/TemplateCard.jsx';
import { TEMPLATES } from '../utils/templatesData';
import { useResume } from '../context/ResumeContext.jsx';
import { upsertResume } from '../services/storageService';
import './Templates.css';

const FILTERS = ['All', 'Popular', 'ATS-Friendly', 'Minimal', 'Bold', 'Formal', 'Premium', 'Serif', 'Entry-level'];

const Templates = () => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const { startNewResume } = useResume();

  const visible =
    filter === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.tags.includes(filter));

  const handleUseTemplate = (templateId) => {
    const fresh = startNewResume(templateId);
    upsertResume(fresh);
    navigate(`/editor/${fresh.id}`);
  };

  return (
    <div className="templates-page container">
      <div className="templates-head">
        <span className="section-eyebrow">Template Gallery</span>
        <h1 className="section-title">Choose Your Resume Template</h1>
        <p className="section-subtitle">
          Every design is fully customizable — colors, fonts, and section order — while the
          professional layout stays intact.
        </p>
      </div>

      <div className="templates-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`templates-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="templates-grid">
        {visible.map((t) => (
          <TemplateCard key={t.id} template={t} onUse={() => handleUseTemplate(t.id)} />
        ))}
      </motion.div>
    </div>
  );
};

export default Templates;
