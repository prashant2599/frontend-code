"use client";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import LoginPopUp from "@/app/Home/LoginPopUp/LoginPopUp";
import Success from "@/app/Home/successPopup/Success";
import ErrorPopup from "@/app/Home/successPopup/ErrorPopup";

const UserLikeComment = ({ url, questionId, totalLike }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setLoggedIn(true);
    }
  }, []);

  const handleLikeClick = () => {
    if (!loggedIn) {
      setShowLoginPopup(true);
    } else {
      // Change the like status
      setIsLiked(!isLiked);

      // Send a POST request to your server
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/heartpost`, {
          heart: 1,
          id: questionId,
        })
        .then((response) => {
          setShowSuccessPopup(true);
        })
        .catch((error) => {
          setShowErrorPopup(true);
          console.error("Error liking post:", error);
        });
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };
  const message = "Liked";
  const desc =
    "Thank you! Your Like has been successfully submitted. Your input is highly valuable to us.";
  return (
    <>
      <button className="comments-iconbox" onClick={handleLikeClick}>
        <i>
          <FaHeart
            style={{
              fontSize: "20px",
              color: totalLike !== null ? "#ff6800" : "",
            }}
          />
        </i>
        {totalLike} Helpful
      </button>
      {showLoginPopup && (
        <LoginPopUp
          onClose={handleCloseLoginPopup}
          showLoginPopup={showLoginPopup}
          url={url}
        />
      )}
      {showSuccessPopup && (
        <Success
          onClose={handleCloseSuccessPopup}
          showSuccessPopup={showSuccessPopup}
          message={message}
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

export default UserLikeComment;
