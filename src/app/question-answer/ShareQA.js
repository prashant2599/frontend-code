"use client";

import { IoIosShareAlt } from "react-icons/io";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { useState, useRef } from "react";

const ShareQA = () => {
  const [isPopupOpenShare, setIsPopupOpenShare] = useState(false);

  const inputRef = useRef(null);

  const copyToClipboard = () => {
    // Select the text inside the input field
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Deselect the text
    inputRef.current.setSelectionRange(0, 0);
  };

  const togglePopupShare = () => {
    setIsPopupOpenShare(!isPopupOpenShare);
  };
  const popupStyleShare = {
    display: isPopupOpenShare ? "block" : "none",
  };
  return (
    <>
      <span
        className="ask-comments"
        onClick={togglePopupShare}
        style={{ cursor: "pointer" }}
      >
        <i>
          <IoIosShareAlt />
        </i>{" "}
        Share
      </span>
      {isPopupOpenShare && (
        <div className="popup" data-popup="popup-3" style={popupStyleShare}>
          <div className="popup-inner3">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="popup-close"
                  data-popup-close="popup-3"
                  data-dismiss="modal"
                  onClick={togglePopupShare}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <h2>Share Link</h2>
              <p>Share this hospital with others via...</p>
              <ul>
                <li>
                  <FacebookShareButton
                    url={`${window.location.origin}/question-answer`}
                  >
                    <FacebookIcon size={50} round />
                  </FacebookShareButton>
                </li>
                <li>
                  <TwitterShareButton
                    url={`${window.location.origin}/question-answer`}
                  >
                    <TwitterIcon size={50} round />
                  </TwitterShareButton>
                </li>
                <li>
                  <WhatsappShareButton
                    url={`${window.location.origin}/question-answer`}
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
                  value={`${window.location.origin}/question-answer`}
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
        </div>
      )}
    </>
  );
};

export default ShareQA;
