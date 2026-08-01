import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit2, FiCopy, FiTrash2, FiClock } from 'react-icons/fi';
import TemplateRenderer from '../templates/TemplateRenderer.jsx';
import { getTemplateMeta } from '../utils/templatesData';
import './ResumeCard.css';

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const ResumeCard = ({ resume, onDelete, onDuplicate }) => {
  const navigate = useNavigate();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const meta = getTemplateMeta(resume.templateId);

  return (
    <motion.div
      className="rcard"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
    >
      <div className="rcard-thumb" onClick={() => navigate(`/editor/${resume.id}`)}>
        <div className="rcard-thumb-scale">
          <TemplateRenderer resume={resume} />
        </div>
        <div className="rcard-thumb-fade" />
      </div>

      <div className="rcard-body">
        <h4>{resume.title || 'Untitled Resume'}</h4>
        <p className="rcard-meta">
          {meta.name} · <FiClock /> {formatDate(resume.updatedAt)}
        </p>

        <div className="rcard-actions">
          <button className="btn btn-outline btn-sm" onClick={() => navigate(`/editor/${resume.id}`)}>
            <FiEdit2 /> Edit
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => onDuplicate(resume.id)}>
            <FiCopy /> Duplicate
          </button>
          {confirmingDelete ? (
            <div className="rcard-confirm">
              <span>Delete?</span>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(resume.id)}>Yes</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setConfirmingDelete(false)}>No</button>
            </div>
          ) : (
            <button className="btn btn-ghost btn-sm rcard-delete" onClick={() => setConfirmingDelete(true)}>
              <FiTrash2 />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeCard;
