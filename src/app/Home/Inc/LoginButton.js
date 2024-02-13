"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeaderSearch from "./HeaderSearch";
import { useUser } from "@/app/UserContext";
import { useRouter } from "next/navigation";
import HeaderPopup from "../QaForm/HeaderPopup";
import Script from "next/script";

const LoginButton = () => {
  const router = useRouter();
  //  for login user

  const [userNames, setUserNames] = useState("");
  const { userName, setUserName } = useUser();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserNames(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    // Remove 'userName' from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");

    // Clear the user name in the component state
    setUserNames("");
    setUserName("");
    window.location.reload();
  };
  const [isActive, setIsActive] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  // Step 5: Include the external script using useEffect

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
  //   script.defer = true;
  //   document.body.appendChild(script);

  //   // Ensure that the script is loaded before attempting to change the language
  //   script.onload = () => {
  //     // Change the language using the global gtranslateSettings object
  //     if (window.gtranslateSettings) {
  //       window.gtranslateSettings.default_language = selectedLanguage;
  //     }
  //   };

  //   return () => {
  //     // Clean up: remove the script when the component unmounts
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false,
  //     },
  //     "google_translate_element"
  //   );
  // };

  // useEffect(() => {
  //   // Check if the selected language is stored in session storage
  //   const selectedLanguage = sessionStorage.getItem("selectedLanguage");

  //   // If a language is stored, set it as the page language
  //   if (selectedLanguage) {
  //     window.googleTranslateElementInit = () => {
  //       googleTranslateElementInit();
  //       // Set the selected language
  //       window.google.translate.TranslateElement(
  //         { pageLanguage: selectedLanguage },
  //         "google_translate_element"
  //       );
  //     };
  //   } else {
  //     // Otherwise, initialize Google Translate with default settings
  //     window.googleTranslateElementInit = googleTranslateElementInit;
  //   }

  //   // Add Google Translate script dynamically
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //   );
  //   document.body.appendChild(addScript);

  //   // Function to handle language selection
  //   const handleLanguageChange = (event) => {
  //     const selectedLanguage = event.target.value;
  //     // Store the selected language in session storage
  //     sessionStorage.setItem("selectedLanguage", selectedLanguage);
  //     // Reload the page to apply the language change
  //     window.location.reload();
  //   };

  //   // Add event listener to language selector
  //   const languageSelector = document.getElementById("language_selector");
  //   if (languageSelector) {
  //     languageSelector.addEventListener("change", handleLanguageChange);
  //   }
  // }, []);

  return (
    <>
      <div className="navbar__buttons">
        {/* {userName ? (
          <>
            <Link href="/patient-dashboard" className="navbar__buttons-login">
              {userName}
            </Link>
            <span onClick={handleLogout}>Logout</span>
          </>
        ) : (
          <Link className="navbar__buttons-login" href="/login">
            Log In
          </Link>
        )} */}

        {userName || userNames ? (
          <div className="action">
            <div className="profile" onClick={toggleMenu}>
              <img
                src="/images/userIcon.png"
                style={{ width: "46px", marginTop: "10px", cursor: "pointer" }}
              />
            </div>
            <div className={`menu ${isActive ? "active" : ""}`}>
              <ul>
                <li>
                  <img src="/images/dashboard.png" />
                  <Link
                    href="/patient-dashboard"
                    onClick={() => {
                      toggleMenu(); // Close the offcanvas
                      router.push("/patient-dashboard"); // Navigate to the link
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <img src="/images/profile.png" />
                  <Link
                    href="/patient-account"
                    onClick={() => {
                      toggleMenu(); // Close the offcanvas
                      router.push("/patient-account"); // Navigate to the link
                    }}
                  >
                    View profile
                  </Link>
                </li>
                <li>
                  <img src="/images/logout.png" />
                  <a href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link className="navbar__buttons-login" href="/login">
            Log In
          </Link>
        )}
        {/* <div
          // value={selectedLanguage}
          // onChange={handleLanguageChange}
          label="Select Language"
          className="gtranslate_wrapper most-recent"
        ></div> */}
        {/* <div
          label="Select Language"
          className="gtranslate_wrapper most-recent"
        ></div> */}
        {/* <div id="google_translate_element"></div> */}

        <HeaderSearch />

        {/* <Link className="qsk-question" href="/question-answer">
          Ask FREE Question <img src="/images/whiteArrow.png" alt="icon" />
        </Link> */}
        <HeaderPopup />
      </div>
      {/* <Script src="https://cdn.gtranslate.net/widgets/latest/dropdown.js"></Script> */}
    </>
  );
};

export default LoginButton;
