"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import getALLSearchApi from "@/app/lib/getAllSearchApi";

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

const HospitalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQa, setFilteredQa] = useState([]);
  // const parts = slug && slug.split("/");
  // const Category = parts && parts[0];

  // const fotmattedCategory = Category && formatText(Category);

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch specialities
      const specialityData = await getALLSearchApi();
      setHospitals(specialityData.searchData.hospitals);
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Check if the search term has at least three characters
    if (term.length >= 2) {
      const filteredQuestions = hospitals.filter((question) =>
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

        <div className="find-box-list">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Hospital"
              name="name"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm.length >= 2 && (
              <div className="searchbox-medf-hospital">
                {filteredQa.length > 0 ? (
                  filteredQa.map((question) => (
                    <Link href={`/hospital/${question.slug}`} key={question.id}>
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
                      <p
                        style={{
                          textAlign: "center",
                          color: "#000",
                          padding: "10px",
                        }}
                      >
                        Can't find what are you looking for?{" "}
                        <Link
                          href="/contact-us"
                          style={{ color: "#ff6800" }}
                         
                        >
                          Click here
                        </Link>{" "}
                        for quick assistance
                      </p>
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

export default HospitalSearch;
