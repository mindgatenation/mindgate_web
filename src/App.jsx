import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Ensure Login.jsx and Login.css are in the same folder
import Signup from './components/Signup';
import Help from './components/Help';
import About from './components/About';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;