"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function formatText(text) {
  if (typeof text === "string") {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return "Invalid input";
  }
}

const PatientPreviewQuote = () => {
  const router = useRouter();
  const [doctor, setDoctor] = useState([]);
  const [speciality, setSpeciality] = useState("");
  const [treatment, setTreatment] = useState("");
  const [specialityIcon, setSpecialityIcon] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
  });

  useEffect(() => {
    const storedDoctor = localStorage.getItem("selectedDoctorSlug");
    const specialityName = localStorage.getItem("selectedspecialityName");
    const treatmentName = localStorage.getItem("selectedTreatmentName");
    const specialityIcon = localStorage.getItem("specialityIcon");

    if (specialityName) {
      setSpeciality(specialityName);
    }
    if (treatmentName) {
      setTreatment(treatmentName);
    }
    if (specialityIcon) {
      setSpecialityIcon(specialityIcon);
    }

    if (storedDoctor) {
      // Fetch the details data based on the activePackage ID
      axios
        .get(`https://dev.medflick.com/api/doctor/${storedDoctor}`)
        .then((response) => {
          setDoctor(response.data.data.doctor_info);
        })
        .catch((error) => {
          console.error("Error fetching details data:", error);
        });
    }
    // const intervalId = setInterval(() => {
    //   localStorage.removeItem("selectedDoctorSlug");
    //   localStorage.removeItem("selectedspecialityName");
    //   localStorage.removeItem("selectedTreatmentName");
    //   localStorage.removeItem("specialityIcon");
    //   localStorage.removeItem("selectedHospitalSlug");
    //   localStorage.removeItem("selectedHospitalCountry");
    //   clearInterval(intervalId);
    // }, 6000); // 24 hours in milliseconds

    // // Cleanup the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, []);

  const [hospital, setHospital] = useState([]);

  useEffect(() => {
    const storedHospital = localStorage.getItem("selectedHospitalSlug");
    const storedHospitalCountry = localStorage.getItem(
      "selectedHospitalCountry"
    );

    if (storedHospital && storedHospitalCountry) {
      // Fetch the details data based on the activePackage ID
      axios
        .get(
          `https://dev.medflick.com/api/hospital/${storedHospital}/${storedHospitalCountry}`
        )
        .then((response) => {
          setHospital(response.data.data.hospital_info);
        })
        .catch((error) => {
          console.error("Error fetching details data:", error);
        });
    }
  }, []);

  const formattedSpeciality = formatText(speciality);
  const formattedTreatment = formatText(treatment);

  return (
    <>
      <section id="request-quote-section">
        <div className="midbox-inner wiki-mk">
          <div className="top-back">
            <a href="#">
              <img src="images/2023/01/back-icon.png" /> Back
            </a>

            <div className="barbox">
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Select Medical Problem
              </div>
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Select Doctor &amp;
                Hospital
              </div>
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Patient Details
              </div>
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Upload Medical Report
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/3.png" /> Get Quotes
              </div>
            </div>
          </div>

          <div className="hospital-doctor-box">
            <h1>Preview</h1>

            <div className="preview-section">
              <div className="preview-left-box">
                <h3>Medical Condition</h3>

                <div className="medical-condition-preview">
                  <div className="condition-preview-box">
                    <img
                      src={`https://dev.medflick.com/speciality/${specialityIcon}`}
                    />{" "}
                    {formattedSpeciality}
                  </div>
                  <div className="condition-preview-box">
                    <img
                      src={`https://dev.medflick.com/speciality/${specialityIcon}`}
                    />{" "}
                    {formattedTreatment}
                  </div>
                </div>

                <h3>Hospital and Doctor</h3>

                <div className="hospital-doctors-preview">
                  <div className="hospital-preview-box">
                    <div className="hospital-preview-img">
                      <img
                        src={`https://dev.medflick.com/hospital/${hospital.image}`}
                        alt={hospital.slug}
                      />
                    </div>
                    <div className="hospital-preview-doc">
                      <h3>{hospital.name}</h3>
                      <div className="department-sub">
                        {hospital.city
                          ? hospital.city.charAt(0).toUpperCase() +
                            hospital.city.slice(1)
                          : null}
                      </div>

                      {/* <div className="rating-star">
                        <i className="fa fa-star"></i> 5 (523)
                      </div> */}
                      <div className="ho-docimg">
                        {hospital.nabl && (
                          <img
                            src={`https://dev.medflick.com/hospital/${hospital.nabl}`}
                            alt={hospital.name}
                          />
                        )}
                        {hospital.nabh && (
                          <img
                            src={`https://dev.medflick.com/hospital/${hospital.nabh}`}
                            alt={hospital.name}
                          />
                        )}
                        {hospital.jci && (
                          <img
                            src={`https://dev.medflick.com/hospital/${hospital.jci}`}
                            alt={hospital.name}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="doctors-preview-box">
                    <div className="doctor-preview-img">
                      <img
                        src={`https://dev.medflick.com/doctor/${doctor.image}`}
                        alt={doctor.slug}
                      />
                    </div>
                    <div className="doctor-preview-doc">
                      <h3>
                        {doctor.prefix} {doctor.first_name} {doctor.last_name}
                      </h3>
                      <div className="department-sub">{doctor.designation}</div>
                      {/* <div className="rating-star">
                        <i className="fa fa-star"></i> 5 (523)
                      </div> */}
                      <div className="doc-experience">
                        <div className="years-exper">
                          {doctor.experience_year}+ Years
                        </div>
                        <div className="successful-plus">
                          {doctor.surgery_treatment}+ Successful Surgeries
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="preview-right-box">
                <div className="preview-details">
                  <h5>Full Name</h5> <span>Dinesh Bhagat</span>
                </div>
                <div className="preview-details">
                  <h5>Email</h5> <span>dinesh23@gmail.com</span>
                </div>
                <div className="preview-details">
                  <h5>Phone Number</h5> <span>+91 1234567890</span>
                </div>
                <div className="preview-details">
                  <h5>UHID</h5> <span>ABCD123545QWR</span>
                </div>
                <div className="preview-details">
                  <h5>Gender</h5> <span>Male</span>
                </div>
                <div className="preview-details">
                  <h5>Passport Number</h5> <span>ABCD123545QWR</span>
                </div>
                <div className="preview-details">
                  <h5>Medical Reports</h5>
                </div>

                <div className="uploadedfile-box">uploadedfile.pdf</div>
                <div className="uploadedfile-box">uploadedfile.jpg</div>
              </div>
            </div>

            <div className="preview-continue-button">
              <a
                href="#"
                className="preview-continue"
                style={{ background: "#ff6800", color: "#fff !important" }}
              >
                {" "}
                Submit
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PatientPreviewQuote;
