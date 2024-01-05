"use client";
import React, { useState, useRef, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import Success from "../Home/successPopup/Success";
import ErrorPopup from "../Home/successPopup/ErrorPopup";

const CallMeBackForm = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [name2, setName2] = useState("");
  const [pcode2, setPcode2] = useState("+91");
  const [phone2, setPhone2] = useState("");
  const [email2, setEmail2] = useState("");
  const [query2, setQuery2] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValidationMessage, setFileValidationMessage] = useState("");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const isValidFile = (file) => {
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    const maxFileSize = 2 * 1024 * 1024; // 2MB

    if (!file) {
      return "Please select a file.";
    }

    if (!allowedTypes.includes(file.type)) {
      return "Please select a valid file type (PNG, JPG, PDF).";
    }

    if (file.size > maxFileSize) {
      return "File size must be less than or equal to 2MB.";
    }

    return "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validationMessage = isValidFile(file);
    if (validationMessage) {
      setFileValidationMessage(validationMessage);
      event.target.value = null; // Clear the file input
      return;
    } else {
      setFileValidationMessage("");
    }
    setSelectedFile(file);
  };

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
    const patientId = localStorage.getItem("userId");
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!userName) {
      if (!name2) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "Please enter your name",
        }));
        isValid = false;
      }
    }
    if (!phone2 || !phone2.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
      isValid = false;
    }

    if (!userEmail) {
      if (!email2 || !email2.match(emailRegex)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address",
        }));
        isValid = false;
      }
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

    if (isValid) {
      // Create the data object to be sent in the API request
      const data = {
        name: userName ? userName : name2,
        phone_code: pcode2,
        phone: phone2,
        email: userEmail ? userEmail : email2,
        messages: query2,
        patient_id: patientId,
        doctor_id: doctorId,
        speciality_id: specialityId,
        file: selectedFile,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/homepage_doctor_appointment `;

      setIsLoading2(true);

      // Make the API call
      axios
        .post(apiEndpoint, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
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

  const phoneRegex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePhoneBlur = () => {
    if (!phone2 || !phone2.match(phoneRegex)) {
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
    if (!email2 || !email2.match(emailRegex)) {
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

  const handleQueryBlur = () => {
    if (!query2) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        query: "Please enter your query",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        query: "",
      }));
    }
  };

  const handleNameBlur = () => {
    if (!userName) {
      if (!name2) {
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
    error && <div className="error-message">{error}</div>;

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const fileDisplay = selectedFile ? (
    <div className="file__value" onClick={() => setSelectedFile(null)}>
      <div className="file__value--text">{selectedFile.name}</div>
      <div className="file__value--remove" data-id={selectedFile.name}></div>
    </div>
  ) : null;

  const desc =
    "Thanks for connecting! Your callback request has been received. We will get back to you shortly!";
  return (
    <>
      <a className="learn" onClick={togglePopup2} style={{ cursor: "pointer" }}>
        Call me Back <img src="/images/2023/01/arrow-w.png" alt="" />
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
              <h2>Contact Us</h2>
              <form onSubmit={handleFormSubmit2}>
                <div className="treatment-form">
                  <div className="inputbox">
                    {/* <label>Name</label> */}
                    <input
                      type="text"
                      placeholder={userName ? userName : "Name"}
                      name="name"
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                      autoComplete="off"
                      onBlur={handleNameBlur}
                      style={formErrors.name ? Formstyles2.errorInput : {}}
                    />
                    {renderError(formErrors.name)}
                  </div>
                </div>

                <div className="treatment-form">
                  <div className="inputbox">
                    {/* <label>Phone</label> */}
                    <input
                      ref={inputRef}
                      type="tel"
                      id="mobileode"
                      placeholder="Phone"
                      value={phone2}
                      onChange={handlePhoneNumberChange}
                      onBlur={handlePhoneBlur}
                      style={formErrors.phone ? Formstyles2.errorInput : {}}
                    />
                    {renderError(formErrors.phone)}
                  </div>
                </div>

                {userEmail ? null : (
                  <div className="treatment-form">
                    <div className="inputbox">
                      {/* <label>Email</label> */}
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email2}
                        onChange={(e) => setEmail2(e.target.value)}
                        onBlur={handleEmailBlur}
                        autoComplete="off"
                        style={formErrors.email ? Formstyles2.errorInput : {}}
                      />
                      {renderError(formErrors.email)}
                    </div>
                  </div>
                )}

                <div className="treatment-form">
                  <div className="inputbox">
                    {/* <label>Your Query</label> */}
                    <textarea
                      className="querybox"
                      type="textarea"
                      name="query"
                      placeholder="Your Query"
                      rows="2"
                      value={query2}
                      onChange={(e) => setQuery2(e.target.value)}
                      autoComplete="off"
                      onBlur={handleQueryBlur}
                      style={formErrors.query ? Formstyles2.errorInput : {}}
                    ></textarea>
                    {renderError(formErrors.query)}
                  </div>
                </div>

                <div
                  className="treatment-form"
                  style={{ paddingBottom: "5px" }}
                >
                  <div className="wrap">
                    <div className="file">
                      <div className="file__input" id="file__input">
                        <input
                          className="file__input--file"
                          id="customFile"
                          type="file"
                          multiple="multiple"
                          name="files[]"
                          onChange={handleFileChange}
                        />
                        <label
                          className="file__input--label"
                          for="customFile"
                          data-text-btn=" "
                        >
                          {" "}
                          <img src="/images/upload-icon1.png" /> Choose files or
                          drag &amp; drop{" "}
                        </label>
                      </div>
                      {fileValidationMessage && (
                        <p style={{ color: "red" }}>{fileValidationMessage}</p>
                      )}
                      {fileDisplay}
                    </div>
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

export default CallMeBackForm;