"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import { useState, useEffect, useRef } from "react";
import "intl-tel-input/build/css/intlTelInput.css"; // Import CSS
import intlTelInput from "intl-tel-input";
import axios from "axios";

const BlogDForm = () => {
  // Assistance form post

  const [name1, setName1] = useState("");
  const [pcode1, setPcode1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [email1, setEmail1] = useState("");
  const [query1, setQuery1] = useState("");

  const [isLoading1, setIsLoading1] = useState(false);

  const [nameError1, setNameError1] = useState("");
  const [phoneError1, setPhoneError1] = useState("");
  const [emailError1, setEmailError1] = useState("");
  const [captchaValue1, setCaptchaValue1] = useState(null);

  const handleCaptchaChange1 = (value) => {
    setCaptchaValue1(value);
  };

  const clearFormFields1 = () => {
    setName1("");
    setPhone1("");
    setEmail1("");
    setQuery1("");
  };

  const handleFormSubmit1 = (event) => {
    event.preventDefault();
    setNameError1("");
    setPhoneError1("");
    setEmailError1("");

    // Validation logic
    let isValid = true;

    if (!name1) {
      setNameError1("Name is required");
      isValid = false;
    }
    if (!captchaValue1) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    const phoneRegex = /^\d{10,}$/; // Matches 10 or more digits
    if (!phone1 || !phone1.match(phoneRegex)) {
      setPhoneError1("Phone must have at least 10 digits");
      isValid = false;
    }

    if (isValid) {
      // Create the data object to be sent in the API request
      const data = {
        name: name1,
        phone_code: pcode1,
        phone: phone1,
        email: email1,
        messages: query1,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `https://dev.medflick.com/api/free_consultants`;

      setIsLoading1(true);

      // Make the API call
      axios
        .post(apiEndpoint, data)
        .then((response) => {
          // Handle the API response here if needed
          console.log(response);
          alert("questions is susscefull submitted");
          clearFormFields1();
        })
        .catch((error) => {
          // Handle any errors that occurred during the API call
          console.error("Error:", error);
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
  return (
    <>
      <div className="blog-rightbox">
        <div className="treatment-right">
          <h2>Need Assistance?</h2>

          <form onSubmit={handleFormSubmit1}>
            <div className="treatment-form">
              <div className="inputbox">
                <label>Name</label>
                <input
                  type="text"
                  placeholder=""
                  name="name"
                  required
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  autoComplete="off"
                  style={nameError1 ? Formstyles.errorInput : {}}
                />
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
                  required
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
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
                  value={query1}
                  onChange={(e) => setQuery1(e.target.value)}
                  autoComplete="off"
                ></textarea>
              </div>
            </div>
            <ReCAPTCHA
              sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
              onChange={handleCaptchaChange1}
            />

            <button
              type="submit"
              name="en"
              className="home-button"
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
              )}
              <img src="/images/2023/01/arrow-c.png" alt="arrow-Icon" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogDForm;
