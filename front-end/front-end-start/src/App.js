import React, { useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import SignPage from './pages/SignPage'
import ControlPage from './pages/ControlPage'
import LandingPage from './pages/LandingPage'
import ModulePage from './pages/ModulePage'
import "./index.css";

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignPage />} />
        <Route path="register" element={<RegisterPage />} /> 
        <Route path="control" element={<ControlPage />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="module" element={<ModulePage />} />
      </Routes>
    </div>
  );
}

export default App;
