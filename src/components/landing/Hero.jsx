import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="lp-hero">
      <div className="lp-container">
        <div className="lp-hero-grid">
          {/* LEFT */}
          <motion.div
            className="lp-hero-left"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="lp-powered">• Powered by AI</div>

            <motion.div
              className="lp-badge"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
            >
              Designed to guide you
              <br />
              toward the support you deserve.
            </motion.div>

            <h1 className="lp-h1">
              Explore the ways we
              <br />
              support your mental
              <br />
              wellbeing
            </h1>

            <p className="lp-sub">Coming soon: A calm companion for your mind.</p>

            {/* OPTIONAL HERO CTA (extra dynamic feeling) */}
            <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <motion.button
                className="lp-cta"
                onClick={() => navigate("/personal")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              >
                Start with AI →
              </motion.button>

              <motion.button
                className="lp-pillbtn"
                onClick={() => navigate("/human")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              >
                Talk to Human →
              </motion.button>
            </div>
          </motion.div>

          {/* FLOATING BUTTONS */}
          <div className="lp-float">
            <motion.button
              className="lp-float-btn"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              aria-label="Settings"
              onClick={() => navigate("/settings")}
            >
              ☼
            </motion.button>

            <motion.button
              className="lp-float-owl"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              aria-label="Start chat"
              onClick={() => navigate("/personal")}
            >
              <span className="lp-owl-eye" />
              <span className="lp-owl-eye" />
            </motion.button>

            <motion.button
              className="lp-float-btn"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              aria-label="Book active listener"
              onClick={() => navigate("/active-listener-booking")}
            >
              ✦
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
