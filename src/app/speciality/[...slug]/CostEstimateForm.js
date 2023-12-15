"use client";

import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";

const CostEstimateForm = ({ specialityId }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [pcode, setPcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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

  // form query post api

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
    setPcode("");
    setEmail("");
    setQuery("");
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
    const phoneRegex = /^\d{10,}$/;
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
    if (!phone || !phone.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
      isValid = false;
    }

    if (!email || !email.match(emailRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
      isValid = false;
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
        name: userName ? userName : name,
        phone_code: pcode,
        phone: phone,
        email: userEmail ? userEmail : email,
        messages: query,
        patient_id: patientId,
        speciality_id: specialityId,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `https://dev.medflick.com/api/free_quote_treatment`;

      setIsLoading(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
        .then((response) => {
          toast.success("questions is susscefull submitted", {
            position: toast.POSITION.TOP_RIGHT,
          });
          clearFormFields();
          setIsPopupOpen(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error(
            "There was an error submitting your questions. Please try again.",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const phoneRegex = /^\d{10,}$/;
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
  return (
    <>
      <a onClick={togglePopup} style={{ cursor: "pointer" }}>
        Get Cost Estimate <img src="/images/2023/01/arrow-c.png" alt="icon" />
      </a>

      {isPopupOpen && (
        <div className="popup" data-popup="popup-5" style={popupStyle}>
          <div className="popup-inner5">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="popup-close"
                  data-popup-close="popup-5"
                  data-dismiss="modal"
                  onClick={togglePopup}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="cost-estimate-form">
                <div className="cost-estimate-form-left">
                  <div className="owl-slider">
                    <div id="cost-estimate" className="owl-carousel">
                      <div className="item">
                        <img src="/images/2023/07/man.jpg" />
                        <div className="cost-estimate-box">
                          <div className="cost-estimate-items">
                            <p>Navigate towards wellness</p>
                            {/* <h3>Ellen Richardson</h3> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cost-estimate-form-right">
                  <h2> Get Cost Estimate</h2>
                  <div className="treatment-right">
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
                            style={
                              formErrors.phone ? Formstyles.errorInput : {}
                            }
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
                              style={
                                formErrors.email ? Formstyles.errorInput : {}
                              }
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
                            style={
                              formErrors.query ? Formstyles.errorInput : {}
                            }
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
                        <img
                          src="/images/2023/01/arrow-c.png"
                          alt="arrow-Icon"
                        />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default CostEstimateForm;
