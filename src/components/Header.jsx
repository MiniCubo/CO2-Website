import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <img src="./images/mjolnir.png" alt="Descripción de la imagen" width="40" height="32" />
          <span className="fs-4">Carbon Bank</span>
        </Link>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/co2" className="nav-link">CO2 Emissions</Link>
          </li>
          <li className="nav-item">
            <Link to="/timelapse" className="nav-link">Timelapse</Link>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
