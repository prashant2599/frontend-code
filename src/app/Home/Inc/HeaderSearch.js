"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    // Fetch the details data based on the activePackage ID
    axios
      .get(`https://dev.medflick.com/api/search`)
      .then((response) => {
        setSpeciality(response.data.searchData.speciality);
        setTreatment(response.data.searchData.treatments);
        setDoctors(response.data.searchData.doctors);
        setHospitals(response.data.searchData.hospitals);
        setBlogs(response.data.searchData.blog);
      })
      .catch((error) => {
        console.error("Error fetching details data:", error);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowNotFoundMessage(true);
    }, 2000);
  }, []);

  const filteredSpeciality = speciality
    ? speciality.filter((item) =>
        item.menu_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredTreatment = treatment
    ? treatment.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredDoctors = doctors
    ? doctors.filter(
        (item) =>
          item.prefix.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredHospitals = hospitals
    ? hospitals.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredBlogs = blogs
    ? blogs.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        {searchQuery.length >= 2 && (
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
                      togglePopup();
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
                      togglePopup();
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
                      togglePopup();
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
                    href={`/hospital/${doctor.slug}/${doctor.country}`}
                    onClick={() => {
                      setSearchQuery("");
                      togglePopup();
                      router.push(`/hospital/${doctor.slug}/${doctor.country}`); // Navigate to the link
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
                      togglePopup();
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
                <p style={{ textAlign: "center" }}>No data found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderSearch;
