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

const DoctorsSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQa, setFilteredQa] = useState([]);
  // const parts = slug && slug.split("/");
  // const Category = parts && parts[0];
  // const countrySlug = parts && parts[1];
  // const citySlug = parts && parts[2];
  // const treatmentSlug = parts && parts[1];
  // const countrySlugTreatment = parts && parts[3];
  // const position5 = parts && parts[5];

  // const [doctorCountry, setDoctorCountry] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const result = await getALLCountry();
  //       setDoctorCountry(result.country_name);
  //     } catch (err) {
  //       console.log(err.message); // Set the error message in state
  //     }
  //   }

  //   fetchData();
  // }, []);

  // const fotmattedCategory = Category && formatText(Category);
  // const formattedcountry = countrySlug && formatText(countrySlug);
  // const formattedcity = citySlug && formatText(citySlug);
  // const formattedTreatmentCountry =
  //   countrySlugTreatment && formatText(countrySlugTreatment);

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch specialities
      const specialityData = await getALLSearchApi();
      setDoctors(specialityData.searchData.doctors);
    };

    fetchData();
  }, []);

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

  // const isPositionInDoctorCountry = doctorCountry.some(
  //   (countryObj) => countryObj.country === countrySlug
  // );

  // const isPositionTreatmentCity =
  //   doctors && doctors.some((e) => e.location === citySlug);

  // // Check if the citySlug is in the doctor's locations
  // const isPositionCity =
  //   doctors && doctors.some((e) => e.location === countrySlug);

  // const isPositionInTreatment =
  //   treatment && treatment.some((e) => e.slug === countrySlug);
  // const positionTreatmentCountry = doctorCountry.some(
  //   (e) => e.country === citySlug
  // );

  // const filteredDoctors = doctors
  //   ? doctors.filter(
  //       (item) =>
  //         item.prefix.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         item.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         item.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   : [];

  return (
    <>
      <div className="find-doctor-box">
        {/* {isPositionInDoctorCountry ? (
          <h2>
            Find {fotmattedCategory} Doctors in {formattedcountry}
          </h2>
        ) : isPositionCity ? (
          <h2>
            Find {fotmattedCategory} Doctors in {formattedcountry},{" "}
            {formattedcity}{" "}
          </h2>
        ) : positionTreatmentCountry ? (
          <h2>
            Find {formattedcountry} Doctors in {formattedcity}
          </h2>
        ) : isPositionTreatmentCity ? (
          <h2>
            Find {formattedcountry} Doctors in {formattedcity},{" "}
            {formattedTreatmentCountry}{" "}
          </h2>
        ) : isPositionInTreatment ? (
          <h2>Find {formattedcountry} Doctors</h2>
        ) : (
          <h2>Find {fotmattedCategory} Doctors</h2>
        )} */}

        <h2>Find Doctors</h2>

        <div className="find-box-list">
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
                      <p
                        style={{
                          textAlign: "center",
                          color: "#000",
                          padding: "10px",
                        }}
                      >
                        Can't find what are you looking for?{" "}
                        <Link href="/contact-us" style={{ color: "#ff6800" }}>
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

export default DoctorsSearch;
