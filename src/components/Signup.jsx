import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck, Star, Menu, X } from 'lucide-react';
import './Signup.css';
import logoImg from '/mainlogo.png'; 

const Signup = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // STRICT ISOLATION WRAPPER
    <div id="signup-page-root">
      
      {/* --- Navbar (Scoped) --- */}
      <nav className="signup-navbar">
        <div className="signup-nav-container">
          <div className="signup-logo">
            <img src={logoImg} alt="Mindgate Logo" className="signup-logo-img" />
            <span className="signup-brand-name">Mindgate</span>
          </div>
          
          <div className="signup-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} color="#0f5132"/> : <Menu size={24} color="#0f5132"/>}
          </div>

          <div className={`signup-nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Home</a>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <a href="#" onClick={() => setIsMenuOpen(false)}>For Psychologists</a>
            <Link to="/help" onClick={() => setIsMenuOpen(false)}>Help</Link>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <button className="signup-btn-nav">Log In</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <div className="signup-container">
        
        {/* Left Side: Branding */}
        <div className="signup-hero">
          <div className="hero-main-content">
            <h1>Find balance </h1>
            <h1><div className="hero-main-content-div">in a chaotic world.</div></h1>
            <p>Join thousands of users connecting with licensed psychologists in a safe, secure, and private environment.</p>
            
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFD700" color="#FFD700" />)}
              </div>
              <p>"Within two weeks of signing up, I matched with a therapist who truly understands my anxiety. The platform is intuitive and calming."</p>
              <div className="testimonial-user">
                <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Jenkins" />
                <div>
                  <strong>Sarah Jenkins</strong>
                  <span>Member since 2025</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-footer">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="signup-form-section">
          <div className="signup-form-container">
            <h2>Create your account</h2>
            <p className="login-redirect">
              Already have an account? <Link to="/">Log in</Link>
            </p>

            <div className="social-auth">
              <button className="social-btn">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                Google
              </button>
              <button className="social-btn">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                Apple
              </button>
            </div>

            <div className="signup-divider">
              <span>Or continue with</span>
            </div>

            <form>
              <div className="signup-input-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <input type="text" placeholder="e.g. Jane Doe" />
                  <User size={18} className="input-icon" />
                </div>
              </div>

              <div className="signup-input-group">
                <label>Email address</label>
                <div className="input-with-icon">
                  <input type="email" placeholder="you@example.com" />
                  <Mail size={18} className="input-icon" />
                </div>
              </div>

              <div className="signup-input-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <input type="password" placeholder="••••••••" />
                  <Lock size={18} className="input-icon" />
                </div>
              </div>

              <div className="signup-input-group">
                <label>Confirm Password</label>
                <div className="input-with-icon">
                  <input type="password" placeholder="••••••••" />
                  <ShieldCheck size={18} className="input-icon" />
                </div>
              </div>

              <div className="terms-checkbox">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I agree to the <strong>Terms of Service</strong> and acknowledge the <strong>Privacy Policy</strong>.
                </label>
              </div>

              <button type="submit" className="create-account-btn">Create Account</button>
            </form>

            <div className="encryption-notice">
              <ShieldCheck size={14} />
              <span>256-bit SSL Secure Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;