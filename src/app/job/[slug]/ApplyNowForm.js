"use client";
import React, { useEffect, useRef, useState } from "react";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import axios from "axios";
import Success from "@/app/Home/successPopup/Success";
import ErrorPopup from "@/app/Home/successPopup/ErrorPopup";
import { ThreeDots } from "react-loader-spinner";

const ApplyNowForm = () => {
  const inputRef = useRef(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [phone, setPhone] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [pcode, setPcode] = useState("+91");

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const clearFormFields = () => {
    setFName("");
    setPhone("");
    setEmail("");
    setLName("");
    setSelectedFile(null);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValidationMessage, setFileValidationMessage] = useState("");

  const isValidFile = (file) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxFileSize = 4 * 1024 * 1024; // 4MB

    if (!file) {
      return "Please select a file.";
    }

    if (!allowedTypes.includes(file.type)) {
      return "Please select a valid file type (PDF, DOC, DOCX).";
    }

    if (file.size > maxFileSize) {
      return "File size must be less than or equal to 4MB.";
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
    setPhone(formattedPhoneNumber); // Update the phone number state

    // Perform phone number validation on write
    // if (formattedPhoneNumber.length !== 10) {
    //   setFormErrors((prevErrors) => ({
    //     ...prevErrors,
    //     phone: "Please enter a valid Phone number.",
    //   }));
    // } else {
    //   setFormErrors((prevErrors) => ({
    //     ...prevErrors,
    //     phone: "",
    //   }));
    // }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormErrors({
      name: "",
      phone: "",
      email: "",
    });

    const patientId = localStorage.getItem("userId");

    // Validation logic
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!fname) {
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
    const name = fname + lname;
    if (isValid) {
      // Create the data object to be sent in the API request
      const data = {
        name: name,
        phone_code: pcode,
        phone: phone,
        email: email,
        file: selectedFile,
      };

      const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/careerpost`;

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

  const phoneRegex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePhoneBlur = () => {
    if (!phone || !phone.match(phoneRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid Phone number",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "",
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
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const handlenameChange = (e) => {
    const inputValue = e.target.value;

    // Update the name state
    setFName(inputValue);
  };

  const handlelnameChange = (e) => {
    const inputValue = e.target.value;

    // Update the name state
    setLName(inputValue);
  };

  const handleNameBlur = () => {
    if (!fname) {
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
  };

  const renderError = (error) =>
    error && <div className="error-message">{error}</div>;

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
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

  const fileDisplay = selectedFile ? (
    <div className="file__value" onClick={() => setSelectedFile(null)}>
      <div className="file__value--text">{selectedFile.name}</div>
      <div className="file__value--remove" data-id={selectedFile.name}></div>
    </div>
  ) : null;

  const desc =
    "Your appointment request has been received. We will get back to you soon. Thanks for your patience!";

  return (
    <>
      <section className="apply-job">
        <div className="midbox-inner  wiki-mk">
          <div className="job-apply-form">
            <h2>Apply for this Job</h2>

            <form onSubmit={handleFormSubmit}>
              <div className="home-form">
                <div className="inputbox1">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder=""
                    name="name"
                    onChange={handlenameChange}
                    autoComplete="off"
                    value={fname}
                    onBlur={handleNameBlur}
                    style={formErrors.name ? Formstyles.errorInput : {}}
                  />
                  {renderError(formErrors.name)}
                </div>
                <div className="inputbox1">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder=""
                    name="name"
                    required=""
                    value={lname}
                    onChange={handlelnameChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="home-form">
                <div className="inputbox1">
                  <label>Phone Number</label>
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
                <div className="inputbox1">
                  <label>Email Address</label>
                  <input
                    type="text"
                    placeholder=""
                    name="name"
                    value={email}
                    onChange={handleChangeEmail}
                    onBlur={handleEmailBlur}
                    autoComplete="off"
                    style={formErrors.email ? Formstyles.errorInput : {}}
                  />
                  {renderError(formErrors.email)}
                </div>
              </div>

              <div className="home-form">
                <div className="medical-report-all">
                  <button className="medical-report-file">
                    <img src="/images/2023/07/upload-icon1.png" /> Upload Resume
                  </button>
                  <input type="file" name="file" onChange={handleFileChange} />
                </div>
                {fileValidationMessage && (
                  <p style={{ color: "red" }}>{fileValidationMessage}</p>
                )}
                {fileDisplay}
                {/* <div className="medical-report-all">
                  <button className="medical-report-file">
                    <img src="/images/2023/07/upload-icon1.png" /> Upload Cover
                    Letter
                  </button>
                  <input type="file" name="file" />
                </div> */}
              </div>

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
                  "Submit"
                )}
                <img src="/images/2023/01/arrow-c.png" alt="arrow-Icon" />
              </button>
            </form>
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

export default ApplyNowForm;
