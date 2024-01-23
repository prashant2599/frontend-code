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
  const [emailResister, setEmailResister] = useState("");
  const { setUserName, setUserId } = useUser();

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

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    captcha: "",
    Password: "",
    confirmPassword: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setFormErrors({
      name: "",
      email: "",
      captcha: "",
      Password: "",
      confirmPassword: "",
    });

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
    if (!password) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        Password: "Please enter your password",
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

    if (password !== cpassword) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Password and Confirm Password do not match.",
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
        setUserId(response.data.data.id);
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
          // const errorMessage = error.response.data.error.email[0];
          setEmailResister(
            "Email already registered. Reset your password or contact support."
          );
          alert("Email already registered. Reset your password or contact support.");
        } else {
          console.error("Error:", error);
        }
      })
      .finally(() => {
        // Set loading back to false after the API call is complete
        setIsLoading(false);
      });
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

  const handlenameChange = (e) => {
    const inputValue = e.target.value;

    // Perform validation on write
    if (!inputValue.trim()) {
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

    // Update the name state
    setName(inputValue);
  };
  const handleNameBlur = () => {
    if (!name.trim()) {
      // If name is empty or contains only spaces, show error
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please enter your name",
      }));
    } else if (formErrors.name) {
      // If there was a previous error, clear it when the user enters their name
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
      }));
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChangeEmail = (e) => {
    const inputValue = e.target.value;

    // Perform email validation on write
    if (!inputValue || !emailRegex.test(inputValue)) {
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

    // Update the email state
    setEmail(inputValue);
  };

  const handleEmailBlur = () => {
    if (!email || !emailRegex.test(email)) {
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

  const validatePassword = (inputPassword) => {
    // Password must contain at least one uppercase letter,
    // one lowercase letter, one number, and be at least six characters long.
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
    return passwordRegex.test(inputPassword);
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;

    // Perform password validation on write
    if (!validatePassword(inputPassword)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        Password:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least six characters long.",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        Password: "",
      }));
    }

    // Update the password state
    setPassword(inputPassword);
  };
  const handlePasswordBlur = () => {
    // Perform password validation on blur
    if (!validatePassword(password)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        Password:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least six characters long.",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        Password: "",
      }));
    }
  };

  const handleConfirmPasswordBlur = () => {
    // Perform validation on blur to check if password and confirm password match
    if (password !== cpassword) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Password and Confirm Password do not match.",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  };

  const renderError = (error) =>
    error && <div className="error-message">{error}</div>;
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
              <h2>Access best medical care from top doctors and hospitals</h2>
              <p>
                We are committed to fostering the relationship of trust and
                reliability. Choose and connect instantly for transparent,
                expert, and personalized care. With Medflick at your side, make
                accurate and informed health decisions.
              </p>

              <div className="signup-testimonials">
                <img
                  src="images/2023/07/do.png"
                  className="img-do"
                  alt="medflick"
                />
                <p>
                  Dear Medflick Team, I am writing to express my gratitude and
                  satisfaction with the excellent service I received from your
                  medical tourism company. I am extremely satisfied with the
                  service I received from Medflick and would highly recommend
                  your company to anyone looking for a medical tourism service.
                  Thank you once again for making my experience in India a
                  memorable one.
                </p>

                <div className="signup-profile">
                  <div className="signupprofile-img">
                    <img src="images/2023/01/icon-m.png" alt="medflick" />
                  </div>
                  <h3>Shamsul Alam</h3>
                </div>
              </div>
            </div>

            <div className="login-box-right">
              <h1>
                Join <span style={{ color: "#ff6800" }}>Medflick</span>
              </h1>
              <p>Get in touch with the best doctors and hospitals instantly.</p>
              <form onSubmit={handleFormSubmit}>
                <div className="inputbox">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder=""
                    name="name"
                    value={name}
                    onBlur={handleNameBlur}
                    onChange={handlenameChange}
                    style={formErrors.name ? Formstyles.errorInput : {}}
                  />
                  {renderError(formErrors.name)}
                </div>
                <div className="inputbox">
                  <label>Email Address</label>
                  <input
                    type="text"
                    name="name"
                    value={email}
                    onChange={handleChangeEmail}
                    onBlur={handleEmailBlur}
                    style={formErrors.email ? Formstyles.errorInput : {}}
                  />
                  {renderError(formErrors.email)}
                </div>

                <div className="inputbox">
                  <label>Password</label>
                  <input
                    type="password"
                    name="name"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    style={formErrors.Password ? Formstyles.errorInput : {}}
                  />
                  {renderError(formErrors.Password)}
                </div>

                <div className="inputbox">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder=""
                    name="name"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    onBlur={handleConfirmPasswordBlur}
                    style={
                      formErrors.confirmPassword ? Formstyles.errorInput : {}
                    }
                  />
                  {renderError(formErrors.confirmPassword)}
                </div>

                <ReCAPTCHA
                  sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
                  onChange={handleCaptchaChange}
                />
                {renderError(formErrors.captcha)}
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
