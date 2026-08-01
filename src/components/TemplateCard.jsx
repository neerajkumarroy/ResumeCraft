import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiArrowRight } from "react-icons/fi";
import TemplateRenderer from "../templates/TemplateRenderer.jsx";
import { buildSampleResume } from "../utils/sampleResume";
import "./TemplateCard.css";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const overlayItemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const TemplateCard = ({ template, onUse }) => {
  const { id, name, description, tags } = template;
  const sampleResume = useMemo(() => buildSampleResume(id), [id]);

  // Touch devices don't have hover, so tapping the thumbnail toggles the overlay
  const [tapped, setTapped] = useState(false);

  const handleThumbClick = (e) => {
    // Only intercept the tap-to-reveal on devices without hover (mobile)
    if (window.matchMedia("(hover: hover)").matches) return;
    if (!tapped) {
      e.preventDefault();
      setTapped(true);
    }
  };

  return (
    <motion.div
      className={`tcard ${tapped ? "tcard-tapped" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="tcard-thumb" onClick={handleThumbClick}>
        <motion.div
          className="tcard-thumb-scale"
          whileHover={{ scale: 0.39 }}
          animate={{ scale: 0.365 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <TemplateRenderer resume={sampleResume} />
        </motion.div>

        <motion.div
          className="tcard-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate={tapped ? "visible" : undefined}
          whileHover="visible"
        >
          <motion.div
            variants={overlayItemVariants}
            transition={{ duration: 0.25 }}
          >
            <Link
              to={`/preview/${id}`}
              className="btn btn-outline btn-sm tcard-btn"
            >
              <FiEye /> Preview
            </Link>
          </motion.div>
          <motion.div
            variants={overlayItemVariants}
            transition={{ duration: 0.25 }}
          >
            <button
              className="btn btn-primary btn-sm tcard-btn"
              onClick={onUse}
            >
              Use Template <FiArrowRight />
            </button>
          </motion.div>
        </motion.div>

        <span className="tcard-tap-hint">Tap to preview</span>
      </div>

      <div className="tcard-info">
        <div className="tcard-info-top">
          <h4>{name}</h4>
          <div className="tcard-tags">
            {tags.map((t, i) => (
              <motion.span
                key={t}
                className="tcard-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.06 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
