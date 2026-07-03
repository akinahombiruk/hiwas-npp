import React, { useEffect, useState } from "react";
import { Heading } from "../common/Heading";
import DOMPurify from 'dompurify';

export const Portfolio = () => {
  const [list, setList] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch("https://hiwas-backend-production-56c5.up.railway.app/api/newsletters")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setAllItems(data);
        const cats = ["all", ...new Set(data.map((i) => i.category))];
        setCategory(cats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filterItems = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    if (cat === "all") {
      setList(allItems);
    } else {
      setList(allItems.filter((i) => i.category === cat));
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  if (loading) {
    return <div className="container" style={{ padding: "50px", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <article className="news-section">
      <div className="container">
        <Heading title="📰 Health News Columns" />

        <div className="catButton">
          {category.map((cat) => (
            <button
              key={cat}
              onClick={() => filterItems(cat)}
              className={`primaryBtn ${activeCategory === cat ? "active-filter" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="news-list">
          {currentItems.map((item) => (
            <div key={item._id} className="news-item">
              <div className="news-image">
                <img
                  src={`https://hiwas-backend-production-56c5.up.railway.app${item.cover}`}
                  alt={item.title}
                />
              </div>

              <div className="news-content">
                <span className="news-category">{item.category}</span>
                <h2 className="news-title">{item.title}</h2>
                <div 
                  className="news-text"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(item.content?.slice(0, 200) + "...") 
                  }} 
                />
                {item.filePath && (
                  <a
                    href={`https://hiwas-backend-production-56c5.up.railway.app${item.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="download-btn"
                  >
                    ⬇ Download PDF
                  </a>
                )}
              </div>
              <div className="news-line"></div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
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