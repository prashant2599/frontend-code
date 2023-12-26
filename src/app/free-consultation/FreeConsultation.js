"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import Success from "../Home/successPopup/Success";
import ErrorPopup from "../Home/successPopup/ErrorPopup";

const FreeConsultation = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [name, setName] = useState("");
  const [pcode, setPcode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [fileValidationMessage, setFileValidationMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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
      event.target.value = null;
      return;
    } else {
      setFileValidationMessage("");
    }
    setSelectedFile(file);
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

  const handleFormSubmit = (event) => {
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
        file: selectedFile,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/free_consultants`;

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
        })
        .catch((error) => {
          // Handle any errors that occurred during the API call
          console.error("Error:", error);
          setShowErrorPopup(true);
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
      <section id="get-free-consultation">
        <div className="midbox-inner  wiki-mk">
          <div className="contact-box">
            <h1>Get a free Consultation</h1>
            <p>
              Engage with our experts. Ask a query and get valuable insights to
              guide your health decisions. Your questions will be answered with
              care and expertise.
            </p>

            <div className="questions-form">
              <div className="homeform-left">
                <div className="treatment-right">
                  <form onSubmit={handleFormSubmit}>
                    <div className="treatment-form">
                      <div className="inputbox">
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder=""
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
                          style={formErrors.query ? Formstyles.errorInput : {}}
                        ></textarea>
                        {renderError(formErrors.query)}
                      </div>
                    </div>

                    <div className="treatment-form">
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
                              <img src="/images/upload-icon1.png" /> Choose
                              files or drag &amp; drop{" "}
                            </label>
                          </div>
                          {fileValidationMessage && (
                            <p style={{ color: "red" }}>
                              {fileValidationMessage}
                            </p>
                          )}
                          {fileDisplay}
                        </div>
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

              <div className="homeform-right">
                <img src="images/2023/01/home-q.jpg" alt="" />

                <div className="home-drbox">
                  <h4>We value your Privacy</h4>
                  <ul>
                    <li>
                      <img
                        src="/images/2023/compliance helpline.png"
                        alt="icon1"
                      />
                      <h5>Confidentiality</h5>
                    </li>
                    <li>
                      <img src="/images/2023/confidentiality.png" alt="icon2" />
                      <h5>Transparent Policies</h5>
                    </li>
                    <li>
                      <img
                        src="/images/2023/transparent policie.png"
                        alt="icon3"
                      />
                      <h5>Compliance Helpline</h5>
                    </li>
                  </ul>
                </div>
              </div>
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

export default FreeConsultation;
