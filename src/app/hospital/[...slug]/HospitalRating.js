"use client";
import { useState, useEffect } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import Success from "@/app/Home/successPopup/Success";
import ErrorPopup from "@/app/Home/successPopup/ErrorPopup";

const HospitalRating = ({ name, hospitalId }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ratingValidationMessage, setRatingValidationMessage] = useState("");
  const [reviewValidationMessage, setReviewValidationMessage] = useState("");

  useEffect(() => {
    // Check if the userId is in local storage to determine if the user is logged in
    if (localStorage.getItem("userId")) {
      setLoggedIn(true);
    }
  }, []);
  // for rating

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleReviewSubmit = () => {
    if (!loggedIn) {
      alert("Please login first to leave a review.");
      return;
    }

    if (rating === 0) {
      setRatingValidationMessage(
        "Please select a rating before submitting your review."
      );
      return;
    }

    if (review.trim() === "") {
      setReviewValidationMessage("Please write a review before submitting.");
      return;
    }

    setLoading(true);

    const reviewData = {
      rating: rating,
      rating_description: review,
      name: localStorage.getItem("userName"),
      patient_id: localStorage.getItem("userId"),
      hospital_id: hospitalId,
    };

    // Make a POST request to submit the review
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ratingPost`, reviewData)
      .then((response) => {
        setShowSuccessPopup(true);
        // Optionally, you can reset the rating and review field here
        setRating(0);
        setReview("");
        setRatingValidationMessage("");
        setReviewValidationMessage("");
      })
      .catch((error) => {
        setShowErrorPopup(true);
        console.error("Error submitting review:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading back to false
      });
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };
  const message = "Thank you for your review!"
  return (
    <>
      <div className="star-reviews-box">
        <div className="leave-review">Leave a review</div>
        <p>How likely are you to recommend {name}?</p>
        <div className="star-box1">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <span
              key={index}
              onClick={() => handleRatingClick(star)}
              style={{
                fontSize: "2.5rem",
                cursor: "pointer",
                color: "#ff6800",
              }}
            >
              {star <= rating ? (
                <i>
                  <AiTwotoneStar />
                </i>
              ) : (
                <i>
                  <AiOutlineStar />
                </i>
              )}
            </span>
          ))}
        </div>
        {ratingValidationMessage && (
          <p style={{ color: "red" }}>{ratingValidationMessage}</p>
        )}
        <textarea
          style={{ height: "75px" }}
          value={review}
          onChange={handleReviewChange}
        ></textarea>
        {reviewValidationMessage && (
          <p style={{ color: "red" }}>{reviewValidationMessage}</p>
        )}

        {/* <button>Submit</button> */}
        <div className="medical-box">
          <a
            onClick={handleReviewSubmit}
            disabled={loading}
            style={{ cursor: "pointer" }}
          >
            {loading ? "Submitting..." : "Submit"}
          </a>
        </div>
      </div>
      
      {showSuccessPopup && (
        <Success
          onClose={handleCloseSuccessPopup}
          showSuccessPopup={showSuccessPopup}
          message = {message}
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

export default HospitalRating;
