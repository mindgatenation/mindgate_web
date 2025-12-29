import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShieldCheck, 
  Users, 
  Globe, 
  Target, 
  ArrowRight 
} from 'lucide-react';
import './About.css';
import logoImg from '/mainlogo.png'; 

// Placeholder images - Replace these with your actual team/office/therapy images
const imageList1 = [
  "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=300&q=80"
];
const imageList2 = [
  "https://img.freepik.com/premium-photo/group-indian-people-park_53876-9349.jpg?semt=ais_hybrid&w=740&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNWTUVRXwuiTf_AhLatc4AUFdiguTjdW5-8w&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_oZh_pD_0DI05Ap8oue9bWlIumpLFRqZHw&s",
  "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://coremind-wellness.com/wp-content/uploads/2025/12/full-shot-real-estate-agent-showing-house-min-1-3-1536x1024.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4XUJ8tGmcW0hCyrYwjjfpHX90VV_cS5Km7A&s"
];

const About = () => {
  return (
    <div className="about-page-scope">
      
      {/* --- Navbar --- */}
      <nav className="about-navbar">
        <div className="about-logo-container">
          <img src={logoImg} alt="Mindgate Logo" className="about-brand-logo" />
          <span className="about-brand-name">Mindgate</span>
        </div>
        <div className="about-nav-links">
          <Link to="/">Home</Link>
          <Link to="/help">Help</Link>
          <Link to="/signup">
             <button className="about-nav-login-btn">Log In</button>
          </Link>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="about-hero">
        <div className="about-hero-content">
          
          <div className="about-dual-scroll-wrapper">
  {/* Top Row: Left to Right */}
  <div className="about-scroll-track move-right">
    {[...imageList1, ...imageList1].map((img, index) => (
      <div className="about-scroll-card-small" key={`top-${index}`}>
        <img src={img} alt="Community" />
      </div>
    ))}
  </div>

  {/* Bottom Row: Right to Left */}
  <div className="about-scroll-track move-left">
    {[...imageList2, ...imageList2].map((img, index) => (
      <div className="about-scroll-card-small" key={`bottom-${index}`}>
        <img src={img} alt="Community" />
      </div>
    ))}
  </div>
</div>

          <span className="about-badge">Established 2025</span>
          <h1>Mental healthcare,<br />reimagined for you.</h1>
          <p>
            We believe that finding professional help shouldn't be a struggle. 
            Mindgate bridges the gap between chaos and clarity, connecting you 
            with licensed psychologists in a safe, digital space.
          </p>
        </div>
      </header>

      {/* --- Stats Section --- */}
      {/* --- Commitments Section (Replaces Stats) --- */}
<section className="about-stats-container">
  
  <div className="about-stat-item">
    {/* Icon for Privacy */}
    <div className="about-stat-icon">
      <ShieldCheck size={32} color="#8dae96" />
    </div>
    <h2>Secure</h2>
    <p>100% Confidential</p>
  </div>

  <div className="about-stat-divider"></div>

  <div className="about-stat-item">
    {/* Icon for Quality */}
    <div className="about-stat-icon">
      <Users size={32} color="#8dae96" />
    </div>
    <h2>Verified</h2>
    <p>Licensed Psychologists</p>
  </div>

  <div className="about-stat-divider"></div>

  <div className="about-stat-item">
    {/* Icon for Convenience */}
    <div className="about-stat-icon">
      <Target size={32} color="#8dae96" />
    </div>
    <h2>Flexible</h2>
    <p>Care on your schedule</p>
  </div>

</section>

      {/* --- Mission Grid --- */}
      <section className="about-mission-section">
        <div className="about-section-header">
          <h2>Our Core Values</h2>
          <p>What drives us to build a better future for mental health.</p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon-box"><ShieldCheck size={28} /></div>
            <h3>Privacy First</h3>
            <p>Your mental health journey is personal. We use military-grade encryption to ensure your sessions and data remain 100% confidential.</p>
          </div>

          <div className="about-card">
            <div className="about-icon-box"><Heart size={28} /></div>
            <h3>Compassionate Care</h3>
            <p>We don't just match algorithms; we match personalities. Our professionals are vetted not just for credentials, but for empathy.</p>
          </div>

          <div className="about-card">
            <div className="about-icon-box"><Globe size={28} /></div>
            <h3>Accessibility</h3>
            <p>Geography shouldn't be a barrier to happiness. Access top-tier psychological support from the comfort of your home, anywhere in the world.</p>
          </div>

          <div className="about-card">
            <div className="about-icon-box"><Target size={28} /></div>
            <h3>Evidence-Based</h3>
            <p>We move beyond trends. Our psychologists utilize scientifically proven methods like CBT and DBT to help you achieve lasting results.</p>
          </div>
        </div>
      </section>

      {/* --- Team / Community Story --- */}
      <section className="about-story-section">
        <div className="about-story-content">
          <div className="about-story-text">
            <h2>Built by people who've been there.</h2>
            <p>
              Mindgate started as a simple idea: therapy is too hard to find. 
              Our founders experienced the frustration of waitlists and mismatched therapists.
            </p>
            <p>
              We built the platform we wished we had. A place where you are seen, 
              heard, and helped—without the headache.
            </p>
            <div className="about-founders">
              <div className="founder-avatar">
                <Users size={24} color="#0f5132" />
              </div>
              <div>
                <strong>The Mindgate Team</strong>
                <span>Dedicated to your well-being</span>
              </div>
            </div>
          </div>
          {/* Decorative shapes for visual interest instead of an image file */}
          <div className="about-story-visual">
            <div className="visual-circle circle-1"></div>
            <div className="visual-circle circle-2"></div>
            <div className="visual-card-mockup">
              <Heart size={32} fill="#e11d48" color="#e11d48" />
              <span>You are not alone.</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Footer --- */}
      <section className="about-cta-section">
        <div className="about-cta-container">
          <h2>Ready to find your balance?</h2>
          <p>Join thousands of others taking the first step today.</p>
          <Link to="/">
            <button className="about-cta-btn">
              Get Started <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;