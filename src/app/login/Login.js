"use client";
import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../UserContext";
import ForgotPassword from "./ForgotPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setUserName } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const clearFormFields = () => {
    setPassword("");
    setEmail("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validation logic
    let isValid = true;

    let validationMessage = "";

    // You can add more validation checks here, such as minimum password length, email format, etc.

    if (!isValid) {
      // Display validation message if validation fails
      alert(validationMessage);
      return;
    }

    // Create the data object to be sent in the API request
    const data = {
      password: password,
      email: email,
    };
    const previousUrl = localStorage.getItem("previousUrl");

    console.log(previousUrl);

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`;

    setIsLoading(true);

    // Make the API call
    axios
      .post(apiEndpoint, data)
      .then((response) => {
        // Handle the API response here if needed
        console.log(response);
        // alert("Login susscefull");
        clearFormFields();
        setUserName(response.data.data.name);
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("userRole", response.data.data.role);
        localStorage.setItem("userName", response.data.data.name);
        localStorage.setItem("userEmail", response.data.data.email);
        localStorage.setItem("userPhone", response.data.data.phone);
        toast.success("You are successfully logged in", {
          position: toast.POSITION.TOP_RIGHT,
        });
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
          setErrorMessage("Email ID not found or incorrect password");
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
        <div className="login-mid login-mk">
          <div className="login-box">
            <div className="login-box-left login-img-d">
              <img src="/images/2023/07/1.jpg" alt="login-img" />
              <div className="home-drbox">
                <h4>We value your Privacy</h4>
                <ul>
                  <li>
                    <img
                      src="/images/2023/compliance helpline.png"
                      alt="icon1"
                    />
                    <h5>Compliance Helpline</h5>
                  </li>
                  <li>
                    <img src="/images/2023/confidentiality.png" alt="icon2" />
                    <h5>Confidentiality</h5>
                  </li>
                  <li>
                    <img
                      src="/images/2023/transparent policie.png"
                      alt="icon3"
                    />
                    <h5>Transparent Policies</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className="login-box-right">
              {/* <img
                src="images/2023/02/logo.png"
                className="logo-login"
                alt="Brand Logo"
              /> */}
              <h1>
                Welcome to <span style={{ color: "#ff6800" }}>Medflick</span>
              </h1>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {/* <p>Lorem ipsum dolor sit amet quis alenquen</p> */}
              <form onSubmit={handleFormSubmit}>
                <div className="inputbox">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="inputbox">
                  <label>Password</label>
                  <input
                    type="password"
                    name="name"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
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
                    "Login"
                  )}
                </button>
              </form>
              <ForgotPassword />

              <div className="account-box">
                Don&apos;t have an account? <Link href="/sign-up">Sign Up</Link>
              </div>
            </div>
            <div className="login-box-left login-img">
              <img src="images/2023/07/1.jpg" alt="" />
              <div className="home-drbox">
                <h4>We value your Privacy</h4>
                <ul>
                  <li>
                    <img
                      src="/images/2023/compliance helpline.png"
                      alt="icon1"
                    />
                    <h5>Confidentiality</h5>
                  </li>
                  <li>
                    <img src="/images/2023/confidentiality.png" alt="icon2" />
                    <h5>Transparent Policies</h5>
                  </li>
                  <li>
                    <img
                      src="/images/2023/transparent policie.png"
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
      <ToastContainer />
    </>
  );
};

export default Login;
