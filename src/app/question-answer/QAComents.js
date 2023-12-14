"use client";

import { FaComments } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QAComents = ({ Id, specialityId, subspecialityId, treatments }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [userId, setUserId] = useState([]);
  const [comment, setComment] = useState("");
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

  const handleClickComments = () => {
    if (!loggedIn) {
      // alert("Please login first.");
      toast.error("Please login first.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      setShowCommentInput(true);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create the data object to be sent in the API request
    const data = {
      qa_id: Id,
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
        // Handle the API response here if needed
        alert("Successful ");
        console.log(response);
        clearFormFields1();
        setShowCommentInput(false);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
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

  return (
    <>
      <span className="ask-comments" onClick={handleClickComments}>
        <i>
          <FaComments />
        </i>{" "}
        Comments
      </span>
      {showCommentInput && (
        <div>
          <form onSubmit={handleFormSubmit}>
            <div>
              <textarea
                placeholder="Enter your comment..."
                rows="4"
                cols="50"
                style={{ height: "auto" }}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              {" "}
              <button
                type="submit"
                name="en"
                className="home-button"
                disabled={isLoading1}
              >
                {" "}
                {isLoading1 ? (
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
                  "Submit"
                )}
                <img src="/images/2023/01/arrow-c.png" alt="arrow-Icon" />
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default QAComents;
