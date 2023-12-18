"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import { useState, useEffect, useRef } from "react";
import "intl-tel-input/build/css/intlTelInput.css"; // Import CSS
import intlTelInput from "intl-tel-input";
import axios from "axios";
import Success from "../successPopup/Success";
import ErrorPopup from "../successPopup/ErrorPopup";

const BlogDForm = () => {
  // Assistance form post
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [name1, setName1] = useState("");
  const [pcode1, setPcode1] = useState("+91");
  const [phone1, setPhone1] = useState("");
  const [email1, setEmail1] = useState("");
  const [query1, setQuery1] = useState("");

  const [isLoading1, setIsLoading1] = useState(false);

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    query: "",
    captcha: "",
  });

  const [captchaValue1, setCaptchaValue1] = useState(null);

  const handleCaptchaChange1 = (value) => {
    setCaptchaValue1(value);
  };

  const clearFormFields1 = () => {
    setName1("");
    setPhone1("");
    setEmail1("");
    setQuery1("");
  };

  const inputRef = useRef(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedHandlePhoneNumberChange = useRef(
    debounce((e) => handlePhoneNumberChange(e), 300)
  ).current;

  useEffect(() => {
    const inputElement = inputRef.current;

    const iti = intlTelInput(inputElement, {
      initialCountry: "in",
      separateDialCode: true,
    });

    inputElement.addEventListener("input", debouncedHandlePhoneNumberChange);

    inputElement.addEventListener("countrychange", () => {
      const selectedCountryData = iti.getSelectedCountryData();
      setPcode1(selectedCountryData.dialCode);
    });

    return () => {
      inputElement.removeEventListener(
        "input",
        debouncedHandlePhoneNumberChange
      );
      iti.destroy();
    };
  }, [debouncedHandlePhoneNumberChange]);

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = e.target.value.replace(/\D/g, "");
    setPhone1(formattedPhoneNumber);
  };

  const handleFormSubmit1 = (event) => {
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

    if (!name1) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please enter your name",
      }));
      isValid = false;
    }

    if (!phone1 || !phone1.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
      isValid = false;
    }

    if (!email1 || !email1.match(emailRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
      isValid = false;
    }

    if (!query1) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        query: "Please enter your query",
      }));
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (!captchaValue1) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        captcha: "Please Fill the captcha",
      }));
      return;
    }

    if (isValid) {
      // Create the data object to be sent in the API request
      const data = {
        name: name1,
        phone_code: pcode1,
        phone: phone1,
        email: email1,
        messages: query1,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `https://dev.medflick.com/api/free_consultants`;

      setIsLoading1(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
        .then((response) => {
          setShowSuccessPopup(true);
          clearFormFields1();
        })
        .catch((error) => {
          // Handle any errors that occurred during the API call
          console.error("Error:", error);
          setShowErrorPopup(true);
        })
        .finally(() => {
          // Set loading back to false after the API call is complete
          setIsLoading1(false);
        });
    }
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

  const phoneRegex = /^\d{10,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handlePhoneBlur = () => {
    if (!phone1 || !phone1.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
    }
  };

  const handleEmailBlur = () => {
    if (!email1 || !email1.match(emailRegex)) {
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
      <div className="blog-rightbox">
        <div className="treatment-right">
          <h2>Need Assistance?</h2>

          <form onSubmit={handleFormSubmit1}>
            <div className="treatment-form">
              <div className="inputbox">
                <label>Name</label>
                <input
                  type="text"
                  placeholder=""
                  name="name"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
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
                  id="mobile_code"
                  placeholder=""
                  value={phone1}
                  onChange={handlePhoneNumberChange}
                  onBlur={handlePhoneBlur}
                  style={formErrors.phone ? Formstyles.errorInput : {}}
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
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                  autoComplete="off"
                  onBlur={handleEmailBlur}
                  style={formErrors.email ? Formstyles.errorInput : {}}
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
                  value={query1}
                  onChange={(e) => setQuery1(e.target.value)}
                  autoComplete="off"
                  style={formErrors.query ? Formstyles.errorInput : {}}
                ></textarea>
                {renderError(formErrors.query)}
              </div>
            </div>
            <ReCAPTCHA
              sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
              onChange={handleCaptchaChange1}
            />
            {renderError(formErrors.captcha)}

            <button
              type="submit"
              name="en"
              className="home-button"
              disabled={isLoading1}
            >
              {" "}
              {isLoading1 ? (
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

export default BlogDForm;
