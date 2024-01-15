"use client";
import { useState } from "react";
import axios from "axios";
import Success from "@/app/Home/successPopup/Success";
import ErrorPopup from "@/app/Home/successPopup/ErrorPopup";

const BlogNewsletter = () => {
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

  const desc = "Thank you for joining us on the journey to wellness!";

  return (
    <>
      <section id="newslette-section">
        <div className="midbox-inner  wiki-mk">
          <div className="newslette-box">
            <div className="newslette-left">
              <h2>Stay Informed, Stay Healthy</h2>
              <p>
                Subscribe to our Newsletter and make your informed health
                decisions. Get essential health insights and updates delivered
                straight to your inbox. Join now for a healthier you.
              </p>
            </div>
            <div className="newslette-right">
              <div className="latest-news">
                <input
                  className="latest-newsbox"
                  type="text"
                  placeholder="Email address"
                  name="name"
                  value={email}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="news-button"
                  disabled={loading}
                  onClick={handleFormSubmit}
                >
                  {loading ? "Signing..." : "Sign Up"}
                  <img src="/images/2023/01/arrow-w.png" alt="" />
                </button>
                {error && (
                  <p className="error-message" style={{ textAlign: "left" }}>
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
};

export default BlogNewsletter;
