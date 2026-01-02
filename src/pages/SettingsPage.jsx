import React, { useEffect, useMemo, useState, useId } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  User,
  Shield,
  Bell,
  Lock,
  HelpCircle,
  Info,
  Download,
  Trash2,
  ChevronRight,
} from "lucide-react";
import "./SettingsPage.css";

import Navbar from "../components/landing/Navbar";

const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "preferences", label: "Preferences", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Safety", icon: Lock },
  { id: "support", label: "Support", icon: HelpCircle },
  { id: "about", label: "About", icon: Info },
];

function Toggle({ checked, onChange, label, helper, disabled }) {
  return (
    <div className={`set-row ${disabled ? "is-disabled" : ""}`}>
      <div className="set-row-text">
        <div className="set-row-title">{label}</div>
        {helper ? <div className="set-row-helper">{helper}</div> : null}
      </div>

      <button
        type="button"
        className={`toggle ${checked ? "is-on" : ""}`}
        onClick={() => !disabled && onChange(!checked)}
        aria-pressed={checked}
        aria-disabled={disabled}
        disabled={disabled}
      >
        <span className="toggle-knob" />
      </button>
    </div>
  );
}

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helper: PropTypes.string,
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  helper: "",
  disabled: false,
};

function Segmented({ value, onChange, options }) {
  return (
    <div className="seg" role="tablist" aria-label="Segmented control">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`seg-btn ${value === opt.value ? "is-active" : ""}`}
          onClick={() => onChange(opt.value)}
          role="tab"
          aria-selected={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

Segmented.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function Modal({ open, title, children, onClose, describedById }) {
  const titleId = useId();

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={describedById || undefined}
    >
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title" id={titleId}>
            {title}
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  describedById: PropTypes.string,
};

Modal.defaultProps = {
  describedById: "",
};

export default function SettingsPage() {
  const [tab, setTab] = useState("account");

  // Preferences demo state (UI only)
  const [supportMode, setSupportMode] = useState("both");
  const [dailyCheckIn, setDailyCheckIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState("09:00");
  const [aiTone, setAiTone] = useState("calm");

  // Notifications
  const [nudgeDaily, setNudgeDaily] = useState(true);
  const [nudgeSessions, setNudgeSessions] = useState(true);
  const [nudgeUpdates, setNudgeUpdates] = useState(false);

  // Modal
  const [deleteOpen, setDeleteOpen] = useState(false);

  const activeTab = useMemo(() => TABS.find((t) => t.id === tab), [tab]);

  // IDs for labels (remove "label not associated" warnings)
  const displayNameId = useId();
  const emailId = useId();

  // Modal description id
  const deleteDescId = useId();

  // Dynamic background — mouse + scroll updates CSS variables
  useEffect(() => {
    const root = document.documentElement;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      root.style.setProperty("--mx", `${x.toFixed(2)}%`);
      root.style.setProperty("--my", `${y.toFixed(2)}%`);
    };

    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const s = window.scrollY / max;
      root.style.setProperty("--sx", `${s.toFixed(4)}`);
    };

    // init
    root.style.setProperty("--mx", "50%");
    root.style.setProperty("--my", "35%");
    onScroll();

    // Use globalThis to avoid "window is not defined" warnings in some linters
    globalThis.addEventListener("mousemove", onMove, { passive: true });
    globalThis.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      globalThis.removeEventListener("mousemove", onMove);
      globalThis.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="sp">
      {/* Background layer */}
      <div className="sp-bg" aria-hidden="true" />

      {/* Navbar */}
      <Navbar />

      <main className="sp-main">
        <div className="sp-head">
          <div>
            <div className="sp-kicker">Personal controls</div>
            <h1 className="sp-title">Settings</h1>
            <p className="sp-subtitle">
              Customize how MindGate supports you—calmly, privately, and on your terms.
            </p>
          </div>

          <div className="sp-breadcrumb">
            <span>Settings</span>
            <ChevronRight size={16} />
            <span className="sp-bc-strong">{activeTab?.label}</span>
          </div>
        </div>

        <section className="sp-shell">
          {/* Sidebar tabs */}
          <aside className="sp-side" aria-label="Settings categories">
            <div className="sp-side-card" role="tablist" aria-label="Settings tabs">
              {TABS.map((t) => {
                const Icon = t.icon;
                const isActive = t.id === tab;
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`sp-tab ${isActive ? "is-active" : ""}`}
                    onClick={() => setTab(t.id)}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <span className="sp-tab-icn">
                      <Icon size={18} />
                    </span>
                    <span className="sp-tab-label">{t.label}</span>
                    <span className="sp-tab-dot" aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <div className="sp-side-note">
              <div className="sp-note-title">A gentle reminder</div>
              <div className="sp-note-text">
                You can change these anytime. Your privacy and comfort come first.
              </div>
            </div>
          </aside>

          {/* Content panel */}
          <div className="sp-panel">
            <div key={tab} className="sp-panel-inner">
              {/* ACCOUNT */}
              {tab === "account" && (
                <>
                  <div className="card">
                    <div className="card-head">
                      <div>
                        <div className="card-title">Profile</div>
                        <div className="card-desc">
                          Helps personalize your experience across MindGate.
                        </div>
                      </div>
                      <button className="btn btn-secondary" type="button">
                        Edit profile
                      </button>
                    </div>

                    <div className="card-body">
                      <div className="profile">
                        <div className="avatar" aria-hidden="true" />
                        <div className="profile-meta">
                          <div className="profile-name">Your Name</div>
                          <div className="profile-email">you@example.com</div>
                        </div>
                      </div>

                      <div className="grid-2">
                        <div className="field">
                          <label htmlFor={displayNameId}>Display name</label>
                          <input id={displayNameId} placeholder="e.g., Anjishnu" />
                        </div>

                        <div className="field">
                          <label htmlFor={emailId}>Email</label>
                          <input id={emailId} placeholder="you@example.com" />
                        </div>
                      </div>

                      <div className="hint">
                        Tip: Keep your profile minimal—MindGate works great even without extra details.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-head">
                      <div>
                        <div className="card-title">Security</div>
                        <div className="card-desc">Protect your account with simple safeguards.</div>
                      </div>
                      <button className="btn btn-primary" type="button">
                        Change password
                      </button>
                    </div>

                    <div className="card-body">
                      <Toggle
                        checked={false}
                        onChange={() => {}}
                        label="Two-factor authentication"
                        helper="Coming soon—an extra layer of protection for your sign-in."
                        disabled
                      />
                    </div>
                  </div>
                </>
              )}

              {/* PREFERENCES */}
              {tab === "preferences" && (
                <>
                  <div className="card">
                    <div className="card-head">
                      <div>
                        <div className="card-title">Support mode</div>
                        <div className="card-desc">
                          Choose how you’d like MindGate to support you.
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <Segmented
                        value={supportMode}
                        onChange={setSupportMode}
                        options={[
                          { value: "ai", label: "AI" },
                          { value: "human", label: "Human" },
                          { value: "both", label: "Both" },
                        ]}
                      />
                      <div className="hint">
                        You can switch anytime—there’s no “right” choice, only what feels best.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-head">
                      <div>
                        <div className="card-title">Daily check-ins</div>
                        <div className="card-desc">
                          Gentle reminders to pause, reflect, and reset.
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <Toggle
                        checked={dailyCheckIn}
                        onChange={setDailyCheckIn}
                        label="Enable daily check-in reminder"
                        helper="A small nudge, once a day."
                      />

                      <div className={`set-row ${dailyCheckIn ? "" : "is-disabled"}`}>
                        <div className="set-row-text">
                          <div className="set-row-title">Preferred time</div>
                          <div className="set-row-helper">Choose what feels natural for you.</div>
                        </div>

                        <input
                          type="time"
                          className="time"
                          value={checkInTime}
                          onChange={(e) => setCheckInTime(e.target.value)}
                          disabled={!dailyCheckIn}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-head">
                      <div>
                        <div className="card-title">AI tone</div>
                        <div className="card-desc">Make responses feel more “you”.</div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="radio">
                        {[
                          { id: "calm", label: "Calm", desc: "Grounded, gentle, steady." },
                          { id: "supportive", label: "Supportive", desc: "Warm, encouraging, reassuring." },
                          { id: "practical", label: "Practical", desc: "Clear steps and structure." },
                        ].map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            className={`radio-item ${aiTone === r.id ? "is-active" : ""}`}
                            onClick={() => setAiTone(r.id)}
                          >
                            <span className="radio-dot" aria-hidden="true" />
                            <span className="radio-text">
                              <span className="radio-title">{r.label}</span>
                              <span className="radio-desc">{r.desc}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* NOTIFICATIONS (removed useless fragment) */}
              {tab === "notifications" && (
                <div className="card">
                  <div className="card-head">
                    <div>
                      <div className="card-title">Notifications</div>
                      <div className="card-desc">Keep it quiet. Only what’s helpful.</div>
                    </div>
                  </div>

                  <div className="card-body">
                    <Toggle
                      checked={nudgeDaily}
                      onChange={setNudgeDaily}
                      label="Daily check-in reminders"
                      helper="A gentle prompt once per day."
                    />
                    <Toggle
                      checked={nudgeSessions}
                      onChange={setNudgeSessions}
                      label="Session reminders"
                      helper="So you never miss a booked session."
                    />
                    <Toggle
                      checked={nudgeUpdates}
                      onChange={setNudgeUpdates}
                      label="Product updates"
                      helper="Occasional updates about new features."
                    />
                  </div>
                </div>
              )}

              {/* PRIVACY */}
              {tab === "privacy" && (
                <>
                  <div className="card">
                    <div className="card-head">
                      <div>
                        <div className="card-title">Privacy</div>
                        <div className="card-desc">
                          Your conversations are private. You’re always in control.
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="banner">
                        <div className="banner-title">Privacy, in plain words</div>
                        <div className="banner-text">
                          MindGate is built to support you—not to overwhelm you with settings.
                          Download your data anytime.
                        </div>
                      </div>

                      <div className="btn-row">
                        <button className="btn btn-secondary" type="button">
                          <Download size={16} /> Download my data
                        </button>
                        <button className="btn btn-secondary" type="button">
                          Manage consent
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card danger">
                    <div className="card-head">
                      <div>
                        <div className="card-title">Danger zone</div>
                        <div className="card-desc">
                          If you choose to leave, we’ll respect it. You can always come back.
                        </div>
                      </div>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => setDeleteOpen(true)}
                      >
                        <Trash2 size={16} /> Delete account
                      </button>
                    </div>

                    <div className="card-body">
                      <div className="hint">
                        This is just UI for now—wire it to your backend later.
                      </div>
                    </div>
                  </div>

                  <Modal
                    open={deleteOpen}
                    title="Delete account?"
                    onClose={() => setDeleteOpen(false)}
                    describedById={deleteDescId}
                  >
                    <p className="modal-p" id={deleteDescId}>
                      This will remove your account and associated data. If you’re unsure, you can
                      cancel and come back later.
                    </p>
                    <div className="modal-actions">
                      <button className="btn btn-secondary" onClick={() => setDeleteOpen(false)}>
                        Cancel
                      </button>
                      <button className="btn btn-danger" onClick={() => setDeleteOpen(false)}>
                        Confirm delete
                      </button>
                    </div>
                  </Modal>
                </>
              )}

              {/* SUPPORT (removed useless fragment) */}
              {tab === "support" && (
                <div className="card">
                  <div className="card-head">
                    <div>
                      <div className="card-title">Support</div>
                      <div className="card-desc">We’re here when you need us.</div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="grid-3">
                      <Link to="/help" className="mini-card">
                        <span className="mini-top">
                          <HelpCircle size={18} />
                          <span className="mini-title">FAQ</span>
                        </span>
                        <span className="mini-desc">Quick answers to common questions.</span>
                      </Link>

                      <a
                        href="#"
                        className="mini-card"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="mini-top">
                          <User size={18} />
                          <span className="mini-title">Contact support</span>
                        </span>
                        <span className="mini-desc">Email us and we’ll respond soon.</span>
                      </a>

                      <Link to="/talktohuman" className="mini-card is-primary">
                        <span className="mini-top">
                          <Shield size={18} />
                          <span className="mini-title">Talk to a human</span>
                        </span>
                        <span className="mini-desc">Get real-time guidance and care.</span>
                      </Link>
                    </div>

                    <div className="banner soft">
                      <div className="banner-title">If you’re in immediate danger</div>
                      <div className="banner-text">
                        Please contact your local emergency number or a trusted person nearby.
                        MindGate is support—not emergency services.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ABOUT (removed useless fragment) */}
              {tab === "about" && (
                <div className="card">
                  <div className="card-head">
                    <div>
                      <div className="card-title">About MindGate</div>
                      <div className="card-desc">A calm companion for your mind.</div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="about">
                      <div className="about-row">
                        <div className="about-label">Version</div>
                        <div className="about-value">0.1.0 (demo)</div>
                      </div>
                      <div className="about-row">
                        <div className="about-label">Why we built this</div>
                        <div className="about-value">
                          To make support feel accessible, gentle, and stigma-free—at any hour.
                        </div>
                      </div>
                    </div>

                    <div className="btn-row">
                      <a
                        href="#"
                        className="btn btn-secondary"
                        onClick={(e) => e.preventDefault()}
                      >
                        Terms
                      </a>
                      <a
                        href="#"
                        className="btn btn-secondary"
                        onClick={(e) => e.preventDefault()}
                      >
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="sp-footer">
        <div className="sp-footer-inner">
          <span>© {new Date().getFullYear()} MindGate</span>
          <span className="sp-footer-dot">•</span>
          <span>Made with calm, not noise.</span>
        </div>
      </footer>
    </div>
  );
}

