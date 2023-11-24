"use client";
import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import Image from "next/image";
import "intl-tel-input/build/css/intlTelInput.css"; // Import CSS
import intlTelInput from "intl-tel-input";

const Allpopudp = () => {
  // home screen form data post api

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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

    setNameError("");
    setPhoneError("");
    const patientId = localStorage.getItem("userId");

    // Validation logic
    let isValid = true;

    if (!firstName) {
      setNameError("Name is required");
      isValid = false;
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
    if (!number || !number.match(phoneRegex)) {
      setPhoneError("Phone must have at least 10 digits");
      isValid = false;
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
          // Handle the API response here if needed
          console.log(response);
          alert("Questions have been successfully submitted");
          clearFormFields();
          setIsPopupOpen(false);
        })
        .catch((error) => {
          // Handle any errors that occurred during the API call
          console.error("Error:", error);
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
    const formattedPhoneNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setNumber(formattedPhoneNumber); // Update the phone number state
  };

  return (
    <>
      <button className="open-button" onClick={togglePopup}>
        <img
          className="footer-but-d"
          src="/images/2023/07/query-img.png"
          alt="query-img"
        />
        <Image
          className="footer-but-m"
          src="/images/2023/free.png"
          width="200"
          height="46"
        />
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
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={nameError ? Formstyles.errorInput : {}}
                    autoComplete="off"
                  />
                </div>
                <div className="inputbox1">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="name"
                    required
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
                  />
                </div>
                {userEmail ? null : (
                  <div className="inputbox1">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder=""
                      name="name"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={handleEmailBlur}
                      required
                      autoComplete="off"
                    />
                    {!emailValid && (
                      <div className="error-message" style={{ color: "red" }}>
                        {validationMessage}
                      </div>
                    )}
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
                    autoComplete="off"
                  ></textarea>
                </div>
              </div>

              <div className="home-form">
                <div className="inputbox1">
                  <div className="home-form">
                    <div className="medical-report-all">
                      <button
                        className="medical-report-file"
                        style={{ width: "230px" }}
                      >
                        <img src="/images/2023/07/upload-icon1.png" alt="img" />{" "}
                        Uplod medical report
                      </button>
                      <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="inputbox1">
                  <ReCAPTCHA
                    sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
                    onChange={handleCaptchaChange}
                  />
                </div>
              </div>

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
    </>
  );
};

export default Allpopudp;
