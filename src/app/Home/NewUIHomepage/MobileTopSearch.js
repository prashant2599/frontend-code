"use client";
import React, { useState } from "react";
import HeaderSearch from "../Inc/HeaderSearch";

const MobileTopSearch = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };
  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
  };
  return (
    <>
      <section id="world-search">
        <div className="world-search" data-popup-open="popup-17">
          <input
            type="text"
            placeholder="Search"
            name="name"
            onClick={togglePopup}
          />
        </div>
      </section>

      <div
        className="popup world-search-box"
        data-popup="popup-17"
        style={popupStyle}
      >
        <div className="popup-inner17">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="popup-close"
                data-popup-close="popup-17"
                data-dismiss="modal"
                onClick={togglePopup}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <h2>Search</h2>
            {/* <div className="loc-search-popup">
              <input type="text" placeholder="Delhi" name="name" />
            </div> */}

            <div className="world-search-popup">
              {/* <input type="text" placeholder="Search Medflick" name="name" />
              <div className="searchbox-medf">
                <div className="searchbox-main">
                  <img src="logo-icon.png" /> Search Medflick
                </div>
                <div className="searchbox-main">
                  <img src="logo-icon.png" /> Search Medflick
                </div>
                <div className="searchbox-main">
                  <img src="logo-icon.png" /> Search Medflick
                </div>
                <div className="searchbox-main">
                  <img src="logo-icon.png" /> Search Medflick
                </div>
                <div className="searchbox-main">
                  <img src="logo-icon.png" /> Search Medflick
                </div>
                <div className="searchbox-main">
                  <img src="logo-icon.png" /> Search Medflick
                </div>
                <div className="searchbox-main">
                  <img src="logo-icon.png" /> Search Medflick
                </div>
              </div> */}
              <HeaderSearch />
            </div>
            {/* <HeaderSearch /> */}
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default MobileTopSearch;
