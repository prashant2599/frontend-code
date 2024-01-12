"use client";
import { useState } from "react";

const CancelAppointment = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
  };
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
                <a href="#" class="cancel-appointment-yes">
                  {" "}
                  Yes, I’m Sure
                </a>
              </div>
            </div>
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default CancelAppointment;
