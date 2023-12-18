"use client";

import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import "intl-tel-input/build/css/intlTelInput.css"; // Import CSS
import intlTelInput from "intl-tel-input";
import axios from "axios";
import Success from "../successPopup/Success";
import ErrorPopup from "../successPopup/ErrorPopup";
const TreatmentForm1 = ({ treatmentId, specialityId }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
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
  const [name, setName] = useState("");
  const [pcode, setPcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
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
        treatment_id: treatmentId,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `https://dev.medflick.com/api/free_quote_treatment`;

      setIsLoading(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
        .then((response) => {
          setShowSuccessPopup(true);
          clearFormFields();
        })
        .catch((error) => {
          setShowErrorPopup(true);
          console.error("Error:", error);
        })
        .finally(() => {
          // Set loading back to false after the API call is complete
          setIsLoading(false);
        });
    }
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

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };
  return (
    <>
      <div className="treatment-right">
        <h2>Get a free quote</h2>
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
                id="mobile_code"
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

export default TreatmentForm1;
