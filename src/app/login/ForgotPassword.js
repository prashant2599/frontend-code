"use client";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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

    // Validation logic

    if (!emailValid) {
      setValidationMessage("Please enter a valid email address.");
      return;
    }

    // Create the data object to be sent in the API request
    const data = {
      email: email,
    };

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/forget-password`;

    // Make the API call
    axios
      .post(apiEndpoint, data)
      .then((response) => {
        // Handle the API response here if needed
        console.log(response);
        alert(
          "Your password reset link is on its way to your email address; please check your inbox."
        );
        togglePopup();
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          alert("Invalid Email Id");
        } else {
          console.error("Error:", error);
        }
      });
    //   .finally(() => {
    //     // Set loading back to false after the API call is complete
    //     setIsLoading(false);
    //   });
  };
  return (
    <>
      <div className="account-box">
        <span
          style={{ color: "#ff6800", cursor: "pointer" }}
          onClick={togglePopup}
        >
          Forgot Password
        </span>
      </div>
      {isPopupOpen && (
        <div className="popup" data-popup="popup-3" style={popupStyle}>
          <div className="popup-inner3">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="popup-close"
                  data-popup-close="popup-3"
                  data-dismiss="modal"
                  onClick={togglePopup}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <h2> Forgot Password</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="share-link">
                  <input
                    type="email"
                    placeholder="Email"
                    name="name"
                    required
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                  />

                  <button
                    type="submit"
                    name="en"
                    className="copy-link"
                    //   onClick={copyToClipboard}
                  >
                    Send
                  </button>
                </div>
              </form>
              {!emailValid && (
                <div className="error-message" style={{ color: "red" }}>
                  {validationMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
