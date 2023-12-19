"use client";
import { useState } from "react";
import Link from "next/link";

const HospitalSearch = ({ hospital }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQa, setFilteredQa] = useState([]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Check if the search term has at least three characters
    if (term.length >= 3) {
      const filteredQuestions = hospital.filter((question) =>
        question.name.toLowerCase().includes(term)
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
      <div className="find-doctor-box">
        <h2>Find Hospitals</h2>

        <div className="find-box">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Hospital"
              name="name"
              value={searchTerm}
              onChange={handleSearch}
            />
            {/* {searchTerm.length >= 3 && (
              <div className="searchbox-medf">
                {filteredQa.length > 0 ? (
                  filteredQa.map((question) => (
                    <Link href="/" key={question.id}>
                      <div
                        className="searchbox-main"
                        dangerouslySetInnerHTML={{
                          __html: highlightTerm(question.name),
                        }}
                      />
                    </Link>
                  ))
                ) : (
                  <>
                    <div>
                      <p style={{ textAlign: "center" }}>No results found.</p>
                    </div>
                  </>
                )}
              </div>
            )} */}
          </div>

          <div className="location-box">
            <input
              type="text"
              placeholder="Any Location"
              name="name"
              required=""
            />
          </div>
          <button type="submit" name="en" className="find-doctor">
            Find Doctor
          </button>
        </div>
      </div>
    </>
  );
};

export default HospitalSearch;
