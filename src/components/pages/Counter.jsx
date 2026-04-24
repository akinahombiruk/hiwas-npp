import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
  const iconMap = {
    "Tiny Architect Big Question": "🏛️",
    "Signal and Sign": "📡",
    "PulseaPulsea": "💓",
    "Stethoscope report": "🩺",
  };
export const Counter = () => {
  
  const [stats, setStats] = useState([]);

  // 🔥 ICON MAP (your categories)


  useEffect(() => {
    fetch("http://localhost:5000/api/newsletters")
      .then((res) => res.json())
      .then((data) => {
        // TOTAL
        const total = data.length;

        // GROUP BY CATEGORY
        const categoryMap = data.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        // BUILD DATA WITH ICONS
        const dynamicStats = [
          {
            title: "Total News",
            num: total,
            icon: "🧾",
          },
          ...Object.keys(categoryMap).map((cat) => ({
            title: cat,
            num: categoryMap[cat],
            icon: iconMap[cat] || "📰", // fallback icon
          })),
        ];

        setStats(dynamicStats);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <section className="counter-section section-block" id="highlights">
      <div className="container">
        <div className="counter-row">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              className="counter-box"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="counter-icon">{item.icon}</div>

              <div className="counter-number">
                <CountUp
                  enableScrollSpy
                  duration={2}
                  end={item.num}
                  separator=","
                />
                {item.plus && <span>+</span>}
              </div>

              <div className="counter-title">{item.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};