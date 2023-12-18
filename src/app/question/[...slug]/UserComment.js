"use client";

import { FaComments } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import Success from "@/app/Home/successPopup/Success";
import ErrorPopup from "@/app/Home/successPopup/ErrorPopup";

const UserComment = ({ id, specialityId, subspecialityId, treatments }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState([]);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  useEffect(() => {
    // Check if the userId is in local storage to determine if the user is logged in
    if (localStorage.getItem("userId")) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    if (!loggedIn) {
      // alert("Please login first.");
      toast.error("Please login first.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      setIsPopupOpen((prev) => !prev);
    }
  };
  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (comment.trim().length === 0) {
      // Set the commentError to true
      setCommentError(true);
      return;
    }

    // Create the data object to be sent in the API request
    const data = {
      qa_id: id,
      patient_id: userId,
      speciality_id: specialityId,
      subspeciality_id: subspecialityId,
      treatments: treatments,
      long_description: comment,
    };

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const apiEndpoint = `https://dev.medflick.com/api/qareply`;
    setIsLoading1(true);

    // Make the API call
    axios
      .post(apiEndpoint, data)
      .then((response) => {
        setShowSuccessPopup(true);
        clearFormFields1();
        togglePopup();
      })
      .catch((error) => {
        setShowErrorPopup(true);
        console.error("Error:", error);
      })
      .finally(() => {
        // Set loading back to false after the API call is complete
        setIsLoading1(false);
      });
  };

  const clearFormFields1 = () => {
    setComment("");
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };
  return (
    <>
      <a href="#" className="share-discussion" onClick={togglePopup}>
        Add a comment
      </a>
      {isPopupOpen && (
        <div className="popup" data-popup="popup-2" style={popupStyle}>
          <div className="popup-inner1">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="popup-close"
                  data-popup-close="popup-2"
                  data-dismiss="modal"
                  onClick={togglePopup}
                >
                  <span aria-hidden="true" style={{ color: "#fff" }}>
                    ×
                  </span>
                </button>
              </div>
              <h2>Ask Question </h2>

              <div className="questions-form-box">
                <div className="form-group">
                  <textarea
                    type="textarea"
                    name="query"
                    placeholder="Ask question. Use @ to mention members"
                    rows="2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    autoComplete="off"
                  ></textarea>
                  {commentError && (
                    <p style={{ color: "red" }}>Comment cannot be empty</p>
                  )}
                </div>
                {/* <ReCAPTCHA
                  sitekey="6LcX6-YnAAAAAAjHasYD8EWemgKlDUxZ4ceSo8Eo" // Replace with your reCAPTCHA site key
                  onChange={handleCaptchaChange}
                />
                {renderError(formErrors.captcha)} */}
              </div>

              <div className="question-box7">
                {/* <div className="upload-report-box">
                  <div className="medical-report-wrapper">
                    <button className="medical-report">
                      <img src="/images/2023/07/upload-icon.png" /> Medical
                      report
                    </button>
                    <input type="file" name="file" />
                  </div>
                </div> */}

                <div className="question-post-box">
                  <button
                    type="submit"
                    name="en"
                    className="cancel-button"
                    onClick={togglePopup}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    name="en"
                    className="post-button"
                    onClick={handleFormSubmit}
                  >
                    Post{" "}
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>{" "}
        </div>
      )}
      {showSuccessPopup && (
        <Success
          onClose={handleCloseSuccessPopup}
          showSuccessPopup={showSuccessPopup}
        />
      )}

      {showErrorPopup && (
        <ErrorPopup
          onClose={handleCloseErrorPopup}
          showErrorPopup={showErrorPopup}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default UserComment;
