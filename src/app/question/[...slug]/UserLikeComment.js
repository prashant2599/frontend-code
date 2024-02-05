"use client";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import LoginPopUp from "@/app/Home/LoginPopUp/LoginPopUp";
import Success from "@/app/Home/successPopup/Success";
import ErrorPopup from "@/app/Home/successPopup/ErrorPopup";

const UserLikeComment = ({ url, questionId, totalLike, combinedSlug }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchUpdatedData = async () => {
      try {
        // Fetch updated data after liking
        const updatedRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/question/${combinedSlug}`,
          { cache: "no-store" }
        );

        const updatedData = await updatedRes.json();
        const updatedInfo = updatedData.qadetails.qadetails;

        setUpdatedInfo(updatedData.qadetails.qadetails);
        // Handle the updated data as needed
        // ...
      } catch (error) {
        console.error("Error fetching updated question data:", error);
      }
    };
    fetchUpdatedData();
    // Call fetchUpdatedData when the component mounts or when specific dependencies change
    if (isLiked) {
      fetchUpdatedData();
    }
  }, [combinedSlug, isLiked]);

  const handleLikeClick = async () => {
    if (!loggedIn) {
      setShowLoginPopup(true);
    } else {
      try {
        // Change the like status
        setIsLiked(!isLiked);

        // Send a POST request to your server
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/heartpost`, {
          heart: 1,
          id: questionId,
        });

        // Make another API request
        // fetchUpdatedData();

        // Show success popup
        setShowSuccessPopup(true);
      } catch (error) {
        // Handle errors
        setShowErrorPopup(true);
        console.error("Error liking post:", error);
      }
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
  const desc = "Thank you! Your Like has been successfully submitted.";
  return (
    <>
      <button className="comments-iconbox" onClick={handleLikeClick}>
        <i>
          <FaHeart
            style={{
              fontSize: "20px",
              color: updatedInfo.heart !== null ? "#ff6800" : "",
            }}
          />
        </i>
        {updatedInfo.heart} Helpful
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
