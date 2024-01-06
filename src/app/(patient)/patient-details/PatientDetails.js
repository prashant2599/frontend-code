"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import Success from "@/app/Home/successPopup/Success";
import ErrorPopup from "@/app/Home/successPopup/ErrorPopup";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const PatientDetails = () => {
  // form query post api
  const router = useRouter();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [name, setName] = useState("");
  const [pcode, setPcode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("");
  const [uhid, setUhid] = useState("");
  const [passport, setPassport] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    captcha: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // Check if 'userName' exists in localStorage on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserPhone = localStorage.getItem("userPhone");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (storedUserPhone) {
      setUserPhone(storedUserPhone);
    }

    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormErrors({
      name: "",
      phone: "",
      email: "",
      gender: "",
      captcha: "",
    });

    const patientId = localStorage.getItem("userId");

    // Validation logic
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!userName) {
      if (!name) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "Please enter your name",
        }));
        isValid = false;
      }
    }

    if (!phone || !phone.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
      isValid = false;
    }

    if (!userEmail) {
      if (!email || !email.match(emailRegex)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address",
        }));
        isValid = false;
      }
    }

    if (!gender) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        gender: "Please select your gender",
      }));
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (!captchaValue) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        captcha: "Please Fill the captcha",
      }));
      return;
    }
    if (isValid) {
      // Create the data object to be sent in the API request
      const data = {
        name: userName ? userName : name,
        phone_code: pcode,
        phone: phone,
        email: userEmail ? userEmail : email,
        passport: passport,
        patient_id: patientId,
        gender: gender,
        uhid: uhid,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor_query`;

      setIsLoading(true);

      // Make the API call
      axios
        .post(apiEndpoint, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setShowSuccessPopup(true);
          clearFormFields();
          router.push("/patient-report");
        })
        .catch((error) => {
          console.error("Error:", error);
          setShowErrorPopup(true);
        })
        .finally(() => {
          // Set loading back to false after the API call is complete
          setIsLoading(false);
        });
    }
  };

  const clearFormFields = () => {
    setName("");
    setPhone("");
    setEmail("");
    setQuery("");
    setSelectedFile(null);
  };

  const Formstyles = {
    errorInput: {
      border: "2px solid red",
    },
    errorMessage: {
      color: "red",
      fontSize: "0.85rem",
      marginTop: "0.25rem",
    },
    loadingMessage: {
      fontSize: "1.2rem",
      color: "#333",
      marginTop: "1rem",
    },
  };

  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;

    // Initialize intlTelInput with your options
    const iti = intlTelInput(inputElement, {
      initialCountry: "in",
      separateDialCode: true,
      // utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js',
    });

    // Add an event listener to handle changes
    inputElement.addEventListener("countrychange", () => {
      const selectedCountryData = iti.getSelectedCountryData();
      setPcode(selectedCountryData.dialCode);
    });

    // Clean up the plugin when the component unmounts
    return () => {
      iti.destroy();
    };
  }, []);

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setPhone(formattedPhoneNumber); // Update the phone number state
  };

  const phoneRegex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePhoneBlur = () => {
    if (!phone || !phone.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "",
      }));
    }
  };

  const handleEmailBlur = () => {
    if (!email || !email.match(emailRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const handleNameBlur = () => {
    if (!userName) {
      if (!name) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "Please enter your name",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "",
        }));
      }
    }
  };

  const renderError = (error) =>
    error && (
      <div
        className="error-message"
        style={{ fontSize: "15px", textAlign: "left" }}
      >
        {error}
      </div>
    );

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const desc = "Your Contact Details has been submitted";

  return (
    <>
      <section id="request-quote-section">
        <div className="midbox-inner wiki-mk">
          <div className="top-back">
            <Link href="/patient-select">
              <img src="images/2023/01/back-icon.png" /> Back
            </Link>
            <div className="barbox">
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Select Medical Problem
              </div>
              <div className="barbox-bar">
                <img src="images/selectedImg.png" /> Select Doctor &amp;
                Hospital
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/3.png" /> Patient Details
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Upload Medical Report
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Get Quotes
              </div>
            </div>
          </div>

          <div className="request-quote">
            <div className="get-help-box">
              <h1>Please enter patient’s contact details</h1>
              <h1>
                <div className="query-form">
                  <div className="treatmentPatient-right">
                    <form onSubmit={handleFormSubmit}>
                      <div className="treatmentPatient-form">
                        <div className="inputbox">
                          <label>Full Name*</label>
                          <input
                            type="text"
                            placeholder=""
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                            onBlur={handleNameBlur}
                            style={formErrors.name ? Formstyles.errorInput : {}}
                          />
                          {renderError(formErrors.name)}
                        </div>
                      </div>

                      <div className="treatmentPatient-form">
                        <div className="inputbox">
                          <label>Phone*</label>
                          <input
                            ref={inputRef}
                            type="tel"
                            id="mobile_code"
                            placeholder=""
                            value={phone}
                            onChange={handlePhoneNumberChange}
                            onBlur={handlePhoneBlur}
                            style={
                              formErrors.phone ? Formstyles.errorInput : {}
                            }
                          />
                          {renderError(formErrors.phone)}
                        </div>
                      </div>

                      <div className="treatmentPatient-form">
                        <div className="inputbox">
                          <label>Email Address*</label>
                          <input
                            type="text"
                            placeholder=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleEmailBlur}
                            autoComplete="off"
                            style={
                              formErrors.email ? Formstyles.errorInput : {}
                            }
                          />
                          {renderError(formErrors.email)}
                        </div>
                      </div>

                      <div className="treatmentPatient-form">
                        <div className="inputbox">
                          <label>UHID (If Available)</label>
                          <input
                            type="text"
                            placeholder=""
                            name="name"
                            value={uhid}
                            onChange={(e) => setUhid(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="treatmentPatient-form">
                        <div className="inputbox">
                          <label>Gender*</label>
                          <select
                            onChange={(e) => setGender(e.target.value)}
                            style={
                              formErrors.gender ? Formstyles.errorInput : {}
                            }
                          >
                            <option value="" disabled selected>
                              Select gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          {renderError(formErrors.gender)}
                        </div>
                      </div>

                      <div className="treatmentPatient-form">
                        <div className="inputbox">
                          <label>Passport Number</label>
                          <input
                            type="text"
                            placeholder=""
                            name="name"
                            value={passport}
                            onChange={(e) => setPassport(e.target.value)}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        name="en"
                        className="home-button"
                        disabled={isLoading}
                      >
                        {" "}
                        {isLoading ? (
                          <ThreeDots
                            height="27"
                            width="80"
                            radius="9"
                            color="#ffffff"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                          />
                        ) : (
                          "Continue"
                        )}
                        <img
                          src="/images/2023/01/arrow-c.png"
                          alt="arrow-Icon"
                        />
                      </button>
                    </form>
                  </div>
                </div>
              </h1>
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

export default PatientDetails;
