import React from 'react';
import { FiEye, FiEyeOff, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';
import { SECTION_LABELS } from '../utils/resumeModel';
import './CustomizationPanel.css';

const FONT_OPTIONS = ['Inter', 'Poppins', 'Roboto', 'Lato', 'Merriweather', 'Playfair Display'];
const SIZE_OPTIONS = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
];
const COLOR_SWATCHES = ['#4f46e5', '#0f4c81', '#0d9488', '#ea580c', '#b91c1c', '#7c2d12', '#111827', '#111', '#1e1b4b'];

const CustomizationPanel = () => {
  const { resume, updateField } = useResume();
  const { customization } = resume;

  const toggleVisibility = (key) => {
    updateField(`customization.sectionVisibility.${key}`, !customization.sectionVisibility[key]);
  };

  const moveSection = (index, direction) => {
    const order = [...customization.sectionOrder];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= order.length) return;
    [order[index], order[newIndex]] = [order[newIndex], order[index]];
    updateField('customization.sectionOrder', order);
  };

  return (
    <div className="custom-panel">
      <div className="custom-block">
        <h4>Primary Color</h4>
        <div className="color-row">
          {COLOR_SWATCHES.map((c) => (
            <button
              key={c}
              className={`color-swatch ${customization.primaryColor === c ? 'active' : ''}`}
              style={{ background: c }}
              onClick={() => updateField('customization.primaryColor', c)}
            />
          ))}
          <input
            type="color"
            className="color-custom"
            value={customization.primaryColor}
            onChange={(e) => updateField('customization.primaryColor', e.target.value)}
          />
        </div>
      </div>

      <div className="custom-block">
        <h4>Secondary Color</h4>
        <div className="color-row">
          {COLOR_SWATCHES.map((c) => (
            <button
              key={c}
              className={`color-swatch ${customization.secondaryColor === c ? 'active' : ''}`}
              style={{ background: c }}
              onClick={() => updateField('customization.secondaryColor', c)}
            />
          ))}
          <input
            type="color"
            className="color-custom"
            value={customization.secondaryColor}
            onChange={(e) => updateField('customization.secondaryColor', e.target.value)}
          />
        </div>
      </div>

      <div className="custom-block">
        <h4>Font Family</h4>
        <select
          value={customization.fontFamily}
          onChange={(e) => updateField('customization.fontFamily', e.target.value)}
        >
          {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      <div className="custom-block">
        <h4>Font Size</h4>
        <div className="size-row">
          {SIZE_OPTIONS.map((s) => (
            <button
              key={s.id}
              className={`size-btn ${customization.fontSize === s.id ? 'active' : ''}`}
              onClick={() => updateField('customization.fontSize', s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="custom-block">
        <h4>Section Order & Visibility</h4>
        <div className="section-order-list">
          {customization.sectionOrder.map((key, index) => (
            <div className="section-order-item" key={key}>
              <span>{SECTION_LABELS[key]}</span>
              <div className="section-order-actions">
                <button onClick={() => moveSection(index, -1)} disabled={index === 0}><FiArrowUp /></button>
                <button onClick={() => moveSection(index, 1)} disabled={index === customization.sectionOrder.length - 1}><FiArrowDown /></button>
                <button onClick={() => toggleVisibility(key)} className={customization.sectionVisibility[key] ? '' : 'hidden-toggle'}>
                  {customization.sectionVisibility[key] ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
