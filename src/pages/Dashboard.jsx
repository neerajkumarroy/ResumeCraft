import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiPlus, FiFileText } from 'react-icons/fi';
import ResumeCard from '../components/ResumeCard.jsx';
import { useDashboard } from '../context/DashboardContext.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const { resumes, removeResume, duplicateResume } = useDashboard();
  const navigate = useNavigate();

  return (
    <div className="dashboard container">
      <div className="dashboard-head">
        <div>
          <h1 className="section-title">My Resumes</h1>
          <p className="section-subtitle" style={{ margin: '10px 0 0' }}>
            Pick up where you left off, or start a brand new resume.
          </p>
        </div>
        <Link to="/templates" className="btn btn-primary">
          <FiPlus /> Create Resume
        </Link>
      </div>

      {resumes.length === 0 ? (
        <motion.div
          className="dashboard-empty"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="dashboard-empty-icon"><FiFileText /></div>
          <h3>No resumes yet</h3>
          <p>Browse our templates and create your first resume in minutes.</p>
          <button className="btn btn-primary" onClick={() => navigate('/templates')}>
            Browse Templates
          </button>
        </motion.div>
      ) : (
        <motion.div layout className="dashboard-grid">
          <AnimatePresence>
            {resumes
              .slice()
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .map((r) => (
                <ResumeCard
                  key={r.id}
                  resume={r}
                  onDelete={removeResume}
                  onDuplicate={duplicateResume}
                />
              ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
