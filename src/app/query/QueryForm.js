"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import "intl-tel-input/build/css/intlTelInput.css"; // Import CSS
import intlTelInput from "intl-tel-input";

const QueryForm = () => {
  // form query post api
  const [name, setName] = useState("");
  const [pcode, setPcode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

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

    setNameError("");
    setPhoneError("");
    setEmailError("");

    // Validation logic
    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!captchaValue) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    const phoneRegex = /^\d{10,}$/; // Matches 10 or more digits
    if (!phone || !phone.match(phoneRegex)) {
      setPhoneError("Phone must have at least 10 digits");
      isValid = false;
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
      const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/free_consultants`;

      setIsLoading(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
        .then((response) => {
          // Handle the API response here if needed
          console.log(response);
          alert("questions is susscefull submitted");
          clearFormFields();
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
  return (
    <>
      <section id="query-form">
        <div className="midbox-inner  wiki-mk">
          <img
            src="images/2023/02/logo.png"
            className="logo-med"
            alt="Brand Logo"
          />
          <div className="query-form">
            <h1>Query Form</h1>

            <div className="treatment-right">
              <form onSubmit={handleFormSubmit}>
                <div
                  className="treatment-form"
                  style={nameError ? Formstyles.errorInput : {}}
                >
                  <div className="inputbox">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder=""
                      name="name"
                      required
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
                    <input
                      ref={inputRef}
                      type="tel"
                      id="mobile_code"
                      placeholder=""
                      value={phone}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                </div>

                <div className="treatment-form">
                  <div className="inputbox">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder=""
                      name="name"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>

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
                <p>
                  I agree to the <a href="#">Terms of use Privacy policy</a> and
                  receive marketing letters that may be of interest.
                </p>
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
      </section>
    </>
  );
};

export default QueryForm;
