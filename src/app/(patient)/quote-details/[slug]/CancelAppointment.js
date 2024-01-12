"use client";
import { useState } from "react";
import axios from "axios";
import Success from "@/app/Home/successPopup/Success";
import ErrorPopup from "@/app/Home/successPopup/ErrorPopup";
import { useRouter } from "next/navigation";

const CancelAppointment = ({ id }) => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
  };

  const handleCancelAppointment = async (id) => {
    try {
      const patientId = localStorage.getItem("userId");
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/cancel_quote/${patientId}/${id}`;

      // Make the DELETE request
      const response = await axios.get(apiUrl);
      setIsPopupOpen(false);
      setShowSuccessPopup(true);

      setTimeout(() => {
        router.push("/patient-quote-list");
      }, 1000);

      console.log("Appointment canceled successfully");

      // You can also return the response if needed
      return response.data;
    } catch (error) {
      setShowErrorPopup(true);
      // Handle errors, e.g., show an error message or perform additional actions
      console.error("Error canceling appointment:", error);

      // Throw the error to be caught by the caller
      throw error;
    }
  };

  // In your component
  const handleCancelClick = async (id) => {
    try {
      const response = await handleCancelAppointment(id);
      // Handle the success response, e.g., show a success message
      console.log("Response from cancel appointment:", response);
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error("Error in cancel appointment:", error);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const desc = "Appointment canceled successfully";
  return (
    <>
      <a
        className="cancel-appointment"
        data-popup-open="popup-3"
        onClick={togglePopup}
        style={{ cursor: "pointer" }}
      >
        Cancel Appointment
      </a>
      <div class="popup" data-popup="popup-3" style={popupStyle}>
        <div class="popup-inner15">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="popup-close"
                data-popup-close="popup-3"
                data-dismiss="modal"
                onClick={togglePopup}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="dashboard-form">
              <h2> Confirm your decision </h2>

              <p>Are you sure you want to cancel this appointment?</p>

              <div class="confirm-button">
                <a class="view-cancel" onClick={togglePopup}>
                  {" "}
                  Cancel
                </a>
                <a
                  class="cancel-appointment-yes"
                  onClick={() => handleCancelClick(id)}
                >
                  {" "}
                  Yes, I’m Sure
                </a>
              </div>
            </div>
          </div>{" "}
        </div>{" "}
      </div>
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

export default CancelAppointment;
