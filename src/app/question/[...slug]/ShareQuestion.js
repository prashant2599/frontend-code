"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import { useState, useRef } from "react";
import CustomTwitter from "@/app/Home/CustomTwitterIcon/CustomTwitter";

const ShareQuestion = ({ desc, id }) => {
  const [isPopupOpenShare, setIsPopupOpenShare] = useState(false);

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

  const togglePopupShare = () => {
    setIsPopupOpenShare(!isPopupOpenShare);
  };
  const popupStyleShare = {
    display: isPopupOpenShare ? "block" : "none",
  };
  return (
    <>
      <button onClick={togglePopupShare} className="share-discussion">
        Share discussion
      </button>
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
              <p>Share this Q&A with others via.</p>
              <ul>
                <li>
                  <FacebookShareButton
                    url={`${
                      window.location.origin
                    }/question/${id}/${encodeURIComponent(
                      desc
                        .toLowerCase()
                        .replace(/[^\w\s]/g, "-")
                        .replace(/\s+/g, "-")
                        .replace(/-+$/, "")
                    )}`}
                  >
                    <FacebookIcon size={50} round />
                  </FacebookShareButton>
                </li>
                <li>
                  <TwitterShareButton
                    url={`${
                      window.location.origin
                    }/question/${id}/${encodeURIComponent(
                      desc
                        .toLowerCase()
                        .replace(/[^\w\s]/g, "-")
                        .replace(/\s+/g, "-")
                        .replace(/-+$/, "")
                    )}`}
                  >
                    <CustomTwitter />
                  </TwitterShareButton>
                </li>
                <li>
                  <WhatsappShareButton
                    url={`${
                      window.location.origin
                    }/question/${id}/${encodeURIComponent(
                      desc
                        .toLowerCase()
                        .replace(/[^\w\s]/g, "-")
                        .replace(/\s+/g, "-")
                        .replace(/-+$/, "")
                    )}`}
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
                  value={`${
                    window.location.origin
                  }/question/${id}/${encodeURIComponent(
                    desc
                      .toLowerCase()
                      .replace(/[^\w\s]/g, "-")
                      .replace(/\s+/g, "-")
                      .replace(/-+$/, "")
                  )}`}
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

export default ShareQuestion;
