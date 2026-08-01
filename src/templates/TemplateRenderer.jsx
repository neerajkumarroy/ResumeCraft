import React from 'react';
import ModernBlueTemplate from './ModernBlueTemplate';
import ATSProfessionalTemplate from './ATSProfessionalTemplate';
import CreativeTemplate from './CreativeTemplate';
import MinimalTemplate from './MinimalTemplate';

// Every template id maps to one of the 4 core layout engines above.
// "corporate" and "executive" reuse the sidebar layout with formal color/font
// presets; "fresher" reuses the ATS single-column layout with a friendlier
// accent; "elegant" reuses the Minimal layout with serif typography.
// This keeps the codebase DRY while still giving each gallery card its own
// distinct look via customization.primaryColor / fontFamily set in
// utils/templatesData.js.
const LAYOUT_MAP = {
  'modern-blue': ModernBlueTemplate,
  corporate: ModernBlueTemplate,
  executive: ModernBlueTemplate,
  'ats-professional': ATSProfessionalTemplate,
  fresher: ATSProfessionalTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  elegant: MinimalTemplate,
};

const TemplateRenderer = ({ resume }) => {
  const Layout = LAYOUT_MAP[resume.templateId] || ModernBlueTemplate;
  return <Layout resume={resume} />;
};

export default TemplateRenderer;
