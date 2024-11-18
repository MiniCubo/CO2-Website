import React from 'react';
import Header from './Header'; // Asumiendo que tienes un componente de Header
import Footer from './Footer'; // Asumiendo que tienes un componente de Footer

function RealTime() {
  return (
    <>
      <div className="googleMap" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1>Real Time Map of CO2 emissions in Mexico</h1>
        <iframe
          title="Real Time CO2 Emissions Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091644!2d144.95373531550447!3d-37.816218979751634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d9b9b5d233b1!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1604372692789!5m2!1sen!2sau"
          width="600"
          height="450"
          style={{ border: '0' }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}

export default RealTime;
