import React from "react";

const Success = ({ onClose, showSuccessPopup, message, desc }) => {
  const defaultMessage = "Details Submitted";

  return (
    <>
      <div
        className="popup"
        data-popup="popup-6"
        style={{ display: showSuccessPopup ? "block" : "none" }}
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
              >
                <span aria-hidden="true" style={{ color: "#fff" }}>
                  ×
                </span>
              </button>
            </div>

            <div className="success-message">
              <img src="/images/success.png" />
              <h4>{message || defaultMessage}</h4>
              {desc ? <p>{desc}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
