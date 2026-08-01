import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './AccordionItem.css';

const AccordionItem = ({ title, icon, defaultOpen = false, badge, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`accordion-item ${open ? 'open' : ''}`}>
      <button className="accordion-header" onClick={() => setOpen((o) => !o)}>
        <span className="accordion-header-left">
          {icon && <span className="accordion-icon">{icon}</span>}
          {title}
          {badge > 0 && <span className="accordion-badge">{badge}</span>}
        </span>
        <FiChevronDown className={`accordion-chevron ${open ? 'open' : ''}`} />
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
};

export default AccordionItem;
