import React from "react";
import { motion } from "framer-motion";
import { Heading } from "../common/Heading";
import { about } from "../data/dummydata";

export const About = () => {
  return (
    <section className="about section-block" id="about">
      <div className="container">
        {about.map((val, index) => (
          <motion.div
            key={index}
            className="about-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Heading title="About" />
            <div className="about-content">
              <motion.p 
                className="about-desc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {val.desc}
              </motion.p>
              <motion.p 
                className="about-desc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {val.desc1}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};