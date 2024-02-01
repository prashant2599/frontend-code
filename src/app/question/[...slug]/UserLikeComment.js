"use client";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import LoginPopUp from "@/app/Home/LoginPopUp/LoginPopUp";

const UserLikeComment = ({url}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    // Check if the userId is in local storage to determine if the user is logged in
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
        .post("/api/like", { postId: 1 })
        .then((response) => {
          // Handle success, if needed
          console.log("Like successful:", response.data);
        })
        .catch((error) => {
          // Handle error, if needed
          console.error("Error liking post:", error);
        });
    }
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };
  return (
    <>
      <button className="comments-iconbox" onClick={handleLikeClick}>
        <i>
          <FaHeart
            style={{ fontSize: "20px", color: isLiked ? "#ff6800" : "" }}
          />
        </i>
        Helpful
      </button>
      {showLoginPopup && (
        <LoginPopUp
          onClose={handleCloseLoginPopup}
          showLoginPopup={showLoginPopup}
          url={url}
        />
      )}
    </>
  );
};

export default UserLikeComment;
