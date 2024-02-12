"use client";

import React, { useState, useRef } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import { TbShare2 } from "react-icons/tb";
import CustomTwitter from "@/app/Home/CustomTwitterIcon/CustomTwitter";

const ShareBlog = ({ slug }) => {
  const [sharedblogSlug, setSharedblogSlug] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupStyle = {
    display: isPopupOpen ? "block" : "none",
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const shareblogProfile = (doctorSlug) => {
    setSharedblogSlug(doctorSlug);
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
  return (
    <>
      <div
        style={{ marginLeft: "auto", cursor: "pointer" }}
        className="blog-share-mobile"
        onClick={() => shareblogProfile(slug)}
      >
        <div className="blog-share">
          <p className="blog-share-text">Share </p>{" "}
          <TbShare2 style={{ fontSize: "24px", color: "#ff6800" }} />
        </div>
      </div>
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
              <p>Share this Blog with others via.</p>
              <ul>
                <li>
                  <FacebookShareButton
                    url={`${window.location.origin}/blog/${sharedblogSlug}`}
                  >
                    <FacebookIcon size={50} round />
                  </FacebookShareButton>
                </li>
                <li style={{ width: "auto" }}>
                  <TwitterShareButton
                    url={`${window.location.origin}/blog/${sharedblogSlug}`}
                  >
                    <CustomTwitter />
                  </TwitterShareButton>
                </li>
                <li>
                  <WhatsappShareButton
                    url={`${window.location.origin}/blog/${sharedblogSlug}`}
                  >
                    <WhatsappIcon size={50} round />
                  </WhatsappShareButton>
                </li>
              </ul>

              <div className="share-link">
                <input
                  type="text"
                  name="name"
                  required=""
                  value={`${window.location.origin}/blog/${sharedblogSlug}`}
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
          <div id="copyPopup" className="copy-popup">
            Copied to Clipboard
          </div>
        </div>
      )}
    </>
  );
};

export default ShareBlog;
