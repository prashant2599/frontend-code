"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../UserContext";
import ForgotPassword from "./ForgotPassword";
import SurePopup from "../Home/successPopup/SurePopup";
import CustomSpinner from "../Home/CustomTwitterIcon/CustomSpinner";

const Login = () => {
  const router = useRouter();
  const [showSurePopup, setShowSurePopup] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { setUserName, setUserId } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const isValidEmail = validateEmail(newEmail);
    setEmailError(isValidEmail ? "" : "Invalid email address");
  };

  const handleEmailBlur = () => {
    const isValidEmail = validateEmail(email);
    setEmailError(isValidEmail ? "" : "Invalid email address");
  };

  const clearFormFields = () => {
    setPassword("");
    setEmail("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validation logic
    let isValid = true;

    let validationMessage = "";

    if (!isValid) {
      alert(validationMessage);
      return;
    }
    const data = {
      password: password,
      email: email,
    };
    const previousUrl = localStorage.getItem("previousUrl");

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`;

    setIsLoading(true);

    // Make the API call
    axios
      .post(apiEndpoint, data)
      .then((response) => {
        clearFormFields();
        setUserName(response.data.data.name);
        setUserId(response.data.data.id);
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("userRole", response.data.data.role);
        localStorage.setItem("userName", response.data.data.name);
        localStorage.setItem("userEmail", response.data.data.email);
        localStorage.setItem("userPhone", response.data.data.phone);
        localStorage.setItem("lastLogin", response.data.data.last_login);

        const redirectUrl = previousUrl
          ? `/${previousUrl}`
          : "/patient-dashboard";
        router.push(redirectUrl);
        localStorage.removeItem("previousUrl");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Show a custom error message for 401 (Unauthorized) error
          // alert("Email ID not found or incorrect password");
          // setErrorMessage("Email ID not found or incorrect password");
          setShowSurePopup(true);
        } else {
          console.error("Error:", error);
        }
      })
      .finally(() => {
        // Set loading back to false after the API call is complete
        setIsLoading(false);
      });
  };

  const handleCloseSurePopup = () => {
    setShowSurePopup(false);
  };

  const sureDesc =
    "Email Id is not registered or Incorrect. Sign-up for new account.";

  // const sureMessage = "Email Address not found";

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section id="login-section">
        <div className="login-mid login-mk">
          <div className="login-box">
            <div className="login-box-left login-img-d">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/07/1.jpg`}
                alt="login-img"
              />
              <div className="home-drbox">
                <h4>We value your Privacy</h4>
                <ul>
                  <li>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/compliance helpline.png`}
                      alt="icon1"
                    />
                    <h5>Compliance Helpline</h5>
                  </li>
                  <li>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/confidentiality.png`}
                      alt="icon2"
                    />
                    <h5>Confidentiality</h5>
                  </li>
                  <li>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/transparent policie.png`}
                      alt="icon3"
                    />
                    <h5>Transparent Policies</h5>
                  </li>
                </ul>
              </div>
            </div>

            <div className="login-box-right" style={{ marginTop: "5rem" }}>
              {/* <img
                src="images/2023/02/logo.png"
                className="logo-login"
                alt="Brand Logo"
              /> */}
              <h1>
                Welcome to <span style={{ color: "#ff6800" }}>Medflick</span>
              </h1>
              {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
              {/* <p>Lorem ipsum dolor sit amet quis alenquen</p> */}
              <form onSubmit={handleFormSubmit}>
                <div className="inputbox">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="name"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    autoComplete="off"
                  />
                  {emailError && (
                    <div
                      // style={{ margin: "0px", color: "red", fontSize: "14px" }}
                      className="error-message"
                    >
                      {emailError}
                    </div>
                  )}
                </div>
                <div className="inputbox">
                  <label>Password</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <img
                      className="password-toggle-icon"
                      src={
                        showPassword
                          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/ci_hide.svg`
                          : `${process.env.NEXT_PUBLIC_IMAGE_URL}/ci_show.svg`
                      }
                      alt={showPassword ? "Hide Password" : "Show Password"}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  name="en"
                  className="login-button"
                  disabled={isLoading}
                >
                  {isLoading ? <CustomSpinner /> : "Login"}
                </button>
              </form>
              <ForgotPassword />

              <div className="account-box">
                Don&apos;t have an account? <Link href="/sign-up">Sign Up</Link>
              </div>
            </div>
            <div className="login-box-left login-img">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/07/1.jpg`}
                alt="login-icon"
              />
              <div className="home-drbox">
                <h4>We value your Privacy</h4>
                <ul>
                  <li>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/compliance helpline.png`}
                      alt="icon1"
                    />
                    <h5>Confidentiality</h5>
                  </li>
                  <li>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/confidentiality.png`}
                      alt="icon2"
                    />
                    <h5>Transparent Policies</h5>
                  </li>
                  <li>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/transparent policie.png`}
                      alt="icon3"
                    />
                    <h5>Compliance Helpline</h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showSurePopup && (
        <SurePopup
          onClose={handleCloseSurePopup}
          showSurePopup={showSurePopup}
          sureDesc={sureDesc}
        />
      )}
    </>
  );
};

export default Login;
