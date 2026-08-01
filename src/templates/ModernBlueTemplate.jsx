import React from 'react';
import { getOrderedVisibleSections, formatDateRange, FONT_SIZE_MAP } from '../utils/sectionHelpers';
import './ModernBlueTemplate.css';

const ModernBlueTemplate = ({ resume }) => {
  const { personalInfo, customization } = resume;
  const { primaryColor, secondaryColor, fontFamily, fontSize } = customization;
  const sections = getOrderedVisibleSections(customization);
  const fs = FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP.medium;

  const sidebarSections = ['skills', 'languages', 'interests', 'certifications'];
  const mainSections = sections.filter((s) => !sidebarSections.includes(s));
  const sideSections = sections.filter((s) => sidebarSections.includes(s));

  return (
    <div
      className="mb-template"
      style={{
        '--tpl-primary': primaryColor,
        '--tpl-secondary': secondaryColor,
        '--tpl-font': fontFamily,
        fontSize: fs.base,
      }}
    >
      <aside className="mb-sidebar">
        {personalInfo.photo && (
          <img className="mb-photo" src={personalInfo.photo} alt={personalInfo.fullName} />
        )}
        <h1 className="mb-name" style={{ fontSize: fs.name }}>{personalInfo.fullName || 'Your Name'}</h1>
        <p className="mb-role">{personalInfo.jobTitle || 'Job Title'}</p>

        <div className="mb-contact">
          {personalInfo.email && <p>✉ {personalInfo.email}</p>}
          {personalInfo.phone && <p>☎ {personalInfo.phone}</p>}
          {personalInfo.address && <p>⚲ {personalInfo.address}</p>}
          {personalInfo.website && <p>🔗 {personalInfo.website}</p>}
          {personalInfo.linkedin && <p>in {personalInfo.linkedin}</p>}
        </div>

        {sideSections.map((key) => (
          <SideSection key={key} sectionKey={key} resume={resume} headingSize={fs.heading} />
        ))}
      </aside>

      <main className="mb-main">
        {mainSections.map((key) => (
          <MainSection key={key} sectionKey={key} resume={resume} headingSize={fs.heading} />
        ))}
      </main>
    </div>
  );
};

const SideSection = ({ sectionKey, resume, headingSize }) => {
  const { skills, languages, interests, certifications } = resume;

  if (sectionKey === 'skills' && skills.length) {
    return (
      <div className="mb-side-block">
        <h3 style={{ fontSize: headingSize }}>Skills</h3>
        {skills.map((s) => (
          <div className="mb-skill" key={s.id}>
            <span>{s.name}</span>
            <div className="mb-skill-bar">
              <div className="mb-skill-fill" style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sectionKey === 'languages' && languages.length) {
    return (
      <div className="mb-side-block">
        <h3 style={{ fontSize: headingSize }}>Languages</h3>
        {languages.map((l) => (
          <p key={l.id} className="mb-line">{l.name} <em>({l.proficiency})</em></p>
        ))}
      </div>
    );
  }

  if (sectionKey === 'interests' && interests.length) {
    return (
      <div className="mb-side-block">
        <h3 style={{ fontSize: headingSize }}>Interests</h3>
        <p className="mb-line">{interests.map((i) => i.name).join(' · ')}</p>
      </div>
    );
  }

  if (sectionKey === 'certifications' && certifications.length) {
    return (
      <div className="mb-side-block">
        <h3 style={{ fontSize: headingSize }}>Certifications</h3>
        {certifications.map((c) => (
          <p key={c.id} className="mb-line">
            <strong>{c.name}</strong>
            <br />
            {c.issuer} {c.date && `· ${c.date}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const MainSection = ({ sectionKey, resume, headingSize }) => {
  const { personalInfo, experience, education, projects, achievements, references } = resume;

  if (sectionKey === 'summary' && personalInfo.summary) {
    return (
      <section className="mb-main-block">
        <h3 style={{ fontSize: headingSize }}>Profile</h3>
        <p className="mb-summary">{personalInfo.summary}</p>
      </section>
    );
  }

  if (sectionKey === 'experience' && experience.length) {
    return (
      <section className="mb-main-block">
        <h3 style={{ fontSize: headingSize }}>Experience</h3>
        {experience.map((e) => (
          <div className="mb-entry" key={e.id}>
            <div className="mb-entry-head">
              <strong>{e.role}</strong>
              <span>{formatDateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <p className="mb-entry-sub">{e.company}{e.location ? ` · ${e.location}` : ''}</p>
            {e.description && <p className="mb-entry-desc">{e.description}</p>}
          </div>
        ))}
      </section>
    );
  }

  if (sectionKey === 'education' && education.length) {
    return (
      <section className="mb-main-block">
        <h3 style={{ fontSize: headingSize }}>Education</h3>
        {education.map((ed) => (
          <div className="mb-entry" key={ed.id}>
            <div className="mb-entry-head">
              <strong>{ed.degree}{ed.fieldOfStudy ? `, ${ed.fieldOfStudy}` : ''}</strong>
              <span>{formatDateRange(ed.startDate, ed.endDate, ed.current)}</span>
            </div>
            <p className="mb-entry-sub">{ed.school}{ed.location ? ` · ${ed.location}` : ''}</p>
            {ed.description && <p className="mb-entry-desc">{ed.description}</p>}
          </div>
        ))}
      </section>
    );
  }

  if (sectionKey === 'projects' && projects.length) {
    return (
      <section className="mb-main-block">
        <h3 style={{ fontSize: headingSize }}>Projects</h3>
        {projects.map((p) => (
          <div className="mb-entry" key={p.id}>
            <div className="mb-entry-head">
              <strong>{p.name}</strong>
              {p.link && <span className="mb-link">{p.link}</span>}
            </div>
            {p.description && <p className="mb-entry-desc">{p.description}</p>}
          </div>
        ))}
      </section>
    );
  }

  if (sectionKey === 'achievements' && achievements.length) {
    return (
      <section className="mb-main-block">
        <h3 style={{ fontSize: headingSize }}>Achievements</h3>
        {achievements.map((a) => (
          <div className="mb-entry" key={a.id}>
            <strong>{a.title}</strong>
            {a.description && <p className="mb-entry-desc">{a.description}</p>}
          </div>
        ))}
      </section>
    );
  }

  if (sectionKey === 'references' && references.length) {
    return (
      <section className="mb-main-block">
        <h3 style={{ fontSize: headingSize }}>References</h3>
        {references.map((r) => (
          <p key={r.id} className="mb-line">
            <strong>{r.name}</strong> — {r.relation} {r.contact && `· ${r.contact}`}
          </p>
        ))}
      </section>
    );
  }

  return null;
};

export default ModernBlueTemplate;
