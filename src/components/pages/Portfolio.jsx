import React, { useEffect, useState } from "react";
import { Heading } from "../common/Heading";

export const Portfolio = () => {
  const [list, setList] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // FETCH DATA
  useEffect(() => {
    fetch("http://localhost:5000/api/newsletters")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setAllItems(data);

        const cats = ["all", ...new Set(data.map((i) => i.category))];
        setCategory(cats);
      });
  }, []);

  // FILTER
  const filterItems = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1); // ✅ reset page when filter changes

    if (cat === "all") {
      setList(allItems);
    } else {
      setList(allItems.filter((i) => i.category === cat));
    }
  };

  // PAGINATION LOGIC
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(list.length / itemsPerPage);

  return (
    <article className="news-section">
      <div className="container">

        <Heading title="📰 Health News Columns" />

        {/* FILTER BUTTONS */}
        <div className="catButton">
          {category.map((cat) => (
            <button
              key={cat}
              onClick={() => filterItems(cat)}
              className={`primaryBtn ${
                activeCategory === cat ? "active-filter" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* NEWS LIST */}
        <div className="news-list">

          {currentItems.map((item) => (
            <div key={item._id} className="news-item">

              {/* IMAGE */}
              <div className="news-image">
                <img
                  src={`http://localhost:5000${item.cover}`}
                  alt={item.title}
                />
              </div>

              {/* CONTENT */}
              <div className="news-content">

                <span className="news-category">
                  {item.category}
                </span>

                <h2 className="news-title">
                  {item.title}
                </h2>

                <p className="news-text">
                  {item.content}
                </p>

                {/* DOWNLOAD PDF */}
                {item.filePath && (
                  <a
                    href={`http://localhost:5000${item.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="download-btn"
                  >
                    ⬇ Download PDF
                  </a>
                )}

              </div>

              {/* BLUE LINE RIGHT */}
              <div className="news-line"></div>

            </div>
          ))}

        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

      </div>
    </article>
  );
};