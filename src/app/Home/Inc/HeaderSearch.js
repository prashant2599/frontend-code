"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getALLSearchApi from "@/app/lib/getAllSearchApi";

const HeaderSearch = ({ togglePopup }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [speciality, setSpeciality] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch specialities
      const specialityData = await getALLSearchApi();
      setDoctors(specialityData.searchData.doctors);
      setHospitals(specialityData.searchData.hospitals);
      setTreatment(specialityData.searchData.treatments);
      setSpeciality(specialityData.searchData.speciality);
      setBlogs(specialityData.searchData.blog);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowNotFoundMessage(true);
    }, 2000);
  }, []);

  const filteredSpeciality = speciality
    ? speciality.filter((item) => {
        const nameMatch = item.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
        const searchTerms = item.search_term ? item.search_term.split(",") : [];
        const searchMatch = searchTerms.some((term) => {
          const termWithoutSpaces = term.trim();
          const wordsAfterComma = termWithoutSpaces
            .split(" ")
            .slice(1)
            .join(" ");
          return (
            termWithoutSpaces
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            wordsAfterComma.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
        return nameMatch || searchMatch;
      })
    : [];

  const filteredTreatment = treatment
    ? treatment.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredDoctors = doctors
    ? doctors.filter(
        (item) =>
          item.prefix?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredHospitals = hospitals
    ? hospitals.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredBlogs = blogs
    ? blogs.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="head-searchbox">
        <input
          type="text"
          placeholder="Search"
          name="name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        {searchQuery.length >= 1 && (
          <div className="searchbox-medf">
            {filteredSpeciality.length > 0 ||
            filteredTreatment.length > 0 ||
            filteredDoctors.length > 0 ||
            filteredHospitals.length > 0 ||
            filteredBlogs.length > 0 ? (
              <div>
                {filteredSpeciality.length > 0 ? <h3>Specialities:</h3> : null}
                {filteredSpeciality.map((doctor) => (
                  <Link
                    key={doctor.id}
                    href={`/speciality/${doctor.slug}`}
                    onClick={() => {
                      setSearchQuery("");
                      if (typeof togglePopup === "function") {
                        togglePopup();
                      }
                      router.push(`/speciality/${doctor.slug}`); // Navigate to the link
                    }}
                  >
                    <div className="searchbox-main">
                      {doctor.name
                        .split(new RegExp(`(${searchQuery})`, "gi"))
                        .map((part, index) =>
                          part.toLowerCase() === searchQuery.toLowerCase() ? (
                            <span key={index} style={{ color: "#ff6800" }}>
                              {part}
                            </span>
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )}
                    </div>
                  </Link>
                ))}
                {filteredTreatment.length > 0 ? <h3>Treatments:</h3> : null}

                {filteredTreatment.map((doctor) => (
                  <Link
                    key={doctor.id}
                    href={`/treatment/${doctor.slug}`}
                    onClick={() => {
                      setSearchQuery("");
                      if (typeof togglePopup === "function") {
                        togglePopup();
                      }
                      router.push(`/treatment/${doctor.slug}`); // Navigate to the link
                    }}
                  >
                    <div className="searchbox-main">
                      {doctor.name
                        .split(new RegExp(`(${searchQuery})`, "gi"))
                        .map((part, index) =>
                          part.toLowerCase() === searchQuery.toLowerCase() ? (
                            <span key={index} style={{ color: "#ff6800" }}>
                              {part}
                            </span>
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )}
                    </div>
                  </Link>
                ))}

                {filteredDoctors.length > 0 ? <h3>Doctors:</h3> : null}

                {filteredDoctors.map((doctor) => (
                  <Link
                    key={doctor.id}
                    href={`/doctor/${doctor.slug}`}
                    onClick={() => {
                      setSearchQuery("");
                      if (typeof togglePopup === "function") {
                        togglePopup();
                      }
                      router.push(`/doctor/${doctor.slug}`); // Navigate to the link
                    }}
                  >
                    <div className="searchbox-main" key={doctor.id}>
                      {`${doctor.prefix} ${doctor.first_name} ${doctor.last_name}`
                        .split(new RegExp(`(${searchQuery})`, "gi"))
                        .map((part, index) =>
                          part.toLowerCase() === searchQuery.toLowerCase() ? (
                            <span key={index} style={{ color: "#ff6800" }}>
                              {part}
                            </span>
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )}
                    </div>
                  </Link>
                ))}

                {filteredHospitals.length > 0 ? <h3>Hospitals:</h3> : null}

                {filteredHospitals.map((doctor) => (
                  <Link
                    key={doctor.id}
                    href={`/hospital/${doctor.slug}`}
                    onClick={() => {
                      setSearchQuery("");
                      if (typeof togglePopup === "function") {
                        togglePopup();
                      }
                      router.push(`/hospital/${doctor.slug}`); // Navigate to the link
                    }}
                  >
                    <div className="searchbox-main" key={doctor.id}>
                      {doctor.name
                        .split(new RegExp(`(${searchQuery})`, "gi"))
                        .map((part, index) =>
                          part.toLowerCase() === searchQuery.toLowerCase() ? (
                            <span key={index} style={{ color: "#ff6800" }}>
                              {part}
                            </span>
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )}
                    </div>
                  </Link>
                ))}

                {filteredBlogs.length > 0 ? <h3>Blogs:</h3> : null}

                {filteredBlogs.map((doctor) => (
                  <Link
                    key={doctor.id}
                    href={`/blog/${doctor.slug}`}
                    onClick={() => {
                      setSearchQuery("");
                      if (typeof togglePopup === "function") {
                        togglePopup();
                      }
                      router.push(`/blog/${doctor.slug}`); // Navigate to the link
                    }}
                  >
                    <div className="searchbox-main" key={doctor.id}>
                      {doctor.name
                        .split(new RegExp(`(${searchQuery})`, "gi"))
                        .map((part, index) =>
                          part.toLowerCase() === searchQuery.toLowerCase() ? (
                            <span key={index} style={{ color: "#ff6800" }}>
                              {part}
                            </span>
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
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
                    onClick={() => {
                      setSearchQuery("");
                      if (typeof togglePopup === "function") {
                        togglePopup();
                      }
                      router.push("/contact-us"); // Navigate to the link
                    }}
                  >
                    Click here
                  </Link>{" "}
                  for quick assistance
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderSearch;
