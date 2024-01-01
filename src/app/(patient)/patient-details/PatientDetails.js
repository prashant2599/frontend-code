import React from "react";

const PatientDetails = () => {
  return (
    <>
      <section id="request-quote-section">
        <div class="midbox-inner wiki-mk">
          <div class="top-back">
            <a href="request-quote.html">
              <img src="images/2023/01/back-icon.png" /> Back
            </a>
            <div class="barbox">
            <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Select Medical Problem
              </div>
              <div className="barbox-bar">
                <img src="images/selectedImg.png" /> Select Doctor &amp; Hospital
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

          <div class="request-quote">
            <div class="get-help-box">
              <h1>Please enter patient’s contact details</h1>
              <h1>
                <div class="query-form">
                  <div class="treatmentPatient-right">
                    <div class="treatment-form">
                      <div class="inputbox">
                        <label>Full Name</label>
                        <input
                          type="text"
                          placeholder=""
                          name="name"
                          required=""
                        />
                      </div>
                    </div>

                    <div class="treatment-form">
                      <div class="inputbox">
                        <label>Phone Number</label>
                        <div class="phone-form">
                          <div class="phone-box1"></div>
                          <div class="phone-box2">
                            <input
                              type="text"
                              placeholder=""
                              name="name"
                              required=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="treatment-form">
                      <div class="inputbox">
                        <label>Email Address</label>
                        <input
                          type="text"
                          placeholder=""
                          name="name"
                          required=""
                        />
                      </div>
                    </div>

                    <div class="treatment-form">
                      <div class="inputbox">
                        <label>UHID</label>
                        <input
                          type="text"
                          placeholder=""
                          name="name"
                          required=""
                        />
                      </div>
                    </div>

                    <div class="treatment-form">
                      <div class="inputbox">
                        <label>Gender</label>
                        <input
                          type="text"
                          placeholder=""
                          name="name"
                          required=""
                        />
                      </div>
                    </div>

                    <div class="treatment-form">
                      <div class="inputbox">
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
                      class="home-button"
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
