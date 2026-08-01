import React, { useRef } from 'react';
import { useResume } from '../context/ResumeContext.jsx';
import { FiUpload, FiX } from 'react-icons/fi';
import './forms.css';

const PersonalInfoForm = () => {
  const { resume, updateField } = useResume();
  const { personalInfo } = resume;
  const fileRef = useRef();

  const handleChange = (field) => (e) => updateField(`personalInfo.${field}`, e.target.value);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateField('personalInfo.photo', reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="field">
        <label>Profile Photo</label>
        <div className="photo-upload-row">
          {personalInfo.photo ? (
            <div className="photo-preview-wrap">
              <img src={personalInfo.photo} alt="profile" className="photo-preview" />
              <button className="photo-remove" onClick={() => updateField('personalInfo.photo', '')}>
                <FiX />
              </button>
            </div>
          ) : (
            <button className="photo-upload-btn" onClick={() => fileRef.current.click()}>
              <FiUpload /> Upload Photo
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Full Name</label>
          <input value={personalInfo.fullName} onChange={handleChange('fullName')} placeholder="Jane Doe" />
        </div>
        <div className="field">
          <label>Job Title</label>
          <input value={personalInfo.jobTitle} onChange={handleChange('jobTitle')} placeholder="Product Manager" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Email</label>
          <input value={personalInfo.email} onChange={handleChange('email')} placeholder="jane@email.com" />
        </div>
        <div className="field">
          <label>Phone</label>
          <input value={personalInfo.phone} onChange={handleChange('phone')} placeholder="+1 555 000 1111" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Address / City</label>
          <input value={personalInfo.address} onChange={handleChange('address')} placeholder="New York, NY" />
        </div>
        <div className="field">
          <label>Website / Portfolio</label>
          <input value={personalInfo.website} onChange={handleChange('website')} placeholder="janedoe.com" />
        </div>
      </div>

      <div className="field">
        <label>LinkedIn</label>
        <input value={personalInfo.linkedin} onChange={handleChange('linkedin')} placeholder="linkedin.com/in/janedoe" />
      </div>

      <div className="field">
        <label>Professional Summary</label>
        <textarea
          value={personalInfo.summary}
          onChange={handleChange('summary')}
          placeholder="A short, punchy summary of your experience and strengths..."
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
