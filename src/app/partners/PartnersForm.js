"use client";
import { useRef, useEffect, useState } from "react";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import Success from "../Home/successPopup/Success";
import ErrorPopup from "../Home/successPopup/ErrorPopup";
import ReCAPTCHA from "react-google-recaptcha";
const PartnersForm = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [name, setName] = useState("");
  const [pcode, setPcode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

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
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/partnerPost`;

      setIsLoading(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
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
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "",
      }));
    }
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

  const handleNameBlur = () => {
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
  };

  const renderError = (error) =>
    error && <div className="error-message">{error}</div>;

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const desc =
    "Help on the way! We appreciate your patience! We will get back to you soon.";
  return (
    <>
      <div className="partner-with-right">
        <div className="treatment-right">
          <h2>Partner with Us</h2>

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
                onBlur={handleNameBlur}
                style={formErrors.name ? Formstyles.errorInput : {}}
              />
              {renderError(formErrors.name)}
            </div>
          </div>
          <div class="treatment-form">
            <div class="phone-box2">
              <label>Country</label>
              <div class="most-reviews1">
                <select class="reviews-dropdown " aria-label="Sort dropdown">
                  <option value="select-language">Select Country </option>
                  <option value=""> India</option>
                  <option value=""> India</option>
                </select>
              </div>
            </div>
            <div class="phone-box2">
              <label>City</label>
              <div class="most-reviews1">
                <select class="reviews-dropdown " aria-label="Sort dropdown">
                  <option value="select-language">Select City</option>
                  <option value=""> Delhi</option>
                  <option value=""> Delhi</option>
                </select>
              </div>
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

          <div className="treatment-form">
            <div className="inputbox">
              <label>Email</label>
              <input
                type="text"
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
          </div>
          <div class="treatment-form">
            <div class="inputbox">
              <label>I’m interested in</label>
              <div class="most-reviews1">
                <select class="reviews-dropdown " aria-label="Sort dropdown">
                  <option value="select-language">Patient appointments</option>
                  <option value=""> Patient appointments</option>
                  <option value=""> Patient appointments</option>
                </select>
              </div>
            </div>
          </div>
          <ReCAPTCHA
            sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo"
            onChange={handleCaptchaChange}
          />
          {renderError(formErrors.captcha)}

          <button type="submit" name="en" className="home-button">
            {" "}
            Submit Now <img src="images/2023/01/arrow-c.png" alt="" />
          </button>
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

export default PartnersForm;
