import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import PersonalPage from "./pages/PersonalPage";
import TalkToHumanPage from "./pages/TalktoHumanPage";
import SettingsPage from "./pages/SettingsPage";

// Tejas pages (inside components folder)
import Login from "./components/Login";
import Signup from "./components/Signup";
import Help from "./components/Help";
import About from "./components/About";

export default function App() {
  return (
    <Router>
      <div className="App-container">
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth & info (Tejas) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />

          {/* Your pages */}
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/talk-to-human" element={<TalkToHumanPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
