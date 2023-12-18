"use client";
import React, { useState, useRef, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import Success from "../successPopup/Success";
import ErrorPopup from "../successPopup/ErrorPopup";

const HospitalListPopUpForm = ({ hospitalId, name }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [name2, setName2] = useState("");
  const [pcode2, setPcode2] = useState("+91");
  const [phone2, setPhone2] = useState("");
  const [email2, setEmail2] = useState("");
  const [query2, setQuery2] = useState("");

  const togglePopup2 = () => {
    setIsPopupOpen2((prev) => !prev);
  };

  const popupStyle2 = {
    display: isPopupOpen2 ? "block" : "none",
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (isPopupOpen2) {
      const inputElement = inputRef.current;

      if (!inputElement) {
        console.error("Input element is null or undefined");
        return;
      }

      const iti = intlTelInput(inputElement, {
        initialCountry: "in",
        separateDialCode: true,
        // utilsScript:
        //   "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });

      inputElement.addEventListener("countrychange", () => {
        const selectedCountryData = iti.getSelectedCountryData();
        setPcode2(selectedCountryData.dialCode);
      });

      return () => {
        iti.destroy();
      };
    }
  }, [isPopupOpen2]);

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = e.target.value.replace(/\D/g, "");
    setPhone2(formattedPhoneNumber);
  };

  const [isLoading2, setIsLoading2] = useState(false);

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    query: "",
    captcha: "",
  });
  const [captchaValue2, setCaptchaValue2] = useState(null);
  const handleCaptchaChange2 = (value) => {
    setCaptchaValue2(value);
  };

  const handleFormSubmit2 = (event) => {
    event.preventDefault();

    setFormErrors({
      name: "",
      phone: "",
      email: "",
      query: "",
      captcha: "",
    });

    // Validation logic
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,}$/;

    if (!name2) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please enter your name",
      }));
      isValid = false;
    }
    if (!phone2 || !phone2.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
      isValid = false;
    }

    if (!email2 || !email2.match(emailRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
      isValid = false;
    }

    if (!query2) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        query: "Please enter your query",
      }));
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (!captchaValue2) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        captcha: "Please Fill the captcha",
      }));
      return;
    }
    const patientId = localStorage.getItem("userId");

    if (isValid) {
      // Create the data object to be sent in the API request
      const data = {
        name: name2,
        phone_code: pcode2,
        phone: phone2,
        email: email2,
        messages: query2,
        hospital_id: hospitalId,
        patient_id: patientId,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `https://dev.medflick.com/api/hospital_query`;

      setIsLoading2(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
        .then((response) => {
          setShowSuccessPopup(true);
          clearFormFields2();
          setIsPopupOpen2(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setShowErrorPopup(true);
        })
        .finally(() => {
          setIsLoading2(false);
        });
    }
  };

  const clearFormFields2 = () => {
    setName2("");
    setPhone2("");
    setEmail2("");
    setQuery2("");
  };

  const Formstyles2 = {
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

  const phoneRegex = /^\d{10,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePhoneBlur = () => {
    if (!phone2 || !phone2.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
    }
  };

  const handleEmailBlur = () => {
    if (!email2 || !email2.match(emailRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
    }
  };

  const renderError = (error) =>
    error && <div className="error-message">{error}</div>;
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };
  return (
    <>
      <a
        onClick={togglePopup2}
        style={{ cursor: "pointer" }}
        className="book-app"
      >
        Book Appointment <img src="/images/2023/05/book.png" alt="icon" />
      </a>
      {isPopupOpen2 && (
        <div className="popup" data-popup="popup-1" style={popupStyle2}>
          <div className="popup-inner2">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="popup-close"
                  data-popup-close="popup-1"
                  data-dismiss="modal"
                  onClick={togglePopup2}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <h2>
                {" "}
                Book Appointment at <br />
                <span style={{ color: "#ff6800" }}>{name}</span> now!
              </h2>
              <form onSubmit={handleFormSubmit2}>
                <div className="treatment-form">
                  <div className="inputbox">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder=""
                      name="name"
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      autoComplete="off"
                      style={formErrors.name ? Formstyles2.errorInput : {}}
                    />
                    {renderError(formErrors.name)}
                  </div>
                </div>

                <div className="treatment-form">
                  <div className="inputbox">
                    <label>Phone</label>
                    <input
                      ref={inputRef}
                      type="tel"
                      id="mobileode"
                      placeholder=""
                      value={phone2}
                      onChange={handlePhoneNumberChange}
                      onBlur={handlePhoneBlur}
                      style={formErrors.phone ? Formstyles2.errorInput : {}}
                    />
                    {renderError(formErrors.phone)}
                  </div>
                </div>

                <div className="treatment-form">
                  <div className="inputbox">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder=""
                      name="name"
                      value={email2}
                      onChange={(e) => setEmail2(e.target.value)}
                      autoComplete="off"
                      onBlur={handleEmailBlur}
                      style={formErrors.email ? Formstyles2.errorInput : {}}
                    />
                    {renderError(formErrors.email)}
                  </div>
                </div>

                <div className="treatment-form">
                  <div className="inputbox">
                    <label>Your Query</label>
                    <textarea
                      className="querybox"
                      type="textarea"
                      name="query"
                      placeholder=""
                      rows="2"
                      value={query2}
                      onChange={(e) => setQuery2(e.target.value)}
                      autoComplete="off"
                      style={formErrors.query ? Formstyles2.errorInput : {}}
                    ></textarea>
                    {renderError(formErrors.query)}
                  </div>
                </div>
                <ReCAPTCHA
                  sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
                  onChange={handleCaptchaChange2}
                />
                {renderError(formErrors.captcha)}
                <button
                  type="submit"
                  name="en"
                  className="home-button"
                  disabled={isLoading2}
                >
                  {" "}
                  {isLoading2 ? (
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
                    "Submit Now"
                  )}
                  <img src="/images/2023/01/arrow-c.png" alt="arrow-Icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showSuccessPopup && (
        <Success
          onClose={handleCloseSuccessPopup}
          showSuccessPopup={showSuccessPopup}
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

export default HospitalListPopUpForm;
