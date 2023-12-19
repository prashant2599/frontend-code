"use client";
import { useState } from "react";
import Link from "next/link";

function formatText(text) {
  if (typeof text === "string") {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    // Handle the case where 'text' is not a string or is undefined
    return "Invalid input"; // Or any other appropriate error handling
  }
}

const DoctorsSearch = ({ doctors, slug }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQa, setFilteredQa] = useState([]);
  const parts = slug && slug.split("/");
  const Category = parts && parts[0];

  const fotmattedCategory = Category && formatText(Category);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Check if the search term has at least three characters
    if (term.length >= 2) {
      const filteredQuestions = doctors.filter(
        (doctor) =>
          doctor.prefix.toLowerCase().includes(term) ||
          doctor.first_name.toLowerCase().includes(term) ||
          doctor.last_name.toLowerCase().includes(term)
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
        <h2>Find {fotmattedCategory} Doctors</h2>

        <div className="find-box">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Doctor"
              name="name"
              required=""
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm.length >= 2 && (
              <div className="searchbox-medf-hospital">
                {filteredQa.length > 0 ? (
                  filteredQa.map((question) => (
                    <Link href={`/doctor/${question.slug}`} key={question.id}>
                      <div
                        className="searchbox-main"
                        dangerouslySetInnerHTML={{
                          __html: `${highlightTerm(
                            question.prefix
                          )} ${highlightTerm(
                            question.first_name
                          )} ${highlightTerm(question.last_name)}`,
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
            )}
          </div>
          {/* <div className="location-box">
                <input
                  type="text"
                  placeholder="Any Location"
                  name="name"
                  required=""
                />
              </div>
              <button type="submit" name="en" className="find-doctor">
                Find Doctor
              </button> */}
        </div>
      </div>
    </>
  );
};

export default DoctorsSearch;