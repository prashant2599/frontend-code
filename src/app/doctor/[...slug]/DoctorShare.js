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

const DoctorShare = ({ slug }) => {
  const [sharedDoctorSlug, setSharedDoctorSlug] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const shareDoctorProfile = (doctorSlug) => {
    setSharedDoctorSlug(doctorSlug);
    togglePopup();
  };

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
    setCopyMessage("Link copied!");
  };
  return (
    <>
      <button
        className="save-profile"
        onClick={() => shareDoctorProfile(slug)}
        style={{ cursor: "pointer" }}
      >
        Share Profile <img src="/images/2023/05/share-profile.png" alt="icon" />
      </button>
      {isPopupOpen && (
        <div className="popup" data-popup="popup-3" style={popupStyle}>
          <div className="popup-inner3">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="popup-close"
                  data-popup-close="popup-3"
                  data-dismiss="modal"
                  onClick={togglePopup}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <h2>Share Link</h2>
              <p>Share this Doctor with others via...</p>
              <ul>
                <li>
                  <FacebookShareButton
                    url={`${window.location.origin}/doctor/${sharedDoctorSlug}`}
                  >
                    <FacebookIcon size={50} round />
                  </FacebookShareButton>
                </li>
                <li>
                  <TwitterShareButton
                    url={`${window.location.origin}/doctor/${sharedDoctorSlug}`}
                  >
                    <CustomTwitter />
                  </TwitterShareButton>
                </li>
                <li>
                  <WhatsappShareButton
                    url={`${window.location.origin}/doctor/${sharedDoctorSlug}`}
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
                  value={`${window.location.origin}/doctor/${sharedDoctorSlug}`}
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
                {/* {copyMessage && <p>{copyMessage}</p>} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorShare;
