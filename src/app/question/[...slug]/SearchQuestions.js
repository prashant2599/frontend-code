"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import getAllSpeciality from "@/app/lib/getAllSpeciality";

const SearchQuestions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQa, setFilteredQa] = useState([]);
  const [qa, setQa] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllSpeciality();

        setQa(result.data.qa);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Check if the search term has at least three characters
    if (term.length >= 3) {
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
  return (
    <>
      <div className="search-suestions">
        <h1>Search for Questions</h1>

        <div className="search-medflick">
          <div className="search-box-medflick">
            <div className="search-terms">
              <input
                type="text"
                placeholder="Search"
                name="name"
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchTerm.length >= 3 && (
                <div className="searchbox-medf">
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
                        <p style={{ textAlign: "center" }}>
                          No results found. Would you like to ask a question?
                        </p>
                      </div>
                      {/* <div className="search-question-right">
                        <PopForm  />
                      </div> */}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchQuestions;