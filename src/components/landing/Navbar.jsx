import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const hoverLink = {
    rest: { y: 0, opacity: 0.88 },
    hover: { y: -1, opacity: 1 },
  };

  const goToAI = (e) => {
    e.preventDefault();
    const el = document.getElementById("support");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/personal");
    }
  };

  const goToHuman = (e) => {
    e.preventDefault();
    const el = document.getElementById("support");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/human");
    }
  };

  return (
    <header className="lp-nav">
      <div className="lp-nav-inner">
        <motion.div
          className="lp-brand"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          MIND <span style={{ color: "#0f6a37" }}>GATE</span>
        </motion.div>

        <nav className="lp-nav-links">
          <motion.a
            className="lp-nav-link"
            href="#support"
            variants={hoverLink}
            initial="rest"
            whileHover="hover"
            onClick={goToAI}
          >
            Talk to AI
          </motion.a>

          <motion.a
            className="lp-nav-link"
            href="#support"
            variants={hoverLink}
            initial="rest"
            whileHover="hover"
            onClick={goToHuman}
          >
            Talk to Human
          </motion.a>

          <motion.a
            className="lp-nav-link"
            href="#"
            variants={hoverLink}
            initial="rest"
            whileHover="hover"
            onClick={(e) => {
              e.preventDefault();
              navigate("/help");
            }}
          >
            Help
          </motion.a>

          <motion.a
            className="lp-nav-link"
            href="#"
            variants={hoverLink}
            initial="rest"
            whileHover="hover"
            onClick={(e) => {
              e.preventDefault();
              navigate("/about");
            }}
          >
            About
          </motion.a>
        </nav>

        <div className="lp-nav-actions">
          <motion.button
            className="lp-linkbtn"
            onClick={() => navigate("/login")}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
          >
            Login
          </motion.button>

          <motion.button
            className="lp-pillbtn"
            onClick={() => navigate("/signup")}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </header>
  );
}


