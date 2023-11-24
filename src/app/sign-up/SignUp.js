"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { useUser } from "../UserContext";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setUserName } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const clearFormFields = () => {
    setName("");
    setPassword("");
    setEmail("");
    setCpassword("");
  };

  // Email validations

  const [emailValid, setEmailValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false); // Track if the email field has been touched
  const [passwordvalidationMessage, setPasswordValidationMessage] =
    useState("");
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
    setPasswordValidationMessage(
      isValid ? "" : "Please enter a valid email address."
    );
  };

  const handleEmailBlur = () => {
    setEmailTouched(true); // Mark email field as touched when it loses focus
    validateEmail(email); // Validate email on blur
  };

  // password validations

  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

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
    validatePassword(password);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validation logic
    let isValid = true;

    let validationMessage = "";

    if (!emailValid) {
      setValidationMessage("Please enter a valid email address.");
      return;
    }

    if (!passwordValid) {
      setValidationMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least six characters long."
      );
      return;
    }

    if (password !== cpassword) {
      isValid = false;
      validationMessage = "Password and Confirm Password do not match.";
    }

    if (!captchaValue) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    if (password.length < 6) {
      isValid = false;
      validationMessage = "Password must be at least six characters long.";
    }

    // You can add more validation checks here, such as minimum password length, email format, etc.

    if (!isValid) {
      // Display validation message if validation fails
      alert(validationMessage);
      return;
    }

    // Create the data object to be sent in the API request
    const data = {
      name: name,
      c_password: cpassword,
      password: password,
      email: email,
      role: "patient",
    };

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`;

    setIsLoading(true);

    // Make the API call
    axios
      .post(apiEndpoint, data)
      .then((response) => {
        // Handle the API response here if needed
        console.log(response);
        // alert("Register susscefull");
        clearFormFields();
        setUserName(response.data.data.name);
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("userRole", response.data.data.role);
        localStorage.setItem("userName", response.data.data.name);
        localStorage.setItem("userEmail", response.data.data.email);
        localStorage.setItem("userPhone", response.data.data.phone);
        router.push("/patient-dashboard");
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.email
        ) {
          const errorMessage = error.response.data.error.email[0];
          alert(errorMessage);
        } else {
          console.error("Error:", error);
        }
      })
      .finally(() => {
        // Set loading back to false after the API call is complete
        setIsLoading(false);
      });
  };
  return (
    <>
      <section id="login-section">
        <div className="login-mid  login-mk">
          <div className="login-box">
            <div className="sign-up-left login-img-d">
              <img
                src="images/2023/02/logo.png"
                className="sign-up-login"
                alt="Brand Logo"
              />
              <h2>Let us help you run sit amet lorem ipsum</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do
                eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet,
                consectetur
              </p>

              <div className="signup-testimonials">
                <img
                  src="images/2023/07/do.png"
                  className="img-do"
                  alt="medflick"
                />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit
                  amet, consectetur
                </p>

                <div className="signup-profile">
                  <div className="signupprofile-img">
                    <img src="images/2023/01/icon-m.png" alt="medflick" />
                  </div>
                  <h3>
                    Lorem ipsum dolor <span>india</span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="login-box-right">
              <h1>Join Medflick</h1>
              <p>Lorem ipsum dolor sit amet quis alenquen</p>
              <form onSubmit={handleFormSubmit}>
                <div className="inputbox">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder=""
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="inputbox">
                  <label>Email Address</label>
                  <input
                    type="text"
                    name="name"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    required
                  />
                </div>
                  {!emailValid && (
                    <div className="error-message" style={{ color: "red" }}>
                      {passwordvalidationMessage}
                    </div>
                  )}
                <div className="inputbox">
                  <label>Password</label>
                  <input
                    type="password"
                    name="name"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    required
                  />
                </div>
                {!passwordValid && passwordTouched && (
                  <div className="error-message" style={{ color: "red" }}>
                    {validationMessage}
                  </div>
                )}

                <div className="inputbox">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder=""
                    name="name"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                  />
                </div>
                <ReCAPTCHA
                  sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
                  onChange={handleCaptchaChange}
                />
                <button
                  type="submit"
                  name="en"
                  className="login-button"
                  disabled={isLoading}
                >
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
                    " Create Account"
                  )}
                </button>
              </form>

              <div className="account-box">
                Have an account? <Link href="/login"> Log In </Link>
              </div>
            </div>

            <div className="sign-up-left sign-up-leftbox">
              <img
                src="images/2023/02/logo.png"
                className="sign-up-login"
                alt="Brand Logo"
              />
              <h2>Let us help you run sit amet lorem ipsum</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do
                eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet,
                consectetur
              </p>

              <div className="signup-testimonials">
                <img
                  src="images/2023/07/do.png"
                  className="img-do"
                  alt="medflick"
                />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit
                  amet, consectetur
                </p>

                <div className="signup-profile">
                  <div className="signupprofile-img">
                    <img src="images/2023/01/icon-m.png" alt="medflick" />
                  </div>
                  <h3>
                    Lorem ipsum dolor <span>india</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
