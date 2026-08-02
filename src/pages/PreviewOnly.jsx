import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import TemplateRenderer from "../templates/TemplateRenderer.jsx";
import { buildSampleResume } from "../utils/sampleResume";
import { getTemplateMeta } from "../utils/templatesData";
import { useResume } from "../context/ResumeContext.jsx";
import { upsertResume } from "../services/storageService";
import "./PreviewOnly.css";

const PreviewOnly = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { startNewResume } = useResume();
  const resume = useMemo(() => buildSampleResume(templateId), [templateId]);
  const meta = getTemplateMeta(templateId);

  const handleUseTemplate = () => {
    const fresh = startNewResume(templateId);
    upsertResume(fresh);
    navigate(`/editor/${fresh.id}`);
  };

  return (
    <div className="preview-only">
      <div className="preview-only-bar">
        <button
          className="btn btn-ghost"
          onClick={() => navigate("/templates")}
        >
          <FiArrowLeft /> <span>Back to templates</span>
        </button>
        <div className="preview-only-title">{meta.name}</div>
        <button className="btn btn-primary" onClick={handleUseTemplate}>
          <span>Use This Template</span>
        </button>
      </div>

      <div className="preview-only-stage">
        <div className="preview-only-page">
          <TemplateRenderer resume={resume} />
        </div>
      </div>
    </div>
  );
};

export default PreviewOnly;
