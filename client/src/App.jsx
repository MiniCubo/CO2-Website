import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Mapa from './components/Mapa';
import RealTime from './components/RealTime';
import Error from './components/Error';
import './App.css'; // Si tienes estilos globales

function App() {
  return (
    <>
      <Header title="Carbon Bank" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Mapa />} />
        <Route path="/timelapse" element={<RealTime />} />
        <Route path="/error" element={<Error/>} />
      </Routes>
      <Footer />
    </>
      
  );
}

export default App;
