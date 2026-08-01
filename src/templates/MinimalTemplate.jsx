import React from 'react';
import { getOrderedVisibleSections, formatDateRange, FONT_SIZE_MAP } from '../utils/sectionHelpers';
import './MinimalTemplate.css';

const MinimalTemplate = ({ resume }) => {
  const { personalInfo, customization } = resume;
  const { primaryColor, fontFamily, fontSize } = customization;
  const sections = getOrderedVisibleSections(customization);
  const fs = FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP.medium;

  return (
    <div
      className="min-template"
      style={{ '--tpl-primary': primaryColor, '--tpl-font': fontFamily, fontSize: fs.base }}
    >
      <header className="min-header">
        <h1 style={{ fontSize: fs.name }}>{personalInfo.fullName || 'Your Name'}</h1>
        <p className="min-role">{personalInfo.jobTitle || 'Job Title'}</p>
        <p className="min-contact">
          {[personalInfo.email, personalInfo.phone, personalInfo.address]
            .filter(Boolean)
            .join('    ')}
        </p>
      </header>

      {sections.map((key) => (
        <Section key={key} sectionKey={key} resume={resume} headingSize={fs.heading} />
      ))}
    </div>
  );
};

const Section = ({ sectionKey, resume, headingSize }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    interests,
    achievements,
    references,
  } = resume;

  const Heading = ({ children }) => (
    <h3 className="min-heading" style={{ fontSize: headingSize }}>{children}</h3>
  );

  switch (sectionKey) {
    case 'summary':
      return personalInfo.summary ? (
        <section className="min-block">
          <Heading>Profile</Heading>
          <p className="min-text">{personalInfo.summary}</p>
        </section>
      ) : null;
    case 'experience':
      return experience.length ? (
        <section className="min-block">
          <Heading>Experience</Heading>
          {experience.map((e) => (
            <div key={e.id} className="min-entry">
              <div className="min-entry-row">
                <strong>{e.role}, {e.company}</strong>
                <span>{formatDateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              {e.description && <p className="min-text">{e.description}</p>}
            </div>
          ))}
        </section>
      ) : null;
    case 'education':
      return education.length ? (
        <section className="min-block">
          <Heading>Education</Heading>
          {education.map((ed) => (
            <div key={ed.id} className="min-entry">
              <div className="min-entry-row">
                <strong>{ed.degree}, {ed.school}</strong>
                <span>{formatDateRange(ed.startDate, ed.endDate, ed.current)}</span>
              </div>
            </div>
          ))}
        </section>
      ) : null;
    case 'skills':
      return skills.length ? (
        <section className="min-block">
          <Heading>Skills</Heading>
          <p className="min-text">{skills.map((s) => s.name).join(', ')}</p>
        </section>
      ) : null;
    case 'projects':
      return projects.length ? (
        <section className="min-block">
          <Heading>Projects</Heading>
          {projects.map((p) => (
            <div key={p.id} className="min-entry">
              <strong>{p.name}</strong>
              {p.description && <p className="min-text">{p.description}</p>}
            </div>
          ))}
        </section>
      ) : null;
    case 'certifications':
      return certifications.length ? (
        <section className="min-block">
          <Heading>Certifications</Heading>
          {certifications.map((c) => <p key={c.id} className="min-text">{c.name} — {c.issuer}</p>)}
        </section>
      ) : null;
    case 'languages':
      return languages.length ? (
        <section className="min-block">
          <Heading>Languages</Heading>
          <p className="min-text">{languages.map((l) => l.name).join(', ')}</p>
        </section>
      ) : null;
    case 'interests':
      return interests.length ? (
        <section className="min-block">
          <Heading>Interests</Heading>
          <p className="min-text">{interests.map((i) => i.name).join(', ')}</p>
        </section>
      ) : null;
    case 'achievements':
      return achievements.length ? (
        <section className="min-block">
          <Heading>Achievements</Heading>
          {achievements.map((a) => <p key={a.id} className="min-text"><strong>{a.title}</strong> — {a.description}</p>)}
        </section>
      ) : null;
    case 'references':
      return references.length ? (
        <section className="min-block">
          <Heading>References</Heading>
          {references.map((r) => <p key={r.id} className="min-text">{r.name} — {r.relation}</p>)}
        </section>
      ) : null;
    default:
      return null;
  }
};

export default MinimalTemplate;
