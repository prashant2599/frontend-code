import React from "react";

const ErrorPopup = ({ onClose, showErrorPopup, errordesc, errorMessage }) => {
  const defaultMessage =
    "We're sorry, but there was an error processing your submission. Please try again later";

  const defaultP = "Oops! Something went wrong.";

  return (
    <>
      <div
        className="popup"
        data-popup="popup-6"
        style={{ display: showErrorPopup ? "block" : "none" }}
      >
        <div className="popup-inner6">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="popup-close"
                data-popup-close="popup-6"
                data-dismiss="modal"
                onClick={onClose}
                style={{ background: "red" }}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="success-message">
              <img src="/images/error.png" alt="error-icon" />
              <h4 style={{ color: "red" }}>{errorMessage || defaultP}</h4>
              <p>{errordesc || defaultMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPopup;
