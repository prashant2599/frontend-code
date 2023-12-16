import React from "react";

const Success = ({ onClose,showSuccessPopup }) => {
  return (
    <>
      <div class="popup" data-popup="popup-6" style={{ display: showSuccessPopup ? "block" : "none" }}>
        <div class="popup-inner6">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="popup-close"
                data-popup-close="popup-6"
                data-dismiss="modal"
                onClick={onClose}
              >
                <span aria-hidden="true" >×</span>
              </button>
            </div>

            <div class="success-message">
              <img src="/images/success.png" />
              <h4>Success Message</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
