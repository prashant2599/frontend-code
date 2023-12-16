"use client";
import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import "intl-tel-input/build/css/intlTelInput.css"; // Import CSS
import intlTelInput from "intl-tel-input";

const NavForm1 = ({ treatmentId, specialityId }) => {
  // form 2 post request

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
    setPcode1("");
  };

  // Email validations

  const [emailValid, setEmailValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false); // Track if the email field has been touched
  const [validationMessage, setValidationMessage] = useState("");

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail1(inputEmail);

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
    validateEmail(email1); // Validate email on blur
  };

  const handleFormSubmit1 = (event) => {
    event.preventDefault();

    setNameError1("");
    setPhoneError1("");

    const patientId = localStorage.getItem("userId");

    // Validation logic
    let isValid = true;

    if (!userName) {
      if (!name1) {
        setNameError1("Name is required");
        isValid = false;
      }
    }
    if (!userEmail) {
      if (!emailValid) {
        setValidationMessage("Please enter a valid email address.");
        return;
      }
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
        name: userName ? userName : name1,
        phone_code: pcode1,
        phone: phone1,
        email: userEmail ? userEmail : email1,
        // messages: query,
        patient_id: patientId,
        speciality_id: specialityId,
        treatment_id: treatmentId,
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiEndpoint = `https://dev.medflick.com/api/free_quote_treatment`;

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
                  placeholder=""
                  name="name"
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

            {userEmail ? null : (
              <div className="treatment-form" style={{marginBottom:"20px"}}>
                <div className="inputbox">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder=""
                    name="name"
                    value={email1}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    autoComplete="off"
                  />
                    {!emailValid && (
              <div className="error-message" style={{ color: "red" }}>
                {validationMessage}
              </div>
            )}
                </div>
              </div>
            )}

          
            <ReCAPTCHA
              sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
              onChange={handleCaptchaChange1}
            />

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
    </>
  );
};

export default NavForm1;
