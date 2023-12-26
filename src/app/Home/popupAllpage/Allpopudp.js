"use client";
import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import Image from "next/image";
import "intl-tel-input/build/css/intlTelInput.css"; // Import CSS
import intlTelInput from "intl-tel-input";
import Success from "../successPopup/Success";
import ErrorPopup from "../successPopup/ErrorPopup";

const Allpopudp = () => {
  // home screen form data post api
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pcode, setPcode] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValidationMessage, setFileValidationMessage] = useState("");

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

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  // Email validations

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    query: "",
    captcha: "",
  });

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
      if (!firstName) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "Please enter your name",
        }));
        isValid = false;
      }
    }
    if (!userPhone) {
      if (!number || !number.match(phoneRegex)) {
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
    const fullName = `${firstName} ${lastName}`;
    if (isValid) {
      // Create the data object to be sent in the API request
      const data = {
        name: userName ? userName : fullName,
        file: selectedFile,
        phone_code: pcode,
        phone: number,
        email: userEmail ? userEmail : email,
        messages: query,
        patient_id: patientId,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `https://dev.medflick.com/api/personalized_offer`;
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
          setIsPopupOpen(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setShowErrorPopup(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const clearFormFields = () => {
    setFirstName("");
    setLastName("");
    setNumber("");
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

  // for popup form
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
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
    const formattedPhoneNumber = e.target.value.replace(/\D/g, "");
    setNumber(formattedPhoneNumber);
  };

  const phoneRegex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePhoneBlur = () => {
    if (!number || !number.match(phoneRegex)) {
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

  const fileDisplay = selectedFile ? (
    <div className="file__value" onClick={() => setSelectedFile(null)}>
      <div className="file__value--text">{selectedFile.name}</div>
      <div className="file__value--remove" data-id={selectedFile.name}></div>
    </div>
  ) : null;

  const desc =
    "Thanks for choosing us! We will get back with the best-personalized offers for you.";

  return (
    <>
      <button className="open-button" onClick={togglePopup}>
        <img
          className="footer-but-d"
          src="/images/2023/07/query-img.png"
          alt="query-img"
        />
        <img className="footer-but-m" src="/images/2023/free.png" />
      </button>
      <div className="form-popup" id="myForm" style={popupStyle}>
        <div className="form-container">
          <div style={{ display: "block", textAlign: "center" }}>
            <button type="button" className="btn cancel" onClick={togglePopup}>
              <img src="/images/2023/07/query-img.png" alt="query-img" />
            </button>
          </div>
          <div className="homeform-left">
            <h2>Get free Personalised Offer</h2>
            <p>
              Share your medical reports and get an exclusive offer tailored to
              your needs, requirements and preferences
            </p>
            <form onSubmit={handleFormSubmit}>
              <div className="home-form">
                <div className="inputbox1">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder=""
                    name="name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={formErrors.name ? Formstyles.errorInput : {}}
                    autoComplete="off"
                  />
                  {renderError(formErrors.name)}
                </div>
                <div className="inputbox1">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="home-form">
                <div className="inputbox1">
                  <label>Phone</label>
                  <input
                    ref={inputRef}
                    type="tel"
                    id="mobile_code"
                    placeholder=""
                    value={number}
                    onChange={handlePhoneNumberChange}
                    onBlur={handlePhoneBlur}
                    style={formErrors.phone ? Formstyles.errorInput : {}}
                  />
                  {renderError(formErrors.phone)}
                </div>
                {userEmail ? null : (
                  <div className="inputbox1">
                    <label>Email Address</label>
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
                )}
              </div>

              <div className="home-form">
                <div className="homequery">
                  <label>Message</label>
                  <textarea
                    className="magbox"
                    type="textarea"
                    name="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows="2"
                    style={formErrors.query ? Formstyles.errorInput : {}}
                  ></textarea>
                  {renderError(formErrors.query)}
                </div>
              </div>

              <div className="home-form">
                <div className="medical-report-all">
                  <button className="medical-report-file">
                    <img src="/images/2023/07/upload-icon1.png" alt="img" />{" "}
                    Uplod medical report
                  </button>
                  <input type="file" name="file" onChange={handleFileChange} />
                  {fileDisplay}
                </div>
              </div>

              <ReCAPTCHA
                sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo"
                onChange={handleCaptchaChange}
              />
              {renderError(formErrors.captcha)}

              <button
                type="submit"
                name="en"
                className="home-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ThreeDots
                    height="27"
                    width="80"
                    radius="9"
                    color="#ffffff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{ marginLeft: "50rem" }}
                    wrapperClassName=""
                    visible={true}
                  />
                ) : (
                  "Submit Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
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

export default Allpopudp;
