import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiDownload,
  FiPrinter,
  FiSave,
  FiUser,
  FiBookOpen,
  FiBriefcase,
  FiAward,
  FiFolder,
  FiCheckCircle,
  FiGlobe,
  FiHeart,
  FiStar,
  FiUsers,
  FiSliders,
  FiZoomIn,
  FiZoomOut,
} from 'react-icons/fi';
import AccordionItem from '../components/AccordionItem.jsx';
import CustomizationPanel from '../components/CustomizationPanel.jsx';
import TemplateRenderer from '../templates/TemplateRenderer.jsx';
import PersonalInfoForm from '../forms/PersonalInfoForm.jsx';
import EducationForm from '../forms/EducationForm.jsx';
import ExperienceForm from '../forms/ExperienceForm.jsx';
import SkillsForm from '../forms/SkillsForm.jsx';
import ProjectsForm from '../forms/ProjectsForm.jsx';
import CertificationsForm from '../forms/CertificationsForm.jsx';
import LanguagesForm from '../forms/LanguagesForm.jsx';
import InterestsForm from '../forms/InterestsForm.jsx';
import AchievementsForm from '../forms/AchievementsForm.jsx';
import ReferencesForm from '../forms/ReferencesForm.jsx';
import { useResume } from '../context/ResumeContext.jsx';
import { exportNodeToPdf } from '../utils/pdfExport';
import { getTemplateMeta } from '../utils/templatesData';
import './Editor.css';

const Editor = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { resume, loadResume, updateField, saveResume, isSaving, lastSavedAt } = useResume();
  const [tab, setTab] = useState('content');
  const [zoom, setZoom] = useState(0.72);
  const [downloading, setDownloading] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    if (resumeId) {
      const found = loadResume(resumeId);
      if (!found) navigate('/templates');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (resume.id) saveResume();
    }, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleManualSave();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  const meta = getTemplateMeta(resume.templateId);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await exportNodeToPdf(previewRef.current, `${(resume.title || 'resume').replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Sorry, the PDF could not be generated. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleManualSave = () => {
    saveResume();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  };

  return (
    <div className="editor">
      <header className="editor-topbar">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft /> Dashboard
        </button>

        <input
          className="editor-title-input"
          value={resume.title}
          onChange={(e) => updateField('title', e.target.value)}
        />

        <div className="editor-topbar-actions">
          <span className={`editor-save-status ${justSaved ? 'saved-pulse' : ''}`}>
            {isSaving ? 'Saving…' : justSaved ? 'Saved ✓' : lastSavedAt ? 'All changes saved' : ''}
          </span>
          <button
            className={`btn btn-outline btn-sm ${justSaved ? 'btn-save-success' : ''}`}
            onClick={handleManualSave}
            disabled={isSaving}
          >
            {isSaving ? <FiSave className="spin" /> : justSaved ? <FiCheckCircle /> : <FiSave />}
            {isSaving ? 'Saving…' : justSaved ? 'Saved' : 'Save'}
          </button>
          <button className="btn btn-outline btn-sm" onClick={handlePrint}>
            <FiPrinter /> Print
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleDownload} disabled={downloading}>
            <FiDownload /> {downloading ? 'Preparing…' : 'Download PDF'}
          </button>
        </div>
      </header>

      <div className="editor-body">
        <aside className="editor-left">
          <div className="editor-tabs">
            <button className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}>
              Content
            </button>
            <button className={tab === 'design' ? 'active' : ''} onClick={() => setTab('design')}>
              <FiSliders /> Design
            </button>
          </div>

          <div className="editor-left-scroll">
            {tab === 'content' ? (
              <>
                <AccordionItem title="Personal Information" icon={<FiUser />} defaultOpen>
                  <PersonalInfoForm />
                </AccordionItem>
                <AccordionItem title="Experience" icon={<FiBriefcase />} badge={resume.experience.length}>
                  <ExperienceForm />
                </AccordionItem>
                <AccordionItem title="Education" icon={<FiBookOpen />} badge={resume.education.length}>
                  <EducationForm />
                </AccordionItem>
                <AccordionItem title="Skills" icon={<FiAward />} badge={resume.skills.length}>
                  <SkillsForm />
                </AccordionItem>
                <AccordionItem title="Projects" icon={<FiFolder />} badge={resume.projects.length}>
                  <ProjectsForm />
                </AccordionItem>
                <AccordionItem title="Certifications" icon={<FiCheckCircle />} badge={resume.certifications.length}>
                  <CertificationsForm />
                </AccordionItem>
                <AccordionItem title="Languages" icon={<FiGlobe />} badge={resume.languages.length}>
                  <LanguagesForm />
                </AccordionItem>
                <AccordionItem title="Interests" icon={<FiHeart />} badge={resume.interests.length}>
                  <InterestsForm />
                </AccordionItem>
                <AccordionItem title="Achievements" icon={<FiStar />} badge={resume.achievements.length}>
                  <AchievementsForm />
                </AccordionItem>
                <AccordionItem title="References" icon={<FiUsers />} badge={resume.references.length}>
                  <ReferencesForm />
                </AccordionItem>
              </>
            ) : (
              <CustomizationPanel />
            )}
          </div>
        </aside>

        <main className="editor-right">
          <div className="editor-preview-toolbar">
            <span>{meta.name} Template</span>
            <div className="zoom-controls">
              <button onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))}><FiZoomOut /></button>
              <span>{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((z) => Math.min(1.2, z + 0.1))}><FiZoomIn /></button>
            </div>
          </div>

          <div className="editor-preview-stage">
            <div
              className="editor-preview-scaler"
              style={{ transform: `scale(${zoom})` }}
            >
              <div className="a4-page print-area" ref={previewRef}>
                <TemplateRenderer resume={resume} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Editor;
