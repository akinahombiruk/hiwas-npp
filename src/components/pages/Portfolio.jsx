import React, { useEffect, useState } from "react";
import { Heading } from "../common/Heading";
import DOMPurify from "dompurify";

export const Portfolio = () => {
  const [list, setList] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Read More / Read Less state
  const [expandedItems, setExpandedItems] = useState({});

  const itemsPerPage = 10;


  useEffect(() => {
    setLoading(true);

    fetch(
      "https://hiwas-backend-production-56c5.up.railway.app/api/newsletters"
    )
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setAllItems(data);

        const cats = [
          "all",
          ...new Set(data.map((i) => i.category)),
        ];

        setCategory(cats);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });

  }, []);


  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  const filterItems = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);

    if (cat === "all") {
      setList(allItems);
    } else {
      setList(
        allItems.filter((i) => i.category === cat)
      );
    }
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentItems = list.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    list.length / itemsPerPage
  );


  const getImageUrl = (coverPath) => {

    if (!coverPath) return null;


    if (coverPath.startsWith("http")) {
      return coverPath;
    }


    const baseUrl =
      "https://hiwas-backend-production-56c5.up.railway.app";


    if (coverPath.startsWith("/")) {
      return `${baseUrl}${coverPath}`;
    }


    if (coverPath.includes("uploads/")) {
      return `${baseUrl}/${coverPath}`;
    }


    return `${baseUrl}/uploads/${coverPath}`;
  };


  if (loading) {
    return (
      <div
        className="container"
        style={{
          padding: "50px",
          textAlign: "center",
        }}
      >
        Loading...
      </div>
    );
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
              className={`primaryBtn ${
                activeCategory === cat
                  ? "active-filter"
                  : ""
              }`}
            >

              {cat}

            </button>

          ))}

        </div>



        <div className="news-list">


          {currentItems.map((item) => (

            <div
              key={item._id}
              className="news-item"
            >


              <div className="news-image">


                {item.cover ? (

                  <img
                    src={getImageUrl(item.cover)}
                    alt={item.title}

                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }}

                  />

                ) : (

                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                    }}
                  >

                    No Image

                  </div>

                )}

              </div>




              <div className="news-content">


                <span className="news-category">
                  {item.category}
                </span>



                <h2 className="news-title">
                  {item.title}
                </h2>




                <div

                  className="news-text"

                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(

                      expandedItems[item._id]

                        ? item.content || ""

                        : item.content &&
                          item.content.length > 200

                        ? item.content.slice(0, 200) + "..."

                        : item.content || ""

                    ),
                  }}

                />





                {item.content &&
                  item.content.length > 200 && (

                    <button
                      className="read-more-btn"
                      onClick={() =>
                        toggleExpand(item._id)
                      }
                    >

                      {expandedItems[item._id]
                        ? "Read Less"
                        : "Read More"}

                    </button>

                )}





                {item.filePath && (

                  <a

                    href={getImageUrl(item.filePath)}

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

            onClick={() =>
              setCurrentPage(currentPage - 1)
            }

            disabled={currentPage === 1}

          >

            Prev

          </button>



          <span>

            Page {currentPage} of {totalPages}

          </span>




          <button

            onClick={() =>
              setCurrentPage(currentPage + 1)
            }

            disabled={currentPage === totalPages}

          >

            Next

          </button>


        </div>




      </div>


    </article>

  );

};