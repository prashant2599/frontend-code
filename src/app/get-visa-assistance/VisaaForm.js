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
  const [pcode, setPcode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValidationMessage, setFileValidationMessage] = useState("");

  const [passportNumber, setPassportNumber] = useState("");
  const [passportImage, setPassportImage] = useState(null);
  // const [attendantsNumber, setAttendantsNumber] = useState([""]);
  // const [attendantsImage, setAttendantsImage] = useState([null, null, null]);

  // const handleAttendantNumberChange = (index, value) => {
  //   const updatedAttendantsNumber = [...attendantsNumber];
  //   updatedAttendantsNumber[index] = value;
  //   setAttendantsNumber(updatedAttendantsNumber);
  // };
  // const handleAttendantImageChange = (index, image) => {
  //   const updatedAttendantsImage = [...attendantsImage];
  //   updatedAttendantsImage[index] = image;
  //   setAttendantsImage(updatedAttendantsImage);
  // };

  // const handleAddAttendant = () => {
  //   if (attendantsNumber.length < 3) {
  //     setAttendantsNumber([...attendantsNumber, ""]);
  //   }
  // };

  const [numAttendants, setNumAttendants] = useState(1);

  const [attendantNumber1, setAttendantNumber1] = useState("");
  const [attendantNumber2, setAttendantNumber2] = useState("");
  const [attendantNumber3, setAttendantNumber3] = useState("");

  const [attendantImage1, setAttendantImage1] = useState(null);
  const [attendantImage2, setAttendantImage2] = useState(null);
  const [attendantImage3, setAttendantImage3] = useState(null);

  const handleAttendantNumberChange = (index, value) => {
    switch (index) {
      case 1:
        setAttendantNumber1(value);
        break;
      case 2:
        setAttendantNumber2(value);
        break;
      case 3:
        setAttendantNumber3(value);
        break;
      default:
        break;
    }
  };

  // const handleAttendantImageChange = (index, image) => {
  //   switch (index) {
  //     case 1:
  //       setAttendantImage1(image);
  //       break;
  //     case 2:
  //       setAttendantImage2(image);
  //       break;
  //     case 3:
  //       setAttendantImage3(image);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleAttendantImageChange = (index, event) => {
    const imageFile = event.target.files[0];

    switch (index) {
      case 1:
        setAttendantImage1(imageFile);
        break;
      case 2:
        setAttendantImage2(imageFile);
        break;
      case 3:
        setAttendantImage3(imageFile);
        break;
      default:
        break;
    }
  };

  const handleAddAttendant = () => {
    if (numAttendants < 3) {
      setNumAttendants(numAttendants + 1);
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
    setAttendantImage1(null);
    setAttendantImage2(null);
    setAttendantImage3(null);
    setAttendantNumber1("");
    setAttendantNumber2("");
    setAttendantNumber3("");
    setPassportNumber("");
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

    // if (!query) {
    //   setFormErrors((prevErrors) => ({
    //     ...prevErrors,
    //     query: "Please enter your query",
    //   }));
    //   isValid = false;
    // }

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
        name: name,
        phone_code: pcode,
        phone: phone,
        email: email,
        passport_number: passportNumber,
        passport_file: selectedFile,
        passport_alt_file: attendantImage1,
        passport_alt_file1: attendantImage2,
        passport_alt_file2: attendantImage3,
        passport_alt_number: attendantNumber1,
        passport_alt_number1: attendantNumber2,
        passport_alt_number2: attendantNumber3,
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

  const fileDisplay = selectedFile ? (
    <div className="file__value" onClick={() => setSelectedFile(null)}>
      <div className="file__value--text">{selectedFile.name}</div>
      <div className="file__value--remove" data-id={selectedFile.name}></div>
    </div>
  ) : null;
  const fileDisplay1 = attendantImage1 ? (
    <div className="file__value" onClick={() => setAttendantImage1(null)}>
      <div className="file__value--text">{attendantImage1.name}</div>
      <div className="file__value--remove" data-id={attendantImage1.name}></div>
    </div>
  ) : null;

  const fileDisplay2 = attendantImage2 ? (
    <div className="file__value" onClick={() => setAttendantImage2(null)}>
      <div className="file__value--text">{attendantImage2.name}</div>
      <div className="file__value--remove" data-id={attendantImage2.name}></div>
    </div>
  ) : null;

  const fileDisplay3 = attendantImage3 ? (
    <div className="file__value" onClick={() => setAttendantImage3(null)}>
      <div className="file__value--text">{attendantImage3.name}</div>
      <div className="file__value--remove" data-id={attendantImage3.name}></div>
    </div>
  ) : null;

  const desc =
    "Thank you! We have received your details. Our team will contact you soon to assist you in your VISA application process.";
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
              <form onSubmit={handleFormSubmit}>
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
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                      />
                      <div className="medical-report-all">
                        {fileDisplay}
                        {!selectedFile && (
                          <div>
                            <button className="medical-report-file">
                              Upload Passport
                            </button>
                            {fileValidationMessage && (
                              <p style={{ color: "red" }}>
                                {fileValidationMessage}
                              </p>
                            )}
                            <input
                              type="file"
                              name="file"
                              onChange={handleFileChange}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="visa-form">
                  <div className="visa-form-box">
                    <label>Attendant Passport Number</label>
                    {numAttendants >= 1 && (
                      <div className="visa-form2">
                        <input
                          type="text"
                          placeholder="XXXXXXXXXXX"
                          value={attendantNumber1}
                          onChange={(e) =>
                            handleAttendantNumberChange(1, e.target.value)
                          }
                        />
                        <div className="medical-report-all">
                          {fileDisplay1}
                          {!attendantImage1 && (
                            <>
                              <button className="medical-report-file">
                                Upload Passport
                              </button>
                              <input
                                type="file"
                                name="attendantImage1"
                                onChange={(e) =>
                                  handleAttendantImageChange(1, e)
                                }
                              />
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Attendant 2 */}
                    {numAttendants >= 2 && (
                      <div className="visa-form2">
                        <input
                          type="text"
                          placeholder="XXXXXXXXXXX"
                          value={attendantNumber2}
                          onChange={(e) =>
                            handleAttendantNumberChange(2, e.target.value)
                          }
                        />
                        <div className="medical-report-all">
                          {fileDisplay2}
                          {!attendantImage2 && (
                            <>
                              <button className="medical-report-file">
                                Upload Passport
                              </button>
                              <input
                                type="file"
                                name="attendantImage1"
                                onChange={(e) =>
                                  handleAttendantImageChange(2, e)
                                }
                              />
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Attendant 3 */}
                    {numAttendants >= 3 && (
                      <div className="visa-form2">
                        <input
                          type="text"
                          placeholder="XXXXXXXXXXX"
                          value={attendantNumber3}
                          onChange={(e) =>
                            handleAttendantNumberChange(3, e.target.value)
                          }
                        />
                        <div className="medical-report-all">
                          {fileDisplay3}
                          {!attendantImage3 && (
                            <>
                              <button className="medical-report-file">
                                Upload Passport
                              </button>
                              <input
                                type="file"
                                name="attendantImage1"
                                onChange={(e) =>
                                  handleAttendantImageChange(3, e)
                                }
                              />
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {numAttendants < 3 && (
                  <div className="visa-form-box">
                    <a
                      onClick={handleAddAttendant}
                      style={{ color: "#ff6800" }}
                    >
                      Add Attendant +
                    </a>
                  </div>
                )}

                <div className="visa-form-box">
                  {/* <button type="submit" name="en" className="visa-submit">
                    {" "}
                    Submit Now{" "}
                  </button> */}
                  <button
                    type="submit"
                    name="en"
                    className="visa-submit"
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
                    {/* <img src="/images/2023/01/arrow-c.png" alt="arrow-Icon" /> */}
                  </button>
                </div>
              </form>

              <em>*$50 USD Application fees is applicable</em>
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

export default VisaaForm;
