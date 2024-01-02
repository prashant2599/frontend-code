"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";

const PatientDetails = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;

    // Initialize intlTelInput with your options
    const iti = intlTelInput(inputElement, {
      initialCountry: "in",
      separateDialCode: true,
      // utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js',
    });

    // Add an event listener to handle changes
    inputElement.addEventListener("countrychange", () => {
      const selectedCountryData = iti.getSelectedCountryData();
      setPcode1(selectedCountryData.dialCode);
    });

    // Clean up the plugin when the component unmounts
    return () => {
      iti.destroy();
    };
  }, []);
  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setPhone1(formattedPhoneNumber); // Update the phone number state
  };

  return (
    <>
      <section id="request-quote-section">
        <div className="midbox-inner wiki-mk">
          <div className="top-back">
            <Link href="/patient-select">
              <img src="images/2023/01/back-icon.png" /> Back
            </Link>
            <div className="barbox">
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Select Medical Problem
              </div>
              <div className="barbox-bar">
                <img src="images/selectedImg.png" /> Select Doctor &amp;
                Hospital
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/3.png" /> Patient Details
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Upload Medical Report
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Get Quotes
              </div>
            </div>
          </div>

          <div className="request-quote">
            <div className="get-help-box">
              <h1>Please enter patient’s contact details</h1>
              <h1>
                <div className="query-form">
                  <div className="treatmentPatient-right">
                    <div className="treatmentPatient-form">
                      <div className="inputbox">
                        <label>Full Name</label>
                        <input
                          type="text"
                          placeholder=""
                          name="name"
                          required=""
                        />
                      </div>
                    </div>

                    <div className="treatmentPatient-form">
                      <div className="inputbox">
                        <label>Phone</label>
                        <input
                          ref={inputRef}
                          type="tel"
                          id="mobile_code"
                          placeholder=""
                          // value={phone1}
                          onChange={handlePhoneNumberChange}
                          // onBlur={handlePhoneBlur}
                          // style={formErrors.phone ? Formstyles.errorInput : {}}
                        />
                        {/* {renderError(formErrors.phone)} */}
                      </div>
                    </div>

                    <div className="treatmentPatient-form">
                      <div className="inputbox">
                        <label>Email Address</label>
                        <input
                          type="text"
                          placeholder=""
                          name="name"
                          required=""
                        />
                      </div>
                    </div>

                    <div className="treatmentPatient-form">
                      <div className="inputbox">
                        <label>UHID</label>
                        <input
                          type="text"
                          placeholder=""
                          name="name"
                          required=""
                        />
                      </div>
                    </div>

                    <div className="treatmentPatient-form">
                      <div className="inputbox">
                        <label>Gender</label>
                        <input
                          type="text"
                          placeholder=""
                          name="name"
                          required=""
                        />
                      </div>
                    </div>

                    <div className="treatmentPatient-form">
                      <div className="inputbox">
                        <label>Passport Number</label>
                        <input
                          type="text"
                          placeholder=""
                          name="name"
                          required=""
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      name="en"
                      data-popup-open="popup-6"
                      className="home-button"
                      fdprocessedid="mhccan"
                    >
                      {" "}
                      Continue
                    </button>
                  </div>
                </div>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PatientDetails;
