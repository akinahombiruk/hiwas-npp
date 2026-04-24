import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { home } from "../data/dummydata";

export const Hero = () => {
  useEffect(() => {
    // Reserved for future hero lifecycle enhancements.
  }, []);

  return (
    <section className="hero">
      {/* Animated background elements */}
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {home.map((val, i) => (
        <motion.div
          key={i}
          className="heroContent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Premium Logo Container */}
          <motion.div 
            className="logoContainer"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 10,
              delay: 0.2
            }}
            whileHover={{ 
              scale: 1.03,
              rotate: 1,
              transition: { duration: 0.3 }
            }}
          >
            <div className="logo-glow"></div>
            <img 
              src={val.image} 
              alt="Hewas Medical Research" 
              className="squareLogo"
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="heroTitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: 0.4, 
              duration: 0.8,
              ease: [0.17, 0.67, 0.83, 0.67]
            }}
          >
             ህዋስ
            <span className="title-underline"></span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.h2
            className="motto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Legacy in every layer
            <span className="typing-cursor">|</span>
          </motion.h2>

          {/* Animated Divider */}
          <motion.div 
            className="divider"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "120px", opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          />

          {/* Description Text */}
        

          {/* Premium CTA Button */}
          <motion.div
            className="cta-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="hero-actions">
              <motion.button
                className="subscribeBtn"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 12px 24px rgba(37, 79, 137, 0.26)",
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/newsletters/%E1%88%95%E1%8B%8B%E1%88%B5-7353882854746906624",
                    "_blank"
                  )
                }
              >
                <span className="btn-text">Subscribe Now</span>
                <div className="btn-hover-effect"></div>
                <div className="btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.button>

              <a href="#portfolio" className="ghostBtn">
                Explore Stories
              </a>
            </div>

            
          </motion.div>
        </motion.div>
      ))}

      {/* Scroll indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};