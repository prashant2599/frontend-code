"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Success from "@/app/Home/successPopup/Success";
import ErrorPopup from "@/app/Home/successPopup/ErrorPopup";

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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [speciality, setSpeciality] = useState("");
  const [treatment, setTreatment] = useState("");
  const [specialityIcon, setSpecialityIcon] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pcode, setPcode] = useState("");
  const [phone, setPhone] = useState("");
  const [treatmentId, setTreatmentId] = useState("");
  const [specialityId, setSpecialityId] = useState("");
  const [uhid, setUhid] = useState("");
  const [passport, setPassport] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [filebase64, setFilebase64] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [gender, setGender] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [patientFile, setPatientFile] = useState("");
  const [patientFileName, setPatientFileName] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
  });
  useEffect(() => {
    const treatmentId = localStorage.getItem("treatment");
    const specialityId = localStorage.getItem("speciality");
    const patientName = localStorage.getItem("patientName");
    const patientEmail = localStorage.getItem("patientEmail");
    const pcode = localStorage.getItem("pcode");
    const phone = localStorage.getItem("phone");
    const selectedHospitalId = localStorage.getItem("selectedHospitalId");
    const selectedDoctorId = localStorage.getItem("selectedDoctorId");
    const uhid = localStorage.getItem("uhid");
    const passport = localStorage.getItem("passport");
    const gender = localStorage.getItem("gender");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const patientFile = localStorage.getItem("patientFile");
    const patientFileLink = localStorage.getItem("patientFileLink");
    const patientFileName = localStorage.getItem("patientFileName");

    if (patientFileName) {
      setPatientFileName(patientFileName);
    }

    if (patientFileLink) {
      setFileLink(patientFileLink);
    }

    if (patientFile) {
      // Set the base64 string in the state
      setFilebase64(patientFile);

      // Assuming you have the filename and mimeType available
      const filename = patientFileName;
      const mimeType = extractFileInfo(patientFileName);

      try {
        // Call the base64toFile function and set the resulting File object in state
        const file = base64toFile(patientFile, filename, mimeType);
        setPatientFile(file);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    if (userEmail) {
      setUserEmail(userEmail);
    }

    if (userName) {
      setUserName(userName);
    }
    if (treatmentId) {
      setTreatmentId(treatmentId);
    }
    if (specialityId) {
      setSpecialityId(specialityId);
    }
    if (patientName) {
      setName(patientName);
    }
    if (patientEmail) {
      setEmail(patientEmail);
    }
    if (pcode) {
      setPcode(pcode);
    }
    if (phone) {
      setPhone(phone);
    }
    if (selectedHospitalId) {
      setHospitalId(selectedHospitalId);
    }
    if (selectedDoctorId) {
      setDoctorId(selectedDoctorId);
    }
    if (uhid) {
      setUhid(uhid);
    }
    if (passport) {
      setPassport(passport);
    }
    if (gender) {
      setGender(gender);
    }
  }, []);

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

  const extractFileInfo = (filename) => {
    const parts = filename.split(".");
    const fileExtension = parts[parts.length - 1].toLowerCase(); // Get the last part after the dot
    let mimeType = "application/octet-stream"; // Default MIME type

    // Define MIME types based on file extensions
    const mimeTypes = {
      png: "image/png",
      jpg: "image/jpeg",
      pdf: "application/pdf",
      // Add more as needed
    };

    // Use the defined MIME type or default to "application/octet-stream"
    mimeType = mimeTypes[fileExtension] || mimeType;

    return { filename, mimeType };
  };

  function base64toFile(base64Data, filename, mimeType) {
    // Remove the data URL prefix to get the actual Base64 data
    const base64WithoutPrefix = base64Data.replace(/^data:[^;]+;base64,/, "");

    // Convert Base64 to File
    const byteCharacters = atob(base64WithoutPrefix);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: mimeType });
    const file = new File([blob], filename, { type: mimeType });

    return file;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const patientId = localStorage.getItem("userId");

    const data = new FormData();

    data.append("patient_id", patientId);
    data.append("speciality_id", specialityId);
    data.append("treatment_id", treatmentId);
    data.append("name", name ? name : userName);
    data.append("email", email ? email : userEmail);
    data.append("phone_code", pcode);
    data.append("phone", phone);
    data.append("passport", passport);
    data.append("gender", gender);
    data.append("uhid", uhid);
    data.append("doctor_id", doctorId);
    data.append("hospital_id", hospitalId);
    data.append("media_link", fileLink);
    data.append("uploadfiles", patientFile);

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const apiEndpoint = `https://api.medflick.com/api/uploadreport`;

    // Make the API call
    axios
      .post(apiEndpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setShowSuccessPopup(true);
        localStorage.removeItem("speciality");
        localStorage.removeItem("gender");
        localStorage.removeItem("passport");
        localStorage.removeItem("selectedDoctorSlug");
        localStorage.removeItem("patientFile");
        localStorage.removeItem("patientFileName");
        localStorage.removeItem("selectedDoctorId");
        localStorage.removeItem("specialityIcon");
        localStorage.removeItem("selectedspecialityName");
        localStorage.removeItem("selectedHospitalCountry");
        localStorage.removeItem("patientEmail");
        localStorage.removeItem("selectedTreatmentName");
        localStorage.removeItem("uhid");
        localStorage.removeItem("treatment");
        localStorage.removeItem("pcode");
        localStorage.removeItem("selectedHospitalId");
        localStorage.removeItem("selectedHospitalSlug");
        localStorage.removeItem("patientName");
        localStorage.removeItem("phone");

        router.push("/patient-dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
        setShowErrorPopup(true);
      });
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const desc = "Thank You For Submit Your Details";

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
                  <h5>Full Name</h5> <span>{name ? name : userName}</span>
                </div>
                <div className="preview-details">
                  <h5>Email</h5> <span>{email ? email : userEmail}</span>
                </div>
                <div className="preview-details">
                  <h5>Phone Number</h5>{" "}
                  <span>
                    {pcode} {phone}
                  </span>
                </div>
                <div className="preview-details">
                  <h5>UHID</h5> <span>{uhid}</span>
                </div>
                <div className="preview-details">
                  <h5>Gender</h5> <span>{gender}</span>
                </div>
                <div className="preview-details">
                  <h5>Passport Number</h5> <span>{passport}</span>
                </div>
                <div className="preview-details">
                  <h5>Medical Reports</h5>
                </div>

                <div className="uploadedfile-box">{patientFileName}</div>
                {/* <div className="uploadedfile-box">uploadedfile.jpg</div> */}
              </div>
            </div>

            <div className="preview-continue-button" onClick={handleFormSubmit}>
              <a
                className="preview-continue"
                style={{
                  background: "#ff6800",
                  color: "#ffff !important",
                  cursor: "pointer",
                }}
              >
                {" "}
                Submit
              </a>
            </div>
          </div>
        </div>
      </section>
      {showSuccessPopup && (
        <Success
          onClose={handleCloseSuccessPopup}
          showSuccessPopup={showSuccessPopup}
          desc={desc}
        />
      )}
      {showErrorPopup && (
        <ErrorPopup
          onClose={handleCloseErrorPopup}
          showErrorPopup={showErrorPopup}
        />
      )}
    </>
  );
};

export default PatientPreviewQuote;
