import React from "react";
import { Link } from "react-router-dom";
import { FiFileText, FiTwitter, FiLinkedin, FiInstagram } from "react-icons/fi";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="navbar-logo-icon">
              <FiFileText />
            </span>
            ResumeCraft
          </div>
          <p className="footer-tagline">
            Build a polished, recruiter-ready resume in minutes — no design
            skills required.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="#" aria-label="Instagram">
              <FiInstagram />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <Link to="/templates">Templates</Link>
          <Link to="/dashboard">My Resumes</Link>
          <a href="#features">Features</a>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ResumeCraft. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
