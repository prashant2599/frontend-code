"use client";
import { useState, useEffect, useRef } from "react";
import intlTelInput from "intl-tel-input";
import axios from "axios";
import Success from "../successPopup/Success";
import ErrorPopup from "../successPopup/ErrorPopup";
import ReCaptchaComponent from "../ReCapcha/ReCaptchaComponent";
import CustomUploadIcon from "../CustomTwitterIcon/CustomUploadIcon";
import CustomFormArrowIcon from "../CustomTwitterIcon/CustomFormArrowIcon";
import CustomSpinner from "../CustomTwitterIcon/CustomSpinner";

const BlogDForm = () => {
  // Assistance form post
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [name1, setName1] = useState("");
  const [pcode1, setPcode1] = useState("+91");
  const [phone1, setPhone1] = useState("");
  const [email1, setEmail1] = useState("");
  const [query1, setQuery1] = useState("");

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
    setSelectedFile(null);
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
    setPhone1(formattedPhoneNumber); // Update the phone number state

    // Perform phone number validation on write
    if (formattedPhoneNumber.length !== 10) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number.",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "",
      }));
    }
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

    const patientId = localStorage.getItem("userId");

    if (isValid) {
      // Create the data object to be sent in the API request
      const data = {
        name: userName ? userName : name1,
        phone_code: pcode1,
        phone: phone1,
        email: userEmail ? userEmail : email1,
        messages: query1,
        patient_id: patientId,
        file: selectedFile,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/free_consultants`;

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

  const handleChangeEmail = (e) => {
    const inputValue = e.target.value;

    // Perform email validation on write
    if (!inputValue || !emailRegex.test(inputValue)) {
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

    // Update the email state
    setEmail1(inputValue);
  };

  const handleEmailBlur = () => {
    if (!email1 || !email1.match(emailRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
    }
  };

  const handlequeryChange = (e) => {
    const inputValue = e.target.value;

    // Perform validation on write
    if (!inputValue.trim()) {
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

    // Update the name state
    setQuery1(inputValue);
  };

  const handleQueryBlur = () => {
    if (!query1) {
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

  const handlenameChange = (e) => {
    const inputValue = e.target.value;

    // Perform validation on write
    if (!inputValue.trim()) {
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

    // Update the name state
    setName1(inputValue);
  };

  const handleNameBlur = () => {
    if (!userName) {
      if (!name1) {
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
    "Help on the way! We appreciate your patience! We will get back to you soon.";
  return (
    <>
      <div className="blog-rightbox">
        <div className="treatment-right">
          <h2>Need Assistance?</h2>

          <form onSubmit={handleFormSubmit1}>
            <div className="treatment-form">
              <div className="inputbox">
                {/* <label>Name</label> */}
                <input
                  type="text"
                  placeholder={userName ? userName : "Name"}
                  name="name"
                  value={name1}
                  onChange={handlenameChange}
                  autoComplete="off"
                  onBlur={handleNameBlur}
                  style={formErrors.name ? Formstyles.errorInput : {}}
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
                  id="mobile_code"
                  placeholder="Phone"
                  value={phone1}
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
                  {/* <label>Email</label> */}
                  <input
                    type="email"
                    placeholder="Email"
                    name="name"
                    value={email1}
                    onChange={handleChangeEmail}
                    onBlur={handleEmailBlur}
                    style={formErrors.email ? Formstyles.errorInput : {}}
                    autoComplete="off"
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
                  value={query1}
                  onBlur={handleQueryBlur}
                  onChange={handlequeryChange}
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
                      htmlFor="customFile"
                      data-text-btn=" "
                    >
                      {" "}
                      <CustomUploadIcon /> Choose files or drag &amp; drop{" "}
                    </label>
                  </div>
                  {fileValidationMessage && (
                    <p style={{ color: "red" }}>{fileValidationMessage}</p>
                  )}
                  {fileDisplay}
                </div>
              </div>
            </div>
            <ReCaptchaComponent onCaptchaChange={handleCaptchaChange1} />
            {renderError(formErrors.captcha)}

            <button
              type="submit"
              name="en"
              className="home-button"
              disabled={isLoading1}
            >
              {" "}
              {isLoading1 ? <CustomSpinner /> : "Submit Now"}
              <CustomFormArrowIcon />
            </button>
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

export default BlogDForm;
