import React from "react";
import { social } from "../data/dummydata";

const Footer = () => {
  const handleIconClick = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <footer>
        {social.map((item, index) => (
          <a
            key={index}
            href={item.link || "#"}
            onClick={(e) => {
              if (!item.link) e.preventDefault();
              handleIconClick(item.link);
            }}
            target="_blank"
            rel="noopener noreferrer"
            data-aos='zoom-in'
            style={{ 
              cursor: item.link ? "pointer" : "default",
              textDecoration: "none",
              color: "inherit"
            }}
          >
          < i data-aos='zoom-in'>{item.icon}</i>
          </a>
        ))}
        <p data-aos='zoom-in'>©2025 Akinahom Biruk. All rights reserved.
</p>
      </footer>
    </>
  );
};

export default Footer;