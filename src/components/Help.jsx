import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  MessageCircle, 
  FileText, 
  CreditCard, 
  Shield, 
  User,
  X,
  Send,
  CheckCircle,
  Lightbulb 
} from 'lucide-react';
import './Help.css';
import logoImg from '/mainlogo.png'; 

const Help = () => {
  // --- State Management ---
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Ticket Modal States
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketStatus, setTicketStatus] = useState('idle');

  // Chat Widget States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi there! I am the Mindgate virtual assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  // --- Data: Main FAQs ---
  const faqData = [
    {
      question: "How do I match with a psychologist?",
      answer: "After signing up, you'll complete a brief assessment regarding your needs and preferences. Our algorithm will suggest 3-5 licensed professionals best suited for you."
    },
    {
        question: "Is my data private and confidential?",
        answer: "Absolutely. We adhere to strict HIPAA and GDPR compliance. All messages and video sessions are end-to-end encrypted. We do not sell your personal data to third parties."
    },
    {
        question: "Does insurance cover these sessions?",
        answer: "Many of our providers accept major insurance plans. You can filter psychologists by insurance provider in the search tool. We also offer superbills for out-of-network reimbursement."
    },
    {
        question: "How do I cancel my subscription?",
        answer: "You can pause or cancel your subscription at any time from your 'Account Settings' page. There are no cancellation fees if done 24 hours before your next billing cycle."
    },
    {
        question: "What if I don't like my therapist?",
        answer: "Finding the right fit is crucial. If you feel your current match isn't working, you can switch therapists instantly through your dashboard settings at no extra cost."
    },
    {
        question: "Are there emergency services available?",
        answer: "Mindgate is not an emergency service. If you are in immediate danger, please use the Crisis resources listed at the top of this page or call 911."
    }
  ];

  // --- Data: Quick Tips (Scrolling) ---
  const quickTips = [
    { q: "Forgot Password?", a: "Click 'Reset' on the login page to get a link." },
    { q: "Video Lagging?", a: "Check your internet or switch to audio-only." },
    { q: "Receipts?", a: "Find all invoices under Billing > History." },
    { q: "Changing Plans", a: "Upgrade/Downgrade anytime in Settings." },
    { q: "Session Time", a: "Standard sessions are 50 minutes long." },
    { q: "Mobile App", a: "Download 'Mindgate' on iOS and Android." }
  ];

  const filteredFaqs = faqData.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // --- Handlers ---
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setTicketStatus('submitting');
    setTimeout(() => { setTicketStatus('success'); }, 1500);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
    setTimeout(() => setTicketStatus('idle'), 300); 
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setTimeout(() => {
        const botMsg = { 
            id: Date.now() + 1, 
            sender: 'bot', 
            text: "Thanks for your message! A live support agent will connect with you shortly." 
        };
        setChatMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);


  return (
    <div className="help-page-scope">
      
      {/* --- Navbar --- */}
      <nav className="help-navbar">
        <div className="help-logo-container">
          <img src={logoImg} alt="Mindgate Logo" className="help-brand-logo" />
          <span className="help-brand-name">Mindgate</span>
        </div>
        <div className="help-nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">
            <button className="help-nav-login-btn">Log In</button>
          </Link>
        </div>
      </nav>
      {/* --- Hero Section --- */}
      <div className="help-hero">
        <h1>How can we help you?</h1>
        <p>Find answers to your questions or get in touch with our support team.</p>
        <div className="help-search-container">
          <input 
            type="text" 
            placeholder="Search for help articles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="help-search-icon" size={20} />
        </div>
      </div>

      {/* --- Crisis Banner --- */}
      <div className="help-crisis-banner">
        <div className="help-crisis-content">
          <PhoneCall size={24} className="help-crisis-icon" />
          <div>
            <h3>In a crisis?</h3>
            <p>If you or someone else is in danger, please call emergency services (911) or the Suicide & Crisis Lifeline (988) immediately.</p>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="help-main-container">
        
        {!searchQuery && (
          <>
            {/* --- SCROLLING TIPS (Moved Here) --- */}
            <section className="help-scrolling-tips">
              <div className="help-scroll-header">
                <Lightbulb size={20} className="help-tip-icon" />
                <span>Quick Troubleshooting & Tips</span>
              </div>
              
              <div className="help-scroll-wrapper">
                <div className="help-scroll-track">
                  {[...quickTips, ...quickTips].map((tip, index) => (
                    <div className="help-scroll-card" key={index}>
                      <h4>{tip.q}</h4>
                      <p>{tip.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* --- Topic Cards --- */}
            <section className="help-topics-grid">
               <div className="help-topic-card">
                 <div className="help-icon-wrapper"><User size={24} /></div>
                 <h3>Account Settings</h3>
                 <p>Manage your profile, password, and preferences.</p>
               </div>
               <div className="help-topic-card">
                 <div className="help-icon-wrapper"><CreditCard size={24} /></div>
                 <h3>Billing & Plans</h3>
                 <p>Invoices, subscription tiers, and payment methods.</p>
               </div>
               <div className="help-topic-card">
                 <div className="help-icon-wrapper"><Shield size={24} /></div>
                 <h3>Privacy & Safety</h3>
                 <p>Learn about encryption, anonymity, and data rights.</p>
               </div>
               <div className="help-topic-card">
                 <div className="help-icon-wrapper"><FileText size={24} /></div>
                 <h3>Therapy Guide</h3>
                 <p>Tips for your first session and getting the most out of therapy.</p>
               </div>
            </section>
          </>
        )}

        {/* --- FAQ Section --- */}
        <section className="help-faq-section">
          <h2>{searchQuery ? `Results for "${searchQuery}"` : "Frequently Asked Questions"}</h2>
          <div className="help-faq-list">
             {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item, index) => (
                <div 
                    key={index} 
                    className={`help-faq-item ${openFaqIndex === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                >
                    <div className="help-faq-question">
                    <span>{item.question}</span>
                    {openFaqIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                    <div className="help-faq-answer">
                    <p>{item.answer}</p>
                    </div>
                </div>
                ))
            ) : (
                <div className="help-no-results">
                    <Search size={48} />
                    <p>No results found. Try adjusting your search or contact support below.</p>
                </div>
            )}
          </div>
        </section>

        {/* --- Contact Footer --- */}
        <section className="help-contact-section">
          <h2>Still need help?</h2>
          <p>Our support team is available Mon-Fri, 9am - 6pm EST.</p>
          <div className="help-contact-buttons">
            <button className="help-contact-btn primary" onClick={() => setIsChatOpen(true)}>
              <MessageCircle size={18} />
              Chat with Support
            </button>
            <button className="help-contact-btn secondary" onClick={() => setIsTicketModalOpen(true)}>
              <FileText size={18} />
              Submit a Ticket
            </button>
          </div>
        </section>
      </div>

      {/* --- Ticket Modal --- */}
       {isTicketModalOpen && (
        <div className="help-modal-overlay">
            <div className="help-modal-content">
                <button className="help-modal-close" onClick={closeTicketModal}>
                    <X size={24} />
                </button>
                
                {ticketStatus === 'success' ? (
                    <div className="help-success-state">
                        <CheckCircle size={64} color="#0f5132" />
                        <h3>Ticket Submitted!</h3>
                        <p>We've received your request. Check your email for a confirmation number.</p>
                        <button className="help-contact-btn primary" onClick={closeTicketModal}>Close</button>
                    </div>
                ) : (
                    <>
                        <h2>Submit a Support Ticket</h2>
                        <p>Describe your issue and we'll get back to you via email.</p>
                        <form className="help-ticket-form" onSubmit={handleTicketSubmit}>
                            <label>Email Address</label>
                            <input type="email" placeholder="you@example.com" required />
                            
                            <label>Subject</label>
                            <input type="text" placeholder="e.g., Billing Issue" required />
                            
                            <label>Description</label>
                            <textarea placeholder="Tell us more about the problem..." rows="4" required></textarea>
                            
                            <button 
                                type="submit" 
                                className="help-contact-btn primary" 
                                disabled={ticketStatus === 'submitting'}
                            >
                                {ticketStatus === 'submitting' ? 'Sending...' : 'Submit Request'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
      )}

      {/* --- Chat Widget --- */}
      {isChatOpen && (
        <div className="help-chat-widget">
            <div className="help-chat-header">
                <div className="help-chat-title">
                    <div className="help-status-dot"></div>
                    <span>Mindgate Support</span>
                </div>
                <button onClick={() => setIsChatOpen(false)}><X size={18} /></button>
            </div>
            
            <div className="help-chat-body">
                {chatMessages.map(msg => (
                    <div key={msg.id} className={`help-chat-msg ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <form className="help-chat-footer" onSubmit={handleSendMessage}>
                <input 
                    type="text" 
                    placeholder="Type a message..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit"><Send size={16} /></button>
            </form>
        </div>
      )}

    </div>
  );
};

export default Help;