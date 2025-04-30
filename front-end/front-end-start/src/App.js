import React, { useState, useEffect} from 'react'
import {DeviceProvider} from './context/DeviceContext'
import {SystemProvider} from './context/SystemContext'
import {Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import SignPage from './pages/SignPage'
import ControlPage from './pages/ControlPage'
import LandingPage from './pages/LandingPage'
import ModulePage from './pages/ModulePage'
import "./index.css";

function App() {

  return (
    <DeviceProvider>
    <SystemProvider>
    <div>
      <Routes>
        <Route path="/" element={<SignPage />} />
        <Route path="register" element={<RegisterPage />} /> 
        <Route path="control" element={<ControlPage />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="module" element={<ModulePage />} />
      </Routes>
    </div>
    </SystemProvider>
    </DeviceProvider>
  );
}

export default App;
