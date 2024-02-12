"use client";

import { useState, useRef } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import CustomTwitter from "@/app/Home/CustomTwitterIcon/CustomTwitter";

const HospitalShareProfile = ({ hospitalDetails }) => {
  const [sharedHospitalSlug, setSharedHospitalSlug] = useState("");
  const [sharedHospitalCountry, setSharedHospitalCountry] = useState("");

  const inputRef = useRef(null);
  const [copyMessage, setCopyMessage] = useState("");

  const copyToClipboard = () => {
    // Select the text inside the input field
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Deselect the text
    inputRef.current.setSelectionRange(0, 0);

    // Show the popup
    setCopyMessage("Link copied!");
    const popup = document.getElementById("copyPopup");
    popup.style.display = "block";
    popup.classList.add("popup-animation");

    // Hide the popup and remove the animation class after the animation is complete
    setTimeout(() => {
      popup.style.display = "none";
      popup.classList.remove("popup-animation");
    }, 1000); // Adjust the timeout based on your animation duration
  };

  const [isPopupOpen1, setIsPopupOpen1] = useState(false);

  const popupStyle1 = {
    display: isPopupOpen1 ? "block" : "none",
  };
  const togglePopup1 = () => {
    setIsPopupOpen1(!isPopupOpen1);
  };

  const shareHospitalProfile = (hospitalSlug, hospitalCountry) => {
    setSharedHospitalSlug(hospitalSlug);
    setSharedHospitalCountry(hospitalCountry);
    togglePopup1();
  };
  return (
    <>
      <button
        className="save-profile"
        onClick={() =>
          shareHospitalProfile(hospitalDetails.slug, hospitalDetails.country)
        }
        style={{ cursor: "pointer" }}
      >
        Share Profile <img src="/images/2023/05/share-profile.png" alt="icon" />
      </button>
      {isPopupOpen1 && (
        <div className="popup" data-popup="popup-3" style={popupStyle1}>
          <div className="popup-inner3">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="popup-close"
                  data-popup-close="popup-3"
                  data-dismiss="modal"
                  onClick={togglePopup1}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <h2>Share Link</h2>
              <p>Share this Hospital with others via.</p>
              <ul>
                <li>
                  <FacebookShareButton
                    url={`${window.location.origin}/hospital/${sharedHospitalSlug}`}
                  >
                    <FacebookIcon size={50} round />
                  </FacebookShareButton>
                </li>
                <li>
                  <TwitterShareButton
                    url={`${window.location.origin}/hospital/${sharedHospitalSlug}`}
                  >
                    <CustomTwitter />
                  </TwitterShareButton>
                </li>
                <li>
                  <WhatsappShareButton
                    url={`${window.location.origin}/hospital/${sharedHospitalSlug}`}
                  >
                    <WhatsappIcon size={50} round />
                  </WhatsappShareButton>
                </li>
              </ul>

              <div className="share-link">
                <input
                  type="text"
                  placeholder="www.medflick.com/share/hospital"
                  name="name"
                  required=""
                  value={`${window.location.origin}/hospital/${sharedHospitalSlug}`}
                  ref={inputRef}
                />
                <button
                  type="submit"
                  name="en"
                  className="copy-link"
                  onClick={copyToClipboard}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
          <div id="copyPopup" className="copy-popup">
            Copied to Clipboard
          </div>
        </div>
      )}
    </>
  );
};

export default HospitalShareProfile;
