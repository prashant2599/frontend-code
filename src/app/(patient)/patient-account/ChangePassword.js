"use client";

import { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

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

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password must match.");
      return;
    }
    if (!passwordValid) {
      setValidationMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least six characters long."
      );
      return;
    }

    const data = {
      newPassword: newPassword,
    };

    axios
      .post("https://dev.medflick.com/api/patient_update/passwordUpdate", data)
      .then((response) => {
        alert("Password updated successfully");
        clearFormFields();
      })
      .catch((error) => {
        console.error("Error updating password", error);
      });
  };

  const clearFormFields = () => {
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <>
      {/* <div className="current-password">Current Password: **********</div> */}
      <div>
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
      </div>
    </>
  );
};

export default ChangePassword;
