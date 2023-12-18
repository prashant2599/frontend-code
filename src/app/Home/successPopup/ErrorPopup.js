import React from "react";

const ErrorPopup = ({ onClose, showErrorPopup }) => {
  return (
    <>
      <div
        class="popup"
        data-popup="popup-6"
        style={{ display: showErrorPopup ? "block" : "none" }}
      >
        <div class="popup-inner6">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="popup-close"
                data-popup-close="popup-6"
                data-dismiss="modal"
                onClick={onClose}
                style={{ background: "red" }}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="success-message">
              <img src="/images/error.png" />
              <h4 style={{ color: "red" }}>Oops! Something went wrong.</h4>
              <p>
                We're sorry, but there was an error processing your submission.
                Please try again later
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPopup;
