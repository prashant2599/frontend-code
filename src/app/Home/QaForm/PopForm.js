"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PopForm = () => {
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
  // form popup scripts
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
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

  // form popup post method

  const [name, setName] = useState("");
  const [pcode, setPcode] = useState("");
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

  const clearFormFields = () => {
    setName("");
    setPhone("");
    setEmail("");
    setQuery("");
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
    // if (!captchaValue) {
    //   alert("Please complete the CAPTCHA.");
    //   return;
    // }

    const phoneRegex = /^\d{10,}$/; // Matches 10 or more digits
    if (!phone || !phone.match(phoneRegex)) {
      setPhoneError("Phone must have at least 10 digits");
      isValid = false;
    }

    if (isValid) {
      // Create the data object to be sent in the API request
      const data = {
        pname: userName ? userName : name,
        phone_code: pcode,
        phone: phone,
        email: userEmail ? userEmail : email,
        askq: query,
        patient_id: patientId,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `https://dev.medflick.com/api/askPost`;

      setIsLoading(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
        .then((response) => {
          // Handle the API response here if needed
          console.log(response);
          alert("questions is susscefull submitted");
          clearFormFields();
          setIsPopupOpen(false);
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
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <>
      <div className="search-question-right">
        <span>Have any Questions?</span>
        <span
          className="ask-question"
          data-popup-open="popup-2"
          onClick={togglePopup}
          style={{ cursor: "pointer" }}
        >
          <img src="images/2023/07/ask.png" alt="" /> Ask Question
        </span>
      </div>

      {isPopupOpen && (
        <div className="popup" data-popup="popup-1" style={popupStyle}>
          <div className="popup-inner2">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="popup-close"
                  data-popup-close="popup-1"
                  data-dismiss="modal"
                  onClick={togglePopup}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <h2 onClick={showToastMessage}>Ask Free Question</h2>

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
                    <div className="phone-form">
                      <div className="phone-box1">
                        <select
                          aria-label="Sort dropdown"
                          className="phone-dropdown"
                          value={pcode}
                          onChange={(e) => setPcode(e.target.value)}
                        >
                          <option value="">Choose Code</option>
                          <option value="+91">India (+91)</option>
                          <option value="1">UK (+44)</option>
                          <option value="213">Algeria (+213)</option>
                          <option value="376">Andorra (+376)</option>
                          <option value="244">Angola (+244)</option>
                          <option value="1264">Anguilla (+1264)</option>
                          <option value="1268">
                            Antigua &amp; Barbuda (+1268)
                          </option>
                          <option value="54">Argentina (+54)</option>
                          <option value="374">Armenia (+374)</option>
                          <option value="297">Aruba (+297)</option>
                          <option value="61">Australia (+61)</option>
                          <option value="43">Austria (+43)</option>
                          <option value="994">Azerbaijan (+994)</option>
                          <option value="1242">Bahamas (+1242)</option>
                          <option value="973">Bahrain (+973)</option>
                          <option value="880">Bangladesh (+880)</option>
                          <option value="1246">Barbados (+1246)</option>
                          <option value="375">Belarus (+375)</option>
                          <option value="32">Belgium (+32)</option>
                          <option value="501">Belize (+501)</option>
                          <option value="229">Benin (+229)</option>
                          <option value="1441">Bermuda (+1441)</option>
                          <option value="975">Bhutan (+975)</option>
                          <option value="591">Bolivia (+591)</option>
                          <option value="387">Bosnia Herzegovina (+387)</option>
                          <option value="267">Botswana (+267)</option>
                          <option value="55">Brazil (+55)</option>
                          <option value="673">Brunei (+673)</option>
                          <option value="359">Bulgaria (+359)</option>
                          <option value="226">Burkina Faso (+226)</option>
                          <option value="257">Burundi (+257)</option>
                          <option value="855">Cambodia (+855)</option>
                        </select>
                      </div>
                      <div className="phone-box2">
                        <input
                          type="tel"
                          placeholder=""
                          name="name"
                          value={phone}
                          onChange={(e) => {
                            const phoneNumber = e.target.value.replace(
                              /\D/g,
                              ""
                            ); // Remove non-numeric characters
                            setPhone(phoneNumber);
                          }}
                          style={phoneError ? Formstyles.errorInput : {}}
                          autoComplete="off"
                        />
                      </div>
                    </div>
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
        </div>
      )}
    </>
  );
};

export default PopForm;
