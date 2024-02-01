import Link from "next/link";

const SurePopup = ({ showSurePopup, onClose, sureDesc, Page }) => {
  return (
    <>
      <div
        className="popup"
        data-popup="popup-3"
        style={{ display: showSurePopup ? "block" : "none" }}
      >
        <div className="popup-inner15" style={{ maxWidth: "430px" }}>
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="popup-close"
                data-popup-close="popup-3"
                data-dismiss="modal"
                onClick={onClose}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="dashboard-form">
              {/* <h2>{sureMessage}</h2> */}

              <p>{sureDesc}</p>

              <div
                className="confirm-button"
                style={{ margin: "5px 0 0 0px" }}
              >
                {/* <a className="view-cancel" onClick={onClose}>
                  {" "}
                  Cancel
                </a> */}
                {Page === "signup" ? (
                  <Link className="view-cancel" href="/contact-us">
                    Contact-Us
                  </Link>
                ) : (
                  <Link className="view-cancel" href="/sign-up">
                    SignUp
                  </Link>
                )}
              </div>
            </div>
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default SurePopup;
