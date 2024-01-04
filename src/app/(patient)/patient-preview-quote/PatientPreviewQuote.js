import React from "react";

const PatientPreviewQuote = () => {
  return (
    <>
      <section id="request-quote-section">
        <div class="midbox-inner wiki-mk">
          <div class="top-back">
            <a href="#">
              <img src="images/2023/01/back-icon.png" /> Back
            </a>

            <div className="barbox">
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Select Medical Problem
              </div>
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Select Doctor &amp;
                Hospital
              </div>
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Patient Details
              </div>
              <div className="barbox-bar">
                <img src="/images/selectedImg.png" /> Upload Medical Report
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/3.png" /> Get Quotes
              </div>
            </div>
          </div>

          <div class="hospital-doctor-box">
            <h1>Preview</h1>

            <div class="preview-section">
              <div class="preview-left-box">
                <h3>Medical Condition</h3>

                <div class="medical-condition-preview">
                  <div class="condition-preview-box">
                    <img src="images/2023/01/03/1.png" /> Heart Transplant
                  </div>
                  <div class="condition-preview-box">
                    <img src="images/2023/01/03/1.png" /> Heart Transplant
                  </div>
                </div>

                <h3>Hospital and Doctor</h3>

                <div class="hospital-doctors-preview">
                  <div class="hospital-preview-box">
                    <div class="hospital-preview-img">
                      <img src="images/2023/01/1.jpg" />
                    </div>
                    <div class="hospital-preview-doc">
                      <h3>Hospital Name</h3>
                      <div class="department-sub">Greams Road, Chennai</div>
                      <div class="rating-star">
                        <i class="fa fa-star"></i> 5 (523)
                      </div>
                      <div class="ho-docimg">
                        <img src="images/2023/01/04/1.jpg" />
                        <img src="images/2023/01/04/2.jpg" />
                        <img src="images/2023/01/04/3.jpg" />
                      </div>
                    </div>
                  </div>

                  <div class="doctors-preview-box">
                    <div class="doctor-preview-img">
                      <img src="images/2023/02/1.jpg" />
                    </div>
                    <div class="doctor-preview-doc">
                      <h3>Doctor Name</h3>
                      <div class="department-sub">
                        Oncologist, Medical Oncologist
                      </div>
                      <div class="rating-star">
                        <i class="fa fa-star"></i> 5 (523)
                      </div>
                      <div class="doc-experience">
                        <div class="years-exper">5 Years of Experience </div>
                        <div class="successful-plus">
                          500+ Successful Surgeries{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="preview-right-box">
                <div class="preview-details">
                  <h5>Full Name</h5> <span>Dinesh Bhagat</span>
                </div>
                <div class="preview-details">
                  <h5>Email</h5> <span>dinesh23@gmail.com</span>
                </div>
                <div class="preview-details">
                  <h5>Phone Number</h5> <span>+91 1234567890</span>
                </div>
                <div class="preview-details">
                  <h5>UHID</h5> <span>ABCD123545QWR</span>
                </div>
                <div class="preview-details">
                  <h5>Gender</h5> <span>Male</span>
                </div>
                <div class="preview-details">
                  <h5>Passport Number</h5> <span>ABCD123545QWR</span>
                </div>
                <div class="preview-details">
                  <h5>Medical Reports</h5>
                </div>

                <div class="uploadedfile-box">uploadedfile.pdf</div>
                <div class="uploadedfile-box">uploadedfile.jpg</div>
              </div>
            </div>

            <div class="preview-continue-button">
              <a href="#" class="preview-continue">
                {" "}
                Continue
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PatientPreviewQuote;
