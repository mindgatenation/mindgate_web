import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import PersonalPage from "./pages/PersonalPage";
import TalkToHumanPage from "./pages/TalkToHumanPage";
import Signup from "./components/Signup";
import Help from "./components/Help";
import About from "./components/About"

export default function App() {
  return (
    <div className='App-container'>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/human" element={<TalkToHumanPage />} />
      </Routes>
    </Router>
    {/* GLOBAL FOOTER */}
        {/*<footer className="footer">
          <div className="footer-links">
            <a href="/about">About</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>

          <div className="footer-text">
            © 2025 MindGate. All rights reserved.
          </div>
        </footer>*/}
    </div>
  );
}

