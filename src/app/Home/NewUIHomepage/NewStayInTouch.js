"use client";
import { useState } from "react";
import axios from "axios";
import Success from "../successPopup/Success";
import ErrorPopup from "../successPopup/ErrorPopup";

const NewStayInTouch = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const isValidEmail = (email) => {
    // A simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/newletter_post`,
        { email }
      );

      setShowSuccessPopup(true);
      setEmail("");
    } catch (error) {
      setShowErrorPopup(true);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };
  const message = "Subscribed";
  const desc = "Thank you for joining us on the journey to wellness!";
  return (
    <>
      <section id="home-latest-updates">
        <div className="midbox-inner wiki-mk">
          <div className="home-latest-updates">
            <div className="home-latest-updatesleft">
              <h2>MedBlog: Your Source for Health Knowledge</h2>
            </div>

            <div className="home-latest-updatesright">
              <h3>Sign up to get Latest updates</h3>
              {/* <p>Get updates, beauty news, and special offers</p> */}

              <div className="footer-latest-news">
                <input
                  className="footer-news"
                  type="text"
                  placeholder="Enter Your Email address"
                  name="name"
                  value={email}
                  onChange={handleInputChange}
                  required
                />

                <button
                  type="submit"
                  className="footer-news-button"
                  disabled={loading}
                  onClick={handleFormSubmit}
                >
                  {loading ? "Signing..." : "Sign Up"}
                </button>
              </div>
              {error && (
                <p className="error-message" style={{ textAlign: "left" }}>
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      {showSuccessPopup && (
        <Success
          onClose={handleCloseSuccessPopup}
          showSuccessPopup={showSuccessPopup}
          desc={desc}
          message={message}
        />
      )}
      {showErrorPopup && (
        <ErrorPopup
          onClose={handleCloseErrorPopup}
          showErrorPopup={showErrorPopup}
        />
      )}
    </>
  );
};

export default NewStayInTouch;
