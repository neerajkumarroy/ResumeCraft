import React from 'react';
import { getOrderedVisibleSections, formatDateRange, FONT_SIZE_MAP } from '../utils/sectionHelpers';
import { mixColor, hexToRgba } from '../utils/colorUtils';
import './CreativeTemplate.css';

const CreativeTemplate = ({ resume }) => {
  const { personalInfo, customization } = resume;
  const { primaryColor, secondaryColor, fontFamily, fontSize } = customization;
  const sections = getOrderedVisibleSections(customization);
  const fs = FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP.medium;
  const headerEnd = mixColor(primaryColor, 60, secondaryColor || '#1e1b4b');
  const tint = hexToRgba(primaryColor, 0.12);

  return (
    <div
      className="cr-template"
      style={{
        '--tpl-primary': primaryColor,
        '--tpl-header-end': headerEnd,
        '--tpl-tint': tint,
        '--tpl-font': fontFamily,
        fontSize: fs.base,
      }}
    >
      <header className="cr-header">
        {personalInfo.photo && <img className="cr-photo" src={personalInfo.photo} alt="" />}
        <div>
          <h1 style={{ fontSize: fs.name }}>{personalInfo.fullName || 'Your Name'}</h1>
          <p className="cr-role">{personalInfo.jobTitle || 'Job Title'}</p>
        </div>
        <div className="cr-contact">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.address && <p>{personalInfo.address}</p>}
          {personalInfo.website && <p>{personalInfo.website}</p>}
        </div>
      </header>

      <div className="cr-body">
        {sections.map((key) => (
          <Section key={key} sectionKey={key} resume={resume} headingSize={fs.heading} />
        ))}
      </div>
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
    <h3 className="cr-heading" style={{ fontSize: headingSize }}><span>{children}</span></h3>
  );

  switch (sectionKey) {
    case 'summary':
      return personalInfo.summary ? (
        <section className="cr-block">
          <Heading>About Me</Heading>
          <p className="cr-text">{personalInfo.summary}</p>
        </section>
      ) : null;
    case 'experience':
      return experience.length ? (
        <section className="cr-block">
          <Heading>Experience</Heading>
          {experience.map((e) => (
            <div key={e.id} className="cr-entry">
              <div className="cr-dot" />
              <div>
                <div className="cr-entry-row">
                  <strong>{e.role}</strong>
                  <span>{formatDateRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cr-sub">{e.company}{e.location ? ` · ${e.location}` : ''}</p>
                {e.description && <p className="cr-text">{e.description}</p>}
              </div>
            </div>
          ))}
        </section>
      ) : null;
    case 'education':
      return education.length ? (
        <section className="cr-block">
          <Heading>Education</Heading>
          {education.map((ed) => (
            <div key={ed.id} className="cr-entry">
              <div className="cr-dot" />
              <div>
                <div className="cr-entry-row">
                  <strong>{ed.degree}{ed.fieldOfStudy ? `, ${ed.fieldOfStudy}` : ''}</strong>
                  <span>{formatDateRange(ed.startDate, ed.endDate, ed.current)}</span>
                </div>
                <p className="cr-sub">{ed.school}</p>
              </div>
            </div>
          ))}
        </section>
      ) : null;
    case 'skills':
      return skills.length ? (
        <section className="cr-block">
          <Heading>Skills</Heading>
          <div className="cr-tags">
            {skills.map((s) => <span key={s.id} className="cr-tag">{s.name}</span>)}
          </div>
        </section>
      ) : null;
    case 'projects':
      return projects.length ? (
        <section className="cr-block">
          <Heading>Projects</Heading>
          {projects.map((p) => (
            <div key={p.id} className="cr-entry">
              <div className="cr-dot" />
              <div>
                <strong>{p.name}</strong>
                {p.description && <p className="cr-text">{p.description}</p>}
              </div>
            </div>
          ))}
        </section>
      ) : null;
    case 'certifications':
      return certifications.length ? (
        <section className="cr-block">
          <Heading>Certifications</Heading>
          {certifications.map((c) => (
            <p key={c.id} className="cr-text">{c.name} — {c.issuer}</p>
          ))}
        </section>
      ) : null;
    case 'languages':
      return languages.length ? (
        <section className="cr-block">
          <Heading>Languages</Heading>
          <div className="cr-tags">
            {languages.map((l) => <span key={l.id} className="cr-tag">{l.name}</span>)}
          </div>
        </section>
      ) : null;
    case 'interests':
      return interests.length ? (
        <section className="cr-block">
          <Heading>Interests</Heading>
          <div className="cr-tags">
            {interests.map((i) => <span key={i.id} className="cr-tag">{i.name}</span>)}
          </div>
        </section>
      ) : null;
    case 'achievements':
      return achievements.length ? (
        <section className="cr-block">
          <Heading>Achievements</Heading>
          {achievements.map((a) => <p key={a.id} className="cr-text"><strong>{a.title}</strong> — {a.description}</p>)}
        </section>
      ) : null;
    case 'references':
      return references.length ? (
        <section className="cr-block">
          <Heading>References</Heading>
          {references.map((r) => <p key={r.id} className="cr-text">{r.name} — {r.relation}</p>)}
        </section>
      ) : null;
    default:
      return null;
  }
};

export default CreativeTemplate;
