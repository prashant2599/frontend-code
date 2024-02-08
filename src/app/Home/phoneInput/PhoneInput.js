// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import intlTelInput from "intl-tel-input";
// import "intl-tel-input/build/css/intlTelInput.css";

// const PhoneInput = ({
//   onChange,
//   onBlur,
//   onPhoneCodeChange,
//   isPopupOpen,
//   handlePhoneBlur,
//   shouldFocusInput,
// }) => {
//   const inputRef = useRef(null);

//   const [phone, setPhone] = useState("");
//   const [pcode, setPcode] = useState("");

//   //   useEffect(() => {
//   //     if (inputRef.current) {
//   //       const itiInstance = intlTelInput(inputRef.current, {
//   //         initialCountry: "in",
//   //         separateDialCode: true,
//   //       });
//   //       itiInstance.setCountry("in");
//   //       itiInstance.events.on("countrychange", () => {
//   //         const selectedCountryData = itiInstance.getSelectedCountryData();
//   //         setPcode(selectedCountryData.dialCode);
//   //         onPhoneCodeChange && onPhoneCodeChange(selectedCountryData.dialCode);
//   //       });
//   //       return () => {
//   //         itiInstance.destroy();
//   //       };
//   //     }
//   //   }, [onPhoneCodeChange]);

//   const [formErrors, setFormErrors] = useState({
//     phone: "",
//   });
//   const Formstyles = {
//     errorInput: {
//       border: "2px solid red",
//     },
//     errorMessage: {
//       color: "red",
//       fontSize: "0.85rem",
//       marginTop: "0.25rem",
//     },
//     loadingMessage: {
//       fontSize: "1.2rem",
//       color: "#333",
//       marginTop: "1rem",
//     },
//   };

//   useEffect(() => {
//     if (isPopupOpen) {
//       const inputElement = inputRef.current;

//       if (!inputElement) {
//         console.error("Input element is null or undefined");
//         return;
//       }

//       const iti = intlTelInput(inputElement, {
//         initialCountry: "in",
//         separateDialCode: true,
//       });

//       inputElement.addEventListener("countrychange", () => {
//         const selectedCountryData = iti.getSelectedCountryData();
//         onPhoneCodeChange && onPhoneCodeChange(selectedCountryData.dialCode);
//       });

//       return () => {
//         iti.destroy();
//       };
//     }
//   }, [isPopupOpen, onPhoneCodeChange]);
//   useEffect(() => {
//     if (inputRef.current && shouldFocusInput.current) {
//       inputRef.current.focus();
//       // Reset shouldFocusInput to false after focusing once
//       shouldFocusInput.current = false;
//     }
//   }, [phone, shouldFocusInput]);

//   const handlePhoneNumberChange = (e) => {
//     const formattedPhoneNumber = e.target.value.replace(/\D/g, "");

//     // Perform phone number validation on write
//     if (formattedPhoneNumber.length !== 10) {
//       setFormErrors({ phone: "Please enter a valid Phone number." });
//     } else {
//       setFormErrors({});
//     }
//     setPhone(formattedPhoneNumber);
//     onChange && onChange(formattedPhoneNumber);
//   };
//   const phoneRegex = /^\d{10}$/;

//   //   const handlePhoneBlur = () => {
//   //     if (!phone || !phone.match(phoneRegex)) {
//   //       setFormErrors((prevErrors) => ({
//   //         ...prevErrors,
//   //         phone: "Please enter a valid Phone number",
//   //       }));
//   //       // Set shouldFocusInput to true when there's an error
//   //       shouldFocusInput.current = true;
//   //     } else {
//   //       setFormErrors((prevErrors) => ({
//   //         ...prevErrors,
//   //         phone: "",
//   //       }));
//   //     }
//   //   };
//   const renderError = (error) =>
//     error && <div className="error-message">{error}</div>;

//   return (
//     <div className="inputbox">
//       <input
//         ref={inputRef}
//         type="tel"
//         id="mobileode"
//         placeholder="Phone"
//         value={phone}
//         onChange={handlePhoneNumberChange}
//         onBlur={handlePhoneBlur}
//         style={formErrors.phone ? { border: "1px solid red" } : {}}
//       />
//       {/* {formErrors.phone && (
//         <span style={{ color: "red", fontSize: "14px" }}>
//           {formErrors.phone}
//         </span>
//       )} */}

//       {/* {renderError(formErrors.phone)} */}
//     </div>
//   );
// };

// export default PhoneInput;
