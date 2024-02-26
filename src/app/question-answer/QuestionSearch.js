"use client";

import { useState } from "react";
import Link from "next/link";
import { useToggleQuestion } from "../contex/toggleQuestionContext";

const QuestionSearch = ({ qa }) => {
  const { togglePopup, isPopupOpen } = useToggleQuestion();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQa, setFilteredQa] = useState([]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Check if the search term has at least three characters
    if (term.length >= 2) {
      const filteredQuestions = qa.filter((question) =>
        question.short_description.toLowerCase().includes(term)
      );

      setFilteredQa(filteredQuestions);
    } else {
      // If the search term has less than three characters, clear the filtered list
      setFilteredQa([]);
    }
  };

  const highlightTerm = (text) => {
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="color: #ff6800;">${match}</span>`
    );
  };

  const popupStyle = {
    display: isPopupOpen ? "none" : "block",
  };

  return (
    <>
      <div className="search-suestions">
        <h1>Search for Questions</h1>

        <div className="search-medflick">
          <div className="search-box-medflick">
            <span>Search Terms:</span>
            <div className="search-terms">
              <input
                type="text"
                placeholder="Search"
                name="name"
                value={searchTerm}
                onChange={handleSearch}
                autoFocus="off"
              />
              {searchTerm.length >= 2 && (
                <div className="searchbox-medf" style={popupStyle}>
                  {filteredQa.length > 0 ? (
                    filteredQa.map((question) => (
                      <Link
                        href={`/question/${question.id}/${encodeURIComponent(
                          question.short_description
                            .toLowerCase()
                            .replace(/[^\w\s]/g, "-")
                            .replace(/\s+/g, "-")
                            .replace(/-+$/, "") // Remove trailing hyphen(s)
                        )}`}
                        key={question.id}
                      >
                        <div
                          className="searchbox-main"
                          dangerouslySetInnerHTML={{
                            __html: highlightTerm(question.short_description),
                          }}
                        />
                      </Link>
                    ))
                  ) : (
                    <>
                      <div>
                        <p style={{ textAlign: "center", padding: "10px" }}>
                          No results found. Would you like to ask a question?{" "}
                          <button
                            onClick={togglePopup}
                            style={{ cursor: "pointer" }}
                          >
                            Ask a Free Question
                          </button>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* <button id="show-hidden-menu" onClick={toggleMenu}>
                      Advanced Search
                      <img
                        className={menuVisible ? "plus1" : "plus"}
                        src="images/2023/07/plus.png"
                        alt=""
                      />
                      <img
                        className={menuVisible ? "plus" : "plus1"}
                        src="images/2023/07/plus1.png"
                        alt=""
                      />
                    </button> */}
        </div>

        {/* <div
                    className={`hidden-menu ${
                      menuVisible ? "visible" : "hidden"
                    }`}
                    style={hiddenMenuStyle}
                  >
                    <div className="search-medflick">
                      <div className="search-box-medflick">
                        <span>Search Terms:</span>
                        <div className="search-terms">
                          <input
                            type="text"
                            placeholder="Search Medflick"
                            name="name"
                            required=""
                          />
                        </div>
                      </div>
                    </div>

                    <div className="search-medflick">
                      <div className="search-box-medflick">
                        <span>Date Range:</span>
                        <div className="date-range">
                          <input
                            type="text"
                            placeholder="DD/MM/YYYY"
                            name="name"
                            required=""
                          />
                        </div>
                        <div className="date-range1">
                          <span>To:</span>
                          <input
                            type="text"
                            placeholder="DD/MM/YYYY"
                            name="name"
                            required=""
                          />
                        </div>
                      </div>

                      <div className="search-button">
                        <button>Search Now</button>
                      </div>
                    </div>
                  </div> */}
      </div>
    </>
  );
};

export default QuestionSearch;
