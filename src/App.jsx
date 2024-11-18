import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Mapa from './components/Mapa';
import RealTime from './components/RealTime';
import './App.css'; // Si tienes estilos globales

function App() {
  return (
    <Router>
      <Header title="Carbon Bank" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/co2" element={<Mapa />} />
        <Route path="/timelapse" element={<RealTime />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
