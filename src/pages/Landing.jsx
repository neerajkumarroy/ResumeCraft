import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import resumeImage from "../assets/images/5.png";
import ResumeMockup from "../assets/images/9.png";

import {
  FiEdit3,
  FiCheckCircle,
  FiEye,
  FiDownload,
  FiLayers,
  FiShield,
  FiZap,
  FiSmartphone,
  FiChevronDown,
} from "react-icons/fi";
import { TEMPLATES } from "../utils/templatesData";
import TemplateRenderer from "../templates/TemplateRenderer.jsx";
import { buildSampleResume } from "../utils/sampleResume";
import "./Landing.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
};

const FEATURES = [
  {
    icon: <FiLayers />,
    title: "Professional Templates",
    text: "Eight recruiter-approved layouts for every industry and career stage.",
  },
  {
    icon: <FiEye />,
    title: "Real-Time Preview",
    text: "Watch your resume update instantly as you type — no surprises at export.",
  },
  {
    icon: <FiEdit3 />,
    title: "Full Customization",
    text: "Tune colors, fonts, and section order while the layout stays polished.",
  },
  {
    icon: <FiDownload />,
    title: "High-Quality PDF",
    text: "Export a crisp, print-ready PDF that matches your preview pixel for pixel.",
  },
  {
    icon: <FiShield />,
    title: "ATS-Friendly",
    text: "Templates built to parse cleanly through applicant tracking systems.",
  },
  {
    icon: <FiSmartphone />,
    title: "Fully Responsive",
    text: "Build your resume comfortably from your phone, tablet, or desktop.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Pick a Template",
    text: "Browse our gallery and choose the design that fits your goals.",
  },
  {
    n: "02",
    title: "Add Your Details",
    text: "Fill in guided sections for experience, education, skills & more.",
  },
  {
    n: "03",
    title: "Customize the Look",
    text: "Adjust colors, fonts and section order to make it your own.",
  },
  {
    n: "04",
    title: "Download & Apply",
    text: "Export a polished PDF and start sending it to recruiters.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sakshi Rawat",
    role: "Marketing Manager",
    quote:
      "Landed three interview calls the same week I switched to my ResumeCraft resume.",
  },
  {
    name: "Sandeep Verma",
    role: "Software Engineer",
    quote:
      "The ATS template is exactly what I needed — clean, fast, and it actually parses correctly.",
  },
  {
    name: "Jubar Iqbal",
    role: "UX Designer",
    quote:
      "Finally a builder where the templates look as good as the mockups. Genuinely premium.",
  },
];

const FAQS = [
  {
    q: "Is ResumeCraft free to use?",
    a: "You can build and preview your resume at no cost. Downloading a polished PDF takes just one click once you\u2019re happy with it.",
  },
  {
    q: "Will my resume pass ATS screening?",
    a: "Yes — our ATS Professional and Fresher templates use single-column, graphic-free layouts designed to parse cleanly.",
  },
  {
    q: "Can I change templates after I start editing?",
    a: "Your content is kept separately from the layout, so you can preview and switch templates without losing anything you\u2019ve written.",
  },
  {
    q: "Where is my resume data stored?",
    a: "Your resumes are saved securely in your browser so you can come back and edit any time — with cloud sync coming soon.",
  },
];

const Landing = () => {
  const featured = TEMPLATES.slice(0, 4);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="landing">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-grid" />
        </div>

        <div className="container hero-inner">
          {/* LEFT: content */}
          <div className="hero-content">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0}
            >
              <span className="section-eyebrow">
                Trusted by 50,000+ job seekers
              </span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={1}
            >
              Build a Resume That
              <span className="hero-title-gradient"> Gets You Hired</span>
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={2}
            >
              Choose a premium template, fill in your details, and export a
              beautifully designed, ATS-friendly resume — in minutes, not hours.
            </motion.p>

            <motion.div
              className="hero-cta"
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={3}
            >
              <Link to="/templates" className="btn btn-primary">
                Browse Templates
              </Link>
              {/* <Link to="/dashboard" className="btn btn-outline">
                My Resumes
              </Link> */}
            </motion.div>
          </div>

          {/* RIGHT: image */}
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={ResumeMockup} alt="Resume Preview" />
          </motion.div>
        </div>
      </section>

      {/* FEATURED TEMPLATES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Templates</span>
            <h2 className="section-title">Featured Resume Templates</h2>
            <p className="section-subtitle">
              Every template is hand-crafted and fully customizable, without
              ever breaking the layout.
            </p>
          </div>

          <div className="template-strip">
            {featured.map((t, i) => (
              <motion.div
                key={t.id}
                className="template-strip-card"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
              >
                <div className="template-strip-thumb">
                  <div className="template-strip-thumb-scale">
                    <TemplateRenderer resume={buildSampleResume(t.id)} />
                  </div>
                </div>
                <div className="template-strip-info">
                  <h4>{t.name}</h4>
                  <Link to={`/preview/${t.id}`} className="template-strip-link">
                    {" "}
                    Preview →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="section-cta-row">
            <Link to="/templates" className="btn btn-outline">
              View All Templates
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section section-alt" id="features">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Features</span>
            <h2 className="section-title">
              Everything You Need, Nothing You Don't
            </h2>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="feature-card"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
              >
                <div className="feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container why-grid">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="section-eyebrow">Why Choose Us</span>

            <h2 className="section-title" style={{ marginBottom: 18 }}>
              Designed by Recruiters' Standards
            </h2>

            <p className="section-subtitle" style={{ margin: "0 0 26px" }}>
              We studied what hiring managers actually scan for, then built
              templates and guardrails so you can't accidentally break what
              works.
            </p>

            <ul className="why-list">
              <li>
                <FiZap /> Locked layouts keep every template looking
                professional
              </li>
              <li>
                <FiShield /> ATS-tested structure for reliable parsing
              </li>
              <li>
                <FiLayers /> Reorder or hide sections without touching design
              </li>
              <li>
                <FiDownload /> Pixel-accurate PDF export, every time
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="why-visual"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <img src={resumeImage} alt="Resume Preview" className="why-image" />
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Process</span>
            <h2 className="section-title">How It Works</h2>
          </div>

          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                className="step-card"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                custom={i}
              >
                <span className="step-number">{s.n}</span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Testimonials</span>
            <h2 className="section-title">Loved by Job Seekers Everywhere</h2>
          </div>

          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                className="testimonial-card"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
              >
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-person">
                  <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container faq-wrap">
          <div className="section-head">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={f.q} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  {f.q}
                  <FiChevronDown
                    className={`faq-icon ${openFaq === i ? "open" : ""}`}
                  />
                </button>
                {openFaq === i && <p className="faq-answer">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section final-cta">
        <div className="container final-cta-inner">
          <h2>Ready to build your standout resume?</h2>
          <p>
            Join thousands of job seekers who landed interviews with
            ResumeCraft.
          </p>
          <Link to="/templates" className="btn btn-primary btn-lg">
            Get Started — It's Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
