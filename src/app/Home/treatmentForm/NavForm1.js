"use client";
import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import Success from "../successPopup/Success";
import ErrorPopup from "../successPopup/ErrorPopup";

const NavForm1 = ({ treatmentId, specialityId }) => {
  // form 2 post request
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
  const [name1, setName1] = useState("");
  const [pcode1, setPcode1] = useState("+91");
  const [phone1, setPhone1] = useState("");
  const [email1, setEmail1] = useState("");
  const [fileValidationMessage, setFileValidationMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading1, setIsLoading1] = useState(false);

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
    setPcode1("");
    setSelectedFile(null);
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
    const patientId = localStorage.getItem("userId");

    // Validation logic
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!userName) {
      if (!name1) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: "Please enter your name",
        }));
        isValid = false;
      }
    }
    if (!phone1 || !phone1.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
      isValid = false;
    }

    if (!userEmail) {
      if (!email1 || !email1.match(emailRegex)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address",
        }));
        isValid = false;
      }
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
        name: userName ? userName : name1,
        phone_code: pcode1,
        phone: phone1,
        email: userEmail ? userEmail : email1,
        // messages: query,
        patient_id: patientId,
        speciality_id: specialityId,
        treatment_id: treatmentId,
        file: selectedFile,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/free_quote_treatment`;

      setIsLoading1(true);

      // Make the API call
      axios
        .post(apiEndpoint, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setShowSuccessPopup(true);
          clearFormFields1();
        })
        .catch((error) => {
          setShowErrorPopup(true);
          console.error("Error:", error);
        })
        .finally(() => {
          // Set loading back to false after the API call is complete
          setIsLoading1(false);
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
      setPcode1(selectedCountryData.dialCode);
    });

    // Clean up the plugin when the component unmounts
    return () => {
      iti.destroy();
    };
  }, []);

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setPhone1(formattedPhoneNumber); // Update the phone number state
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

  const phoneRegex = /^\d{10}$/;
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

  const fileDisplay = selectedFile ? (
    <div className="file__value" onClick={() => setSelectedFile(null)}>
      <div className="file__value--text">{selectedFile.name}</div>
      <div className="file__value--remove" data-id={selectedFile.name}></div>
    </div>
  ) : null;

  const desc =
    "Thank you! We received your details. Your information is in safe hands! ";
  return (
    <>
      <div className="treatment-mid-form">
        <img src="/images/2023/03/treatment-form.jpg" />

        <div className="assistance-form">
          <h3>Provide your details</h3>
          {/* <p>Our Health Experts will get back to you shortly</p> */}
          <form onSubmit={handleFormSubmit1}>
            <div className="assistance-box">
              <div className="input-box1">
                <label>Name</label>
                <input
                  type="text"
                  placeholder={userName}
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

            {userEmail ? null : (
              <div className="treatment-form" style={{ marginBottom: "20px" }}>
                <div className="inputbox">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder=""
                    name="name"
                    value={email1}
                    onChange={(e) => setEmail1(e.target.value)}
                    onBlur={handleEmailBlur}
                    autoComplete="off"
                    style={formErrors.email ? Formstyles.errorInput : {}}
                  />
                  {renderError(formErrors.email)}
                </div>
              </div>
            )}

            <div
              className="treatment-form"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
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
              onChange={handleCaptchaChange1}
            />
            {renderError(formErrors.captcha)}
            <div className="assistance-box">
              <button
                type="submit"
                name="en"
                className="submit-now"
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
                )}{" "}
                <img src="/images/2023/01/arrow-c.png" alt="icon" />
              </button>
            </div>
          </form>
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

export default NavForm1;
