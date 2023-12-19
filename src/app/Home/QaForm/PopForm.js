"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import Success from "../successPopup/Success";
import ErrorPopup from "../successPopup/ErrorPopup";

const PopForm = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  // form popup post method

  const [name, setName] = useState("");
  const [pcode, setPcode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

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
  // form popup scripts
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };
  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (isPopupOpen) {
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
        setPcode(selectedCountryData.dialCode);
      });

      return () => {
        iti.destroy();
      };
    }
  }, [isPopupOpen]);

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = e.target.value.replace(/\D/g, "");
    setPhone(formattedPhoneNumber);
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

  const [isLoading, setIsLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    query: "",
    captcha: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const clearFormFields = () => {
    setName("");
    setPhone("");
    setEmail("");
    setQuery("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setFormErrors({
      name: "",
      phone: "",
      email: "",
      query: "",
      captcha: "",
    });

    const patientId = localStorage.getItem("userId");

    // Validation logic
    let isValid = true;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userName) {
      if (!name) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "Please enter your name",
        }));
        isValid = false;
      }
    }
    if (!userPhone) {
      if (!phone || !phone.match(phoneRegex)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Please enter a valid Phone number",
        }));
        isValid = false;
      }
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

    if (!query) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        query: "Please enter your query",
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
        pname: userName ? userName : name,
        phone_code: pcode,
        phone: userPhone ? userPhone : phone,
        email: userEmail ? userEmail : email,
        askq: query,
        patient_id: patientId,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/askPost`;

      setIsLoading(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
        .then((response) => {
          setShowSuccessPopup(true);
          clearFormFields();
          setIsPopupOpen(false);
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

  const phoneRegex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePhoneBlur = () => {
    if (!phone || !phone.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
    }
  };

  const handleEmailBlur = () => {
    if (!email || !email.match(emailRegex)) {
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
      <span
        className="ask-question"
        data-popup-open="popup-2"
        onClick={togglePopup}
        style={{ cursor: "pointer" }}
      >
        <img src="images/2023/07/ask.png" alt="" /> Ask Question
      </span>

      {isPopupOpen &&
        (userEmail ? (
          <div className="popup" data-popup="popup-2" style={popupStyle}>
            <div className="popup-inner1">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="popup-close"
                    data-popup-close="popup-2"
                    data-dismiss="modal"
                    onClick={togglePopup}
                  >
                    <span aria-hidden="true" style={{ color: "#fff" }}>
                      ×
                    </span>
                  </button>
                </div>
                <h2>Ask Question </h2>

                <div className="questions-form-box">
                  <div className="form-group">
                    <textarea
                      type="textarea"
                      name="query"
                      placeholder="Ask question. Use @ to mention members"
                      rows="2"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      autoComplete="off"
                    ></textarea>
                    {renderError(formErrors.query)}
                  </div>
                  <ReCAPTCHA
                    sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
                    onChange={handleCaptchaChange}
                  />
                  {renderError(formErrors.captcha)}
                </div>

                <div className="question-box7">
                  {/* <div className="upload-report-box">
                    <div className="medical-report-wrapper">
                      <button className="medical-report">
                        <img src="/images/2023/07/upload-icon.png" /> Medical
                        report
                      </button>
                      <input type="file" name="file" />
                    </div>
                  </div> */}

                  <div className="question-post-box">
                    <button
                      type="submit"
                      name="en"
                      className="cancel-button"
                      onClick={togglePopup}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      name="en"
                      className="post-button"
                      onClick={handleFormSubmit}
                    >
                      Post{" "}
                    </button>
                  </div>
                </div>
              </div>{" "}
            </div>{" "}
          </div>
        ) : (
          <div className="popup" data-popup="popup-1" style={popupStyle}>
            <div className="popup-inner2">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="popup-close"
                    data-popup-close="popup-1"
                    data-dismiss="modal"
                    onClick={togglePopup}
                  >
                    <span aria-hidden="true" style={{ color: "#fff" }}>
                      ×
                    </span>
                  </button>
                </div>
                <h2>Ask Free Question</h2>

                <form onSubmit={handleFormSubmit}>
                  <div className="treatment-form">
                    <div className="inputbox">
                      <label>Name</label>
                      <input
                        type="text"
                        placeholder={userName}
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                        style={formErrors.name ? Formstyles.errorInput : {}}
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
                        value={phone}
                        onChange={handlePhoneNumberChange}
                        onBlur={handlePhoneBlur}
                        style={formErrors.phone ? Formstyles.errorInput : {}}
                      />
                      {renderError(formErrors.phone)}
                    </div>
                  </div>

                  {userEmail ? null : (
                    <div className="treatment-form">
                      <div className="inputbox">
                        <label>Email</label>
                        <input
                          type="email"
                          placeholder=""
                          name="name"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={handleEmailBlur}
                          autoComplete="off"
                          style={formErrors.email ? Formstyles.errorInput : {}}
                        />
                        {renderError(formErrors.email)}
                      </div>
                    </div>
                  )}
                  <div className="treatment-form">
                    <div className="inputbox">
                      <label>Your Query</label>
                      <textarea
                        className="querybox"
                        type="textarea"
                        name="query"
                        placeholder=""
                        rows="2"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                        style={formErrors.query ? Formstyles.errorInput : {}}
                      ></textarea>
                      {renderError(formErrors.query)}
                    </div>
                  </div>
                  <ReCAPTCHA
                    sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
                    onChange={handleCaptchaChange}
                  />
                  {renderError(formErrors.captcha)}
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
                      "Submit Now"
                    )}
                    <img src="/images/2023/01/arrow-c.png" alt="arrow-Icon" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

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

export default PopForm;
