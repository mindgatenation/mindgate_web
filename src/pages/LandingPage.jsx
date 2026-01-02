import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import "./LandingPage.css";

import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Footer from "../components/landing/Footer";

import aiImg from "../assets/ai.jpg";
import humanImg from "../assets/human.jpg";
import communityImg from "../assets/community.png";

export default function LandingPage() {
  const navigate = useNavigate();

  /* ========= Optimized: Scroll + Mouse background motion (RAF + proper cleanup) ========= */
  useEffect(() => {
    const root = document.documentElement;

    let latestEvent = null;
    let rafId = null;

    const update = () => {
      rafId = null;

      const y = window.scrollY || 0;

      const mouseX = latestEvent
        ? (latestEvent.clientX / window.innerWidth - 0.5) * 40
        : 0;

      const mouseY = latestEvent
        ? (latestEvent.clientY / window.innerHeight - 0.5) * 40
        : 0;

      const bgx = Math.sin(y * 0.002) * 30 + mouseX;
      const bgy = Math.cos(y * 0.002) * 20 + mouseY;
      const rot = (y * 0.04) % 360;

      root.style.setProperty("--bgx", `${bgx.toFixed(2)}px`);
      root.style.setProperty("--bgy", `${bgy.toFixed(2)}px`);
      root.style.setProperty("--bgrot", `${rot.toFixed(2)}deg`);
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    const onMouseMove = (e) => {
      latestEvent = e;
      requestUpdate();
    };

    const onScroll = () => {
      requestUpdate();
    };

    requestUpdate();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="lp">
      <div className="lp-bg" />

      <Navbar />

      <main className="lp-main">
        <Hero />

        {/* SUPPORT SECTIONS */}
        <section className="lp-support" id="support">
          <div className="lp-container lp-support-grid">
            {/* AI SECTION */}
            <motion.div
              className="lp-row"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <motion.div
                className="lp-illus-card"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="lp-illus-title">
                  Thoughtful AI guidance for your mental well-being.
                </div>
                <div className="lp-illus-media">
                  <img src={aiImg} className="lp-illus-img" alt="AI guidance" />
                </div>
              </motion.div>

              <div className="lp-row-text">
                <p className="lp-p">
                  Based on your needs, it gently checks in, offers community
                  support, or helps you connect with a human professional.
                </p>

                <div className="lp-row-cta">
                  <motion.button
                    className="lp-cta"
                    onClick={() => navigate("/personal")}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    Talk to AI →
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* HUMAN SECTION */}
            <motion.div
              className="lp-row"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.06 }}
            >
              <motion.div
                className="lp-illus-card"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="lp-illus-title">
                  When you’re ready, a real person is here for you.
                </div>
                <div className="lp-illus-media">
                  <img src={humanImg} className="lp-illus-img" alt="Human support" />
                </div>
              </motion.div>

              <div className="lp-row-text">
                <p className="lp-p">
                  Speak with a qualified mental health professional who understands
                  nuance and listens deeply to your journey.
                </p>

                <div className="lp-row-cta">
                  <motion.button
                    className="lp-cta"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    onClick={() => navigate("/human")}
                  >
                    Talk to a Human →
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* COMMUNITY SECTION */}
            <motion.div
              className="lp-row"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
            >
              <motion.div
                className="lp-illus-card"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="lp-illus-title">
                  Join moderated group sessions that feel safe and supportive.
                </div>
                <div className="lp-illus-media">
                  <img
                    src={communityImg}
                    className="lp-illus-img"
                    alt="Community support"
                  />
                </div>
              </motion.div>

              <div className="lp-row-text">
                <p className="lp-p">
                  Join moderated group sessions where people come together to listen and share.
                  <br />
                  Connect with others facing similar challenges in a calm, respectful environment.
                  <br />
                  A supportive starting point that reminds you you’re not alone.
                </p>

                <div className="lp-row-cta">
                  <motion.button
                    className="lp-cta"
                    onClick={() => navigate("/community")}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    Explore →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="lp-footer-pad">
          <div className="lp-container">
            <div className="lp-footer-bar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
