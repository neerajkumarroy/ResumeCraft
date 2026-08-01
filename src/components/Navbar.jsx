import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiFileText } from "react-icons/fi";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/templates", label: "Templates" },
  { to: "/dashboard", label: "My Resumes" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">
            <FiFileText />
          </span>

          <span>ResumeCraft</span>
        </Link>

        {/* Desktop Links */}
        <nav className="navbar-links navbar-links-desktop">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="navbar-actions navbar-links-desktop">
          <Link to="/templates" className="btn btn-primary btn-sm">
            Create Resume
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="navbar-burger" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${open ? "open" : ""}`}>
        {NAV_LINKS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="navbar-mobile-link"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
