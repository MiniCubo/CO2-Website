import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-body-secondary">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/map" className="nav-link px-2 text-body-secondary">CO2 Emissions</Link>
          </li>
          <li className="nav-item">
            <Link to="/timelapse" className="nav-link px-2 text-body-secondary">Timelapse</Link>
          </li>
        </ul>
        <p className="text-center text-body-secondary">&copy; 2024 Carbon Bank, Team 14</p>
      </footer>
    </div>
  );
}

export default Footer;
