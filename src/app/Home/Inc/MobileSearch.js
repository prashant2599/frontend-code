"use client";
import { useState, useEffect } from "react";
import HeaderSearch from "./HeaderSearch";

const MobileSearch = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
  };

  return (
    <>
      <div className="m-searchbox" onClick={togglePopup}>
        <a href="#" data-popup-open="popup-7">
          <img src="/images/search-icon.png" alt="search-icon" />
        </a>
      </div>
      <div className="popup" data-popup="popup-7" style={popupStyle}>
        <div className="popup-inner7">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="popup-close"
                data-popup-close="popup-7"
                data-dismiss="modal"
                onClick={togglePopup}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <h2>Search</h2>
            <HeaderSearch togglePopup={togglePopup} />
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default MobileSearch;
