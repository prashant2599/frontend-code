"use client";

import { useState } from "react";
import axios from "axios";
import Success from "@/app/Home/successPopup/Success";
import ErrorPopup from "@/app/Home/successPopup/ErrorPopup";

const ChangePassword = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePopup2 = () => {
    setIsPopupOpen2((prev) => !prev);
  };

  const popupStyle2 = {
    display: isPopupOpen2 ? "block" : "none",
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setNewPassword(inputPassword);

    if (passwordTouched) {
      validatePassword(inputPassword);
    }
  };

  const validatePassword = (inputPassword) => {
    // Define the regex pattern for password validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

    const isValid = passwordPattern.test(inputPassword);

    setPasswordValid(isValid);
    setValidationMessage(
      isValid
        ? ""
        : "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least six characters long."
    );
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    validatePassword(newPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (newPassword !== confirmPassword) {
    //   alert("New Password and Confirm Password must match.");
    //   return;
    // }
    if (!passwordValid) {
      setValidationMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least six characters long."
      );
      return;
    }

    const data = {
      newPassword: newPassword,
    };
    setIsLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patient_update/passwordUpdate`, data)
      .then((response) => {
        setShowSuccessPopup(true);
        clearFormFields();
        setIsPopupOpen2(false);
      })
      .catch((error) => {
        console.error("Error updating password", error);
        setShowErrorPopup(true);
      })
      .finally(() => {
        // Set loading back to false after the API call is complete
        setIsLoading(false);
      });
  };

  const clearFormFields = () => {
    setNewPassword("");
  };
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const desc = "Your password has been successfully updated";
  return (
    <>
      <div className="edit-profile">
        <h2>Profile</h2>
        <a onClick={togglePopup2}>Edit</a>
      </div>
      <div className="current-password">Current Password: **********</div>

      <div className="popup" data-popup="popup-2" style={popupStyle2}>
        <div className="popup-innerPassword">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="popup-close"
                data-popup-close="popup-2"
                data-dismiss="modal"
                onClick={togglePopup2}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="dashboard-form">
              <h2> New Password </h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore
              </p>
              <form onSubmit={handleSubmit}>
                {!passwordValid && passwordTouched && (
                  <div
                    className="error-message"
                    style={{ color: "red", textAlign: "center" }}
                  >
                    {validationMessage}
                  </div>
                )}
                <div className="new-password-form">
                  <input
                    type="password"
                    placeholder="Write Your New Password"
                    name="name"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                  />
                </div>

                <div className="home-form-box">
                  <button
                    type="submit"
                    name="en"
                    className="submit-now"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
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
      {/* <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              required
            />
            {!passwordValid && passwordTouched && (
              <div className="error-message" style={{ color: "red" }}>
                {validationMessage}
              </div>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="pure-button pure-button-primary">
            Confirm
          </button>
        </form>
      </div> */}
    </>
  );
};

export default ChangePassword;
