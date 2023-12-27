"use client";
import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const QuoteReady = () => {
  const [hospital, setHospital] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
  });

  const [specialityId, setSpecialityId] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("speciality");
    if (storedUserName) {
      setSpecialityId(storedUserName);
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://dev.medflick.com/api/hospital/speciality/id/${specialityId}`
      )
      .then((response) => {
        setHospital(response.data.hospital_list.sp_hospital_list);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [specialityId]);

  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleContentClick = (contentNumber) => {
    setActiveQuestion(activeQuestion === contentNumber ? null : contentNumber); // Toggle content visibility
  };

  const pdfLinkRef = useRef(null);

  const handleDownloadClick = (pdfUrl) => {
    // Set the href attribute of the hidden anchor element
    pdfLinkRef.current.href = pdfUrl;

    // Simulate a click event on the anchor element to trigger the download
    pdfLinkRef.current.click();
  };

  return (
    <>
      <section id="request-quote-section">
        <div className="midbox-inner wiki-mk">
          <div className="top-back">
            <Link href="/patient-report">
              <img src="/images/2023/01/back-icon.png" alt="icon" /> Back
            </Link>
            <div className="barbox">
              {" "}
              <img src="/images/2023/01/bar-img2.png" alt="icon" />{" "}
            </div>
          </div>

          <div className="search-find-box">
            <h1>Your Quote is Ready</h1>

            <div className="hospitals-list">
              <div className="hospitals-list-left">
                <div className="hospitals-tab">
                  {hospital &&
                    hospital.map((e, index) => (
                      <button
                        className={`conditions ${
                          activeQuestion === e.id ? "active" : ""
                        }`}
                        onClick={() => handleContentClick(e.id)}
                        id="defaultOpen"
                        key={e.id}
                      >
                        <div className="hospital-item">
                          <div className="hospital-item-img">
                            <img
                              src={`https://dev.medflick.com/hospital/${e.image}`}
                              alt={e.slug}
                            />
                          </div>
                          <div className="hospital-item-doc">
                            <h3>{e.name}</h3>
                            {/* <div className="department-sub">
                                Oncologist, Medical Oncologist
                              </div> */}
                            <div className="rating-star">
                              <i className="fa fa-star"></i> 5 (523)
                            </div>

                            <div className="ho-docimg">
                              {e.nabl && (
                                <img
                                  src={`https://dev.medflick.com/hospital/${e.nabl}`}
                                  alt={e.name}
                                />
                              )}
                              {e.nabh && (
                                <img
                                  src={`https://dev.medflick.com/hospital/${e.nabh}`}
                                  alt={e.name}
                                />
                              )}
                              {e.jci && (
                                <img
                                  src={`https://dev.medflick.com/hospital/${e.jci}`}
                                  alt={e.name}
                                />
                              )}
                            </div>
                          </div>
                          <div className="hospital-item-button">
                            <div className="hos-no">
                              <strong>Doctors:</strong> {e.doc}
                            </div>
                            <div className="hos-no">
                              <strong>Beds:</strong> {e.bed}
                            </div>
                            <div className="hos-no">
                              <strong>Ambulances:</strong> {e.ambulance}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              <div className="hospitals-tab1">
                {hospital &&
                  hospital.map((e, index) => (
                    <button
                      className={`conditions ${
                        activeQuestion === e.id ? "active" : ""
                      }`}
                      onClick={() => handleContentClick(e.id)}
                      id="defaultOpen"
                      key={e.id}
                    >
                      <div className="hospital-item">
                        <div className="hospital-item-img">
                          <img
                            src={`https://dev.medflick.com/hospital/${e.image}`}
                            alt={e.slug}
                          />
                        </div>
                        <div className="hospital-item-doc">
                          <h3>{e.name}</h3>
                          {/* <div className="department-sub">
                                Oncologist, Medical Oncologist
                              </div> */}
                          <div className="rating-star">
                            <i className="fa fa-star"></i> 5 (523)
                          </div>

                          <div className="ho-docimg">
                            {e.nabl && (
                              <img
                                src={`https://dev.medflick.com/hospital/${e.nabl}`}
                                alt={e.name}
                              />
                            )}
                            {e.nabh && (
                              <img
                                src={`https://dev.medflick.com/hospital/${e.nabh}`}
                                alt={e.name}
                              />
                            )}
                            {e.jci && (
                              <img
                                src={`https://dev.medflick.com/hospital/${e.jci}`}
                                alt={e.name}
                              />
                            )}
                          </div>
                        </div>
                        <div className="hospital-item-button">
                          <div className="hos-no">
                            <strong>Doctors:</strong> {e.doc}
                          </div>
                          <div className="hos-no">
                            <strong>Beds:</strong> {e.bed}
                          </div>
                          <div className="hos-no">
                            <strong>Ambulances:</strong> {e.ambulance}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
              <div className="hospitals-quote-ready" style={{ height: "650px" }}>
                {hospital &&
                  hospital.map((e) => (
                    <div
                      id="packages1"
                      className={`conditionsbox ${
                        activeQuestion === e.id ? "active" : ""
                      }`}
                      key={e.id}
                    >
                      <iframe
                        title="PDF Viewer"
                        src={`https://dev.medflick.com/hospital/${e.hospital_quote}`}
                        width="627px"
                        height="100%"
                        id="packages1"
                      ></iframe>
                      <div className="free-quote1">
                        <a href="#/" className="request-free-quote">
                          {" "}
                          Connect with Us
                        </a>
                        <span
                          className="download-quote"
                          onClick={() =>
                            handleDownloadClick(
                              `https://dev.medflick.com/hospital/${e.hospital_quote}`
                            )
                          }
                        >
                          {" "}
                          Download Quote
                        </span>
                        <a
                          ref={pdfLinkRef}
                          style={{ display: "none" }}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          Download PDF
                        </a>
                      </div>
                    
                    </div>
                  ))}

            
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-assistance">
        <div className="midbox-inner wiki-mk">
          <ul>
            <li>
              <h3>Need Assistance?</h3>
              <p>Can’t find what you’re looking for? Let up help</p>
              <a href="#/" className="get-help">
                {" "}
                Get Help
              </a>
            </li>
            <li>
              <h3>Need Assistance?</h3>
              <p>Can’t find what you’re looking for? Let up help</p>
              <a href="#/" className="get-help">
                {" "}
                Get Help
              </a>
            </li>
            <li>
              <h3>Need Assistance?</h3>
              <p>Can’t find what you’re looking for? Let up help</p>
              <a href="#/" className="get-help">
                {" "}
                Get Help
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default QuoteReady;
