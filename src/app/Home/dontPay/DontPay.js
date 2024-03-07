"use client";
import React, { useState, useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import Link from "next/link";
import Success from "../successPopup/Success";
import ErrorPopup from "../successPopup/ErrorPopup";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import ReCaptchaComponent from "../ReCapcha/ReCaptchaComponent";

const DontPay = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

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
    setPhone(formattedPhoneNumber); // Update the phone number state

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
      event.target.value = null; // Clear the file input
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

    // if (!captchaValue) {
    //   setFormErrors((prevErrors) => ({
    //     ...prevErrors,
    //     captcha: "Please Fill the captcha",
    //   }));
    //   return;
    // }

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
          setIsPopupOpen(false);
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
    setEmail(inputValue);
  };

  const handleEmailBlur = () => {
    if (!email || !email.match(emailRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
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
    setName(inputValue);
  };
  const handleNameBlur = () => {
    if (!userName) {
      if (!name) {
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
    setQuery(inputValue);
  };

  const handleQueryBlur = () => {
    if (!query) {
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
    "Thank you! We have received your details. We wil get back to you at earliest.";

  return (
    <>
      <section id="pays-sections">
        <div className="midbox-inner  wiki-mk">
          <div className="pays-boxs">
            <div className="medflick-payleft-payleft">
              <h2>Medflick&apos;s Promise: No Added Charges</h2>
              <p>
                Rest assured, no additional cost will be incurred from our end
                because your health is priceless.
              </p>
            </div>

            <div className="medflick-payright">
              <a
                className="consultations"
                onClick={togglePopup}
                style={{ cursor: "pointer" }}
              >
                Request a free consultation{" "}
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/01/arrow-w.png`}
                  alt="arrow-icon"
                />
              </a>
              <Link href="/contact-us" className="contacts">
                Contact Us{" "}
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/01/arrow-c.png`}
                  alt="contact-us"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="popup" data-popup="popup-4" style={popupStyle}>
        <div className="popup-inner4">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="popup-close"
                data-popup-close="popup-4"
                data-dismiss="modal"
                onClick={togglePopup}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {/* <li>
                      <img src="images/2023/01/home-icon3.png" alt="" />
                      Lorem ipsum dolor sitconsec sit amet dolor sitco
                    </li> */}
            <div className="free-consultation-form">
              <div className="consultation-form-left">
                <img src="/images/2023/07/free-consultation.jpg" />
                <div className="consultation-privacy-box">
                  <h4>We value your Privacy</h4>
                  {/* <ul>
                    <li>
                      <img src="/images/2023/compliance helpline.png" alt="ivon" />
                      Confidentiality
                    </li>
                    <li>
                      <img src="/images/2023/confidentiality.png" alt="ivon" />
                      Transparent Policies
                    </li>
                    <li>
                      <img src="/images/2023/transparent policie.png" alt="ivon" />
                      Compliance Helpline
                    </li>
                 
                  </ul> */}
                </div>
              </div>

              <div className="consultation-form-right">
                <h2> Request Free Consultation</h2>
                <div className="treatment-right">
                  <form onSubmit={handleFormSubmit}>
                    <div className="treatment-form">
                      <div className="inputbox">
                        {/* <label>Name</label> */}
                        <input
                          type="text"
                          placeholder={userName ? userName : "Name"}
                          name="name"
                          value={name}
                          onChange={handlenameChange}
                          onBlur={handleNameBlur}
                          autoComplete="off"
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
                          id="mobileode"
                          placeholder="Phone"
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
                          {/* <label>Email</label> */}
                          <input
                            type="email"
                            placeholder="Email"
                            name="name"
                            value={email}
                            onChange={handleChangeEmail}
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
                        {/* <label>Your Query</label> */}
                        <textarea
                          className="querybox"
                          type="textarea"
                          name="query"
                          placeholder="Your Query"
                          rows="2"
                          value={query}
                          onChange={handlequeryChange}
                          onBlur={handleQueryBlur}
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
                    <ReCaptchaComponent onCaptchaChange={handleCaptchaChange} />
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
          </div>{" "}
        </div>{" "}
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

export default DontPay;
