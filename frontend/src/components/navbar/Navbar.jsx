import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onPreviewToggle }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light gradient-bg  shadow-lg" style={{marginBottom:"40px"}}>
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#" style={{ fontSize: "25px" }}>
          Form Builder
        </a>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ background: 'white' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Question Link */}
            <li className="nav-item mx-4">
              <Link className="nav-link text-white" to="/question">
                Question
              </Link>
            </li>
            
            {/* Preview Link */}
            <li className="nav-item mx-4">
              <button className="nav-link text-white" onClick={onPreviewToggle}>
                Toggle Preview
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
