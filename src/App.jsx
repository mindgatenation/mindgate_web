import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import PersonalPage from "./pages/PersonalPage";
import TalkToHumanPage from "./pages/TalkToHumanPage";
import SettingsPage from "./pages/SettingsPage";

// Tejas pages (inside components folder)
import Login from "./components/Login";
import Signup from "./components/Signup";
import Help from "./components/Help";
import About from "./components/About";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Your pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/human" element={<TalkToHumanPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Tejas pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}
