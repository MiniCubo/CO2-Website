import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Mapa() {
  const [info, setInfo] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    // Suponiendo que 'info' es un objeto pasado desde el backend
    if (window.info) {
      setInfo(window.info);
    }
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <div>
      {info.length > 0 && (
        <div className="googleMap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1>Timelapse of CO2 Emissions in Mexico</h1>
          <div className="mapFilling">
            <div className="years">
              <select id="selectionYear" onChange={handleYearChange}>
                {info.map((state, index) => {
                  const startYear = 1979;
                  if (index > 0) {
                    return (
                      <option key={startYear + index} value={startYear + index}>
                        {startYear + index}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>
            <div className="states">
              <select id="selectionState" onChange={handleStateChange}>
                {info[0] && info[0].map((row, index) => {
                  if (index > 1) {
                    return (
                      <option key={row} value={row}>
                        {row}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>
          </div>
          <div id="map">
            <div id="popup" className="ol-popup">
              <a href="#" id="popup-closer" className="ol-popup-closer"></a>
              <div id="popup-content"><p></p></div>
            </div>
          </div>
        </div>
      )}

      {info.length > 0 && (
        <div id="output">
          <h1>Table data with the amount of vehicles circulating in Mexico from 1980 to 2023</h1>
          <table>
            {info.map((row, index) => {
              if (index === 0) {
                return (
                  <thead key={index}>
                    <tr>
                      {row.map((column, columnIndex) => (
                        <th key={columnIndex}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                );
              } else {
                return (
                  <tr key={index}>
                    {row.map((column, columnIndex) => (
                      <td key={columnIndex}>{column}</td>
                    ))}
                  </tr>
                );
              }
            })}
          </table>
        </div>
      )}
    </div>
  );
}

export default Mapa;
