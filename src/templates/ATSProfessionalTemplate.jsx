import React from 'react';
import { getOrderedVisibleSections, formatDateRange, FONT_SIZE_MAP } from '../utils/sectionHelpers';
import './ATSProfessionalTemplate.css';

const ATSProfessionalTemplate = ({ resume }) => {
  const { personalInfo, customization } = resume;
  const { primaryColor, fontFamily, fontSize } = customization;
  const sections = getOrderedVisibleSections(customization);
  const fs = FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP.medium;

  return (
    <div
      className="ats-template"
      style={{ '--tpl-primary': primaryColor, '--tpl-font': fontFamily, fontSize: fs.base }}
    >
      <header className="ats-header">
        <h1 style={{ fontSize: fs.name }}>{personalInfo.fullName || 'Your Name'}</h1>
        <p className="ats-role">{personalInfo.jobTitle || 'Job Title'}</p>
        <p className="ats-contact-line">
          {[personalInfo.email, personalInfo.phone, personalInfo.address, personalInfo.linkedin]
            .filter(Boolean)
            .join('   |   ')}
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
    <h3 className="ats-heading" style={{ fontSize: headingSize }}>{children}</h3>
  );

  switch (sectionKey) {
    case 'summary':
      return personalInfo.summary ? (
        <section className="ats-block">
          <Heading>Summary</Heading>
          <p className="ats-text">{personalInfo.summary}</p>
        </section>
      ) : null;

    case 'experience':
      return experience.length ? (
        <section className="ats-block">
          <Heading>Experience</Heading>
          {experience.map((e) => (
            <div key={e.id} className="ats-entry">
              <div className="ats-entry-row">
                <strong>{e.role} — {e.company}</strong>
                <span>{formatDateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              {e.location && <p className="ats-sub">{e.location}</p>}
              {e.description && <p className="ats-text">{e.description}</p>}
            </div>
          ))}
        </section>
      ) : null;

    case 'education':
      return education.length ? (
        <section className="ats-block">
          <Heading>Education</Heading>
          {education.map((ed) => (
            <div key={ed.id} className="ats-entry">
              <div className="ats-entry-row">
                <strong>{ed.degree}{ed.fieldOfStudy ? `, ${ed.fieldOfStudy}` : ''} — {ed.school}</strong>
                <span>{formatDateRange(ed.startDate, ed.endDate, ed.current)}</span>
              </div>
              {ed.description && <p className="ats-text">{ed.description}</p>}
            </div>
          ))}
        </section>
      ) : null;

    case 'skills':
      return skills.length ? (
        <section className="ats-block">
          <Heading>Skills</Heading>
          <p className="ats-text">{skills.map((s) => s.name).filter(Boolean).join(' • ')}</p>
        </section>
      ) : null;

    case 'projects':
      return projects.length ? (
        <section className="ats-block">
          <Heading>Projects</Heading>
          {projects.map((p) => (
            <div key={p.id} className="ats-entry">
              <strong>{p.name}</strong>{p.link && <span className="ats-sub"> — {p.link}</span>}
              {p.description && <p className="ats-text">{p.description}</p>}
            </div>
          ))}
        </section>
      ) : null;

    case 'certifications':
      return certifications.length ? (
        <section className="ats-block">
          <Heading>Certifications</Heading>
          {certifications.map((c) => (
            <p key={c.id} className="ats-text">
              {c.name} — {c.issuer} {c.date && `(${c.date})`}
            </p>
          ))}
        </section>
      ) : null;

    case 'languages':
      return languages.length ? (
        <section className="ats-block">
          <Heading>Languages</Heading>
          <p className="ats-text">{languages.map((l) => `${l.name} (${l.proficiency})`).join(' • ')}</p>
        </section>
      ) : null;

    case 'achievements':
      return achievements.length ? (
        <section className="ats-block">
          <Heading>Achievements</Heading>
          {achievements.map((a) => (
            <p key={a.id} className="ats-text"><strong>{a.title}:</strong> {a.description}</p>
          ))}
        </section>
      ) : null;

    case 'interests':
      return interests.length ? (
        <section className="ats-block">
          <Heading>Interests</Heading>
          <p className="ats-text">{interests.map((i) => i.name).join(' • ')}</p>
        </section>
      ) : null;

    case 'references':
      return references.length ? (
        <section className="ats-block">
          <Heading>References</Heading>
          {references.map((r) => (
            <p key={r.id} className="ats-text">{r.name} — {r.relation} {r.contact && `(${r.contact})`}</p>
          ))}
        </section>
      ) : null;

    default:
      return null;
  }
};

export default ATSProfessionalTemplate;
