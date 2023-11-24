"use client";

import { useState, useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import "intl-tel-input/build/css/intlTelInput.css"; // Import CSS
import intlTelInput from "intl-tel-input";
import axios from "axios";

const HospitalForm = ({ info }) => {
  // form submitting and validation of form

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
  const [pcode, setPcode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // State variables for error messages
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  // Email validations

  const [emailValid, setEmailValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false); // Track if the email field has been touched
  const [validationMessage, setValidationMessage] = useState("");

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (emailTouched) {
      validateEmail(inputEmail); // Validate email when touched
    }
  };

  const validateEmail = (inputEmail) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailPattern.test(inputEmail);

    setEmailValid(isValid);
    setValidationMessage(isValid ? "" : "Please enter a valid email address.");
  };

  const handleEmailBlur = () => {
    setEmailTouched(true); // Mark email field as touched when it loses focus
    validateEmail(email); // Validate email on blur
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Reset error messages
    setNameError("");
    setPhoneError("");

    const patientId = localStorage.getItem("userId");

    // Validation logic
    let isValid = true;

    if (!userName) {
      if (!name) {
        setNameError("Name is required");
        isValid = false;
      }
    }
    
    if (!userEmail) {
      if (!emailValid) {
        setValidationMessage("Please enter a valid email address.");
        return;
      }
    }

    if (!captchaValue) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    const phoneRegex = /^\d{10,}$/; // Matches 10 or more digits
    if (!phone || !phone.match(phoneRegex)) {
      setPhoneError("Phone must have at least 10 digits");
      isValid = false;
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
        speciality_id: info,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `https://dev.medflick.com/api/hospital_query`;

      setIsLoading(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
        .then((response) => {
          // Handle the API response here if needed
          console.log(response);
          alert("questions is susscefull submitted");

          clearFormFields();
        })
        .catch((error) => {
          // Handle any errors that occurred during the API call
          console.error("Error:", error);
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

  return (
    <>
      <div className="hospital-midbox-right">
        <div className="treatment-right">
          <h2>Need Assistance?</h2>
          <form onSubmit={handleFormSubmit}>
            <div
              className="treatment-form"
              style={nameError ? Formstyles.errorInput : {}}
            >
              <div className="inputbox">
                <label>Name</label>
                <input
                  type="text"
                  placeholder={userName}
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  style={nameError ? Formstyles.errorInput : {}}
                />
                {nameError && (
                  <span style={Formstyles.errorMessage}>{nameError}</span>
                )}
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
                />
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
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    autoComplete="off"
                  />
                </div>
              </div>
            )}
            {!emailValid && (
              <div className="error-message" style={{ color: "red" }}>
                {validationMessage}
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
                ></textarea>
              </div>
            </div>
            <ReCAPTCHA
              sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
              onChange={handleCaptchaChange}
            />
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
    </>
  );
};

export default HospitalForm;
