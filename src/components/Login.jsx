import React, { useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      {/* Navigation Bar */}
      {/* Navigation Bar */}
        <nav className="navbar">
            <div className="logo-container">
                {/* Replace 'logo.png' with your actual image path */}
                <img src="/mainlogo.png" alt="Mindwell Logo" className="brand-logo" />
                <span className="brand-name">Mindgate</span>
            </div>
            
            <div className="nav-links">
                <a href="#">Home</a>
                <Link to="/about">About </Link>
                <a href="#">For Psychologists</a>
                <Link to="/help">Help</Link>
                <Link to="/signup">
                <button className="signup-btn-nav">Sign Up</button>
                </Link>
            </div>
        </nav>

      <main className="login-content">
        {/* Left Side: Image/Card Section */}
        <div className="hero-card">
          <div className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=1000&auto=format&fit=crop" 
              alt="Calm interior" 
            />
          </div>
          <div className="hero-overlay-text">
            <h2>Your journey to mental wellness starts here.</h2>
            <p>Connect with licensed psychologists and find your peace of mind.</p>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h1>Welcome Back</h1>
            <p>Please enter your details to access your dashboard.</p>
          </div>

          <form className="login-form">
            <div className="input-group">
              <label>Email or Username</label>
              <input type="text" placeholder="example@email.com" />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Eye size={18} />
                </button>
              </div>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="login-submit-btn">Log In</button>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            <button type="button" className="google-btn">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
              Google
            </button>

            <p className="footer-text">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;