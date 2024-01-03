"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Search from "./Search";
import { useRouter } from "next/navigation";

const SelectHospitalDoctors = () => {
  const router = useRouter();
  const [hospital, setHospital] = useState([]);
  const [speciality, setSpeciality] = useState("");
  const [treatment, seTeatment] = useState("");

  useEffect(() => {
    const storedSpeciality = localStorage.getItem("selectedspecialityName");
    const storedTreatment = localStorage.getItem("selectedTreatmentName");

    if (storedSpeciality) {
      setSpeciality(storedSpeciality);
    }
    if (storedTreatment) {
      seTeatment(storedTreatment);
    }

    // Check if both speciality and treatment are not null before making the API call
    if (storedSpeciality && storedTreatment) {
      // Fetch the details data based on the activePackage ID
      axios
        .get(
          `https://dev.medflick.com/api/hospital-list/${storedSpeciality}/${storedTreatment}`
        )
        .then((response) => {
          // const limitedHospitals =
          //   response.data.hospital_list.hospital_list.slice(0, 10);
          setHospital(response.data.hospital_list.hospital_list);
          // Select the first hospital by default
          // if (limitedHospitals.length > 0) {
          //   const firstHospital = limitedHospitals[0];
          //   handleHospitalSelection(
          //     null,
          //     firstHospital.slug,
          //     firstHospital.country
          //   );
          // }
        })
        .catch((error) => {
          console.error("Error fetching details data:", error);
        });
    }
  }, []);

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedHospitalIcon, setSelectedHospitalIcon] = useState(null);
  const [selectedHospitalCountry, setSelectedHospitalCountry] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const handleHospitalSelection = async (
    event,
    hospitalSlug,
    country,
    hospitalId,
    hospitalIcon
  ) => {
    if (event) {
      event.preventDefault();
    }

    setSelectedHospital(hospitalSlug);
    setSelectedHospitalCountry(country);
    setSelectedHospitalIcon(hospitalIcon);
    await fetchDoctorsData(hospitalSlug, country);
    localStorage.setItem("selectedHospitalId", hospitalId);
  };

  const fetchDoctorsData = async (hospitalSlug, country) => {
    try {
      const response = await axios.get(
        `https://dev.medflick.com/api/hospital/${hospitalSlug}/${country}`
      );
      setDoctors(response.data.data.doctors);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching doctors data", error);
    }
  };

  const handleBookAppointment = (doctorId) => {
    // Save the doctorId to local storage
    localStorage.setItem("selectedDoctorId", doctorId);

    // Redirect to /patient-details page
    router.push("/patient-details");
  };

  console.log(selectedHospitalIcon);
  return (
    <>
      <section id="request-quote-section">
        <div className="midbox-inner wiki-mk">
          <div className="top-back">
            <Link href="/patient-quote">
              <img src="images/2023/01/back-icon.png" /> Back
            </Link>

            <div className="barbox">
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Select Medical Problem
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/3.png" /> Select Doctor &amp; Hospital
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Patient Details
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Upload Medical Report
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Get Quotes
              </div>
            </div>
          </div>

          <div className="hospital-doctor-box">
            <h1>Find Top Doctors and Hospitals</h1>
            <h1>
              <Search />
            </h1>
            <h2>
              Hospitals ({hospital.length}){" "}
              <Link href="/patient-details" className="get-qs">
                {" "}
                Skip step &gt;
              </Link>
            </h2>

            <div className="conditions-services">
              <div className="hospitals-tab">
                <div className="scrollbar">
                  {hospital.map((e) => (
                    <button
                      key={e.id}
                      className={`conditions ${
                        selectedHospital === e.slug ? "active" : ""
                      }`}
                      onClick={(event) =>
                        handleHospitalSelection(
                          event,
                          e.slug,
                          e.country,
                          e.id,
                          e.icon
                        )
                      }
                      id="defaultOpen"
                    >
                      <div className="hospital-item">
                        <div className="hospital-item-img">
                          <img
                            src={`https://dev.medflick.com/hospital/${e.image}`}
                            alt={e.name}
                          />
                        </div>
                        <div className="hospital-item-doc">
                          <h3>{e.name}</h3>
                          <div className="department-sub">
                            {e.location.charAt(0).toUpperCase() +
                              e.location.slice(1)}
                          </div>
                          <div className="ho-docimg">
                            {e.nabl && (
                              <img
                                src={`https://dev.medflick.com/hospital/${e.nabl}`}
                                alt={e.name}
                              />
                            )}
                            {e.nabh && (
                              <img
                                src={`https://dev.medflick.com/hospital/${e.nabh}`}
                                alt={e.name}
                              />
                            )}
                            {e.jci && (
                              <img
                                src={`https://dev.medflick.com/hospital/${e.jci}`}
                                alt={e.name}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedHospital && (
                <div
                  id="doctors-listbox-1"
                  className="conditionsbox"
                  style={{ display: "block" }}
                >
                  <div className="scrollbar1">
                    {doctors.map((e) => (
                      <div className="doctor-item-list" key={e.id}>
                        <div className="doctor-item-img">
                          <img
                            src={`https://dev.medflick.com/doctor/${e.image}`}
                            alt={e.name}
                          />
                        </div>
                        <div className="doctor-item-doc">
                          <h3>
                            {" "}
                            {e.prefix} {e.first_name} {e.last_name}
                          </h3>
                          <div className="department-sub">{e.designation}</div>
                          {/* <div className="rating-star">
                            <i className="fa fa-star"></i> 5 (523)
                          </div> */}
                          <div className="doc-experience">
                            <div className="years-exper">
                              {e.experience_year}+ Years of Experience{" "}
                            </div>
                            {e.surgery_treatment !== null && (
                              <div className="successful-plus">
                                {e.surgery_treatment}+ Successful Surgeries
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="doctor-item-button">
                          <a
                            className="book-app"
                            onClick={() => handleBookAppointment(e.id)}
                            style={{ cursor: "pointer" }}
                          >
                            Book Appointment{" "}
                            <img src="/images/2023/05/book.png" />
                          </a>
                          <div className="doc-Hospital">
                            {e.location.charAt(0).toUpperCase() +
                              e.location.slice(1)}
                            <img
                              src={`https://dev.medflick.com/hospital/${selectedHospitalIcon}`}
                              alt={selectedHospital}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectHospitalDoctors;
