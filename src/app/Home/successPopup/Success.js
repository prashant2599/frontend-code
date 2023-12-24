import React from "react";

const Success = ({ onClose,showSuccessPopup,message }) => {
  const defaultMessage = "Form submitted successfully!";

  return (
    <>
      <div className="popup" data-popup="popup-6" style={{ display: showSuccessPopup ? "block" : "none" }}>
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
                <span aria-hidden="true" >×</span>
              </button>
            </div>

            <div className="success-message">
              <img src="/images/success.png" />
              <h4>{message || defaultMessage}</h4>
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
