"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import Success from "../Home/successPopup/Success";
import ErrorPopup from "../Home/successPopup/ErrorPopup";

const VisaaForm = () => {
  const [attendantCount, setAttendantCount] = useState(1);

  // const handleAddAttendant = () => {
  //   if (attendantCount < 3) {
  //     setAttendantCount(attendantCount + 1);
  //   }
  // };

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [name, setName] = useState("");
  const [pcode, setPcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValidationMessage, setFileValidationMessage] = useState("");

  const [passportNumber, setPassportNumber] = useState("");
  const [passportImage, setPassportImage] = useState(null);
  const [attendants, setAttendants] = useState([{ number: "", image: null }]);

  const handleAttendantChange = (index, key, value) => {
    const updatedAttendants = [...attendants];
    updatedAttendants[index][key] = value;
    setAttendants(updatedAttendants);
  };

  const handleAttendantImageChange = (index, image) => {
    const updatedAttendants = [...attendants];
    updatedAttendants[index].image = image;
    setAttendants(updatedAttendants);
  };

  const handleAddAttendant = () => {
    if (attendants.length < 3) {
      setAttendants([...attendants, { number: "", image: null }]);
    }
  };

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
    const phoneRegex = /^\d{10,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please enter your name",
      }));
      isValid = false;
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
        name: name,
        phone_code: pcode,
        phone: phone,
        email: email,
        messages: query,
        file: selectedFile,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/get_a_visa`;

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
          console.error("Error:", error);
          setShowErrorPopup(true);
        })
        .finally(() => {
          // Set loading back to false after the API call is complete
          setIsLoading(false);
        });
    }
  };

  console.log(attendants);

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
      <section id="medflick-visa">
        <div
          className="midbox-inner wiki-mk"
          style={{ paddingLeft: "60px", paddingRight: "60px" }}
        >
          <div className="medflick-visa">
            <div className="medflick-visa-left">
              <img
                src="/images/visaLogo.png"
                className="medflick-logo"
                alt="Brand Logo"
              />
              <h2>We Make Medical Visas Easy For You</h2>
              <p>
                Applicants upload necessary documents and make payment through
                an online platform.
              </p>
              <ul>
                <li>
                  <span>Step 1</span>
                  <h3>Online Submission and Payment</h3>
                  <p>
                    Applicants upload necessary documents and make payment
                    through an online platform.
                  </p>
                </li>
                <li>
                  <span>Step 2</span>
                  <h3>Document Verification and Processing</h3>
                  <p>
                    Authorities verify the submitted documents and proceed with
                    processing the Visa application.
                  </p>
                </li>
                <li>
                  <span>Step 3</span>
                  <h3>Visa Issuance</h3>
                  <p>
                    Upon successful processing, the applicant receives the Visa,
                    either electronically or physically.
                  </p>
                </li>
              </ul>
            </div>
            <div className="medflick-visa-right">
              <h2>Apply for Visa</h2>

              <div className="visa-form">
                <div className="visa-form-box">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                    style={formErrors.name ? Formstyles.errorInput : {}}
                  />
                  {renderError(formErrors.name)}
                </div>
              </div>

              <div className="visa-form">
                <div className="visa-form-box">
                  <label>Phone Number *</label>
                  <div className="visa-phoneCode">
                    <input
                      ref={inputRef}
                      type="tel"
                      id="mobile_code"
                      placeholder="Phone"
                      value={phone}
                      onChange={handlePhoneNumberChange}
                      onBlur={handlePhoneBlur}
                      style={formErrors.phone ? Formstyles.errorInput : {}}
                    />
                    {renderError(formErrors.phone)}
                  </div>
                </div>
              </div>

              <div className="visa-form">
                <div className="visa-form-box">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="Email"
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

              <div className="visa-form">
                <div className="visa-form-box">
                  <label>Patient Passport Number</label>
                  <div className="visa-form1">
                    <input
                      type="text"
                      placeholder="XXXXXXXXXXXX"
                      name="name"
                      required=""
                    />
                    <div className="medical-report-all">
                      <button className="medical-report-file">
                        {" "}
                        Upload Passport
                      </button>
                      <input type="file" name="file" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="visa-form">
                <div className="visa-form-box">
                  <label>Attendant Passport Number</label>
                  {attendants.map((attendant, index) => (
                    <div className="visa-form2" key={index}>
                      <input
                        type="text"
                        // placeholder={`Attendant ${index + 1} Passport Number`}
                        placeholder="XXXXXXXXXXXX"
                        value={attendant.number}
                        onChange={(e) =>
                          handleAttendantChange(index, "number", e.target.value)
                        }
                        required=""
                      />
                      <div className="medical-report-all">
                        <button className="medical-report-file">
                          Upload Passport
                        </button>
                        <input
                          type="file"
                          name={`attendantImage${index}`}
                          onChange={(e) =>
                            handleAttendantImageChange(index, e.target.files[0])
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {attendants.length < 3 && (
                <div className="visa-form-box">
                  <a onClick={handleAddAttendant} style={{ color: "#ff6800" }}>
                    Add Attendant +
                  </a>
                </div>
              )}

              <div className="visa-form-box">
                <button type="submit" name="en" className="visa-submit">
                  {" "}
                  Submit Now{" "}
                </button>
              </div>

              <em>*$50 USD Application fees is applicable</em>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisaaForm;
