"use client";
import { useState, useEffect } from "react";
import getAllSpeciality from "@/app/lib/getAllSpeciality";

const NewFaq = () => {
  const faqData = [
    {
      id: 1,
      short_description:
        "How can I get a second opinion and communicate with medical professionals on Medflick?",
      long_description:
        "Certainly! You can consult our doctors for an expert opinion on your diagnosis and treatment by booking an online consultation and sharing your medical history. Additionally, Medflick encourages user participation and interaction through forums, allowing you to share stories, ask questions, and learn from others who have faced similar health challenges—creating a platform that promotes information exchange and community assistance.",
    },
    {
      id: 2,
      short_description:
        "What medical specializations does Medflick provide coverage for?",
      long_description:
        "Medical disciplines covered by Medflick include Bone Marrow Transplant, Cancer/Oncology, Cardiac Sciences, IVF, Neurosurgery, Spine Surgery & Spinal Cord Damage, Plastic Surgery, and Rehabilitation. We attempt to give trustworthy information on a wide range of medical disorders and treatment choices.",
    },
    {
      id: 3,
      short_description: "Is Medflick available on all platforms?",
      long_description:
        "Yes, Medflick is intended to be used on a variety of devices. You can use your Desktop Computer, Laptop, Tablet, or Smartphone to access our platform, allowing you to study medical information and connect with the community whenever and wherever you want.",
    },
    {
      id: 4,
      short_description:
        "Can Medflick assist with my travel itinerary and visa for treatment in India?",
      long_description:
        "Certainly! To initiate your treatment planning with Medflick, book an online consultation and provide your medical history. Our dedicated team will assess the information and reach out to help plan your treatment, including assistance with travel itinerary and visa formalities.",
    },
    {
      id: 5,
      short_description: "Are the Hospitals or clinics accredited?",
      long_description:
        "Yes, the hospitals and clinics we are associated with are fully accredited, meeting either Indian (NABH) or International Standards (JCI) of healthcare quality and patient safety. These facilities consistently meet the stringent criteria set by the Quality Control of India (QCI), enhancing overall patient satisfaction by providing world-class treatment facilities.",
    },
  ];
  // const [faq, setFaq] = useState(faqData);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const result = await getAllSpeciality();
  //       setFaq(result.data.generalfaq);
  //       console.log(result.data.generalfaq);
  //     } catch (err) {
  //       console.log(err.message); // Set the error message in state
  //     }
  //   }

  //   fetchData();
  // }, []);

  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleQuestionClick = (id) => {
    if (activeQuestion === id) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(id);
    }
  };
  return (
    <>
      <section id="home-faqs">
        <div class="midbox-inner wiki-mk">
          <div class="faqs-section">
            <div class="faqs-left">
              <h2>Frequently Asked Questions</h2>
            </div>
            <div class="faqs-right">
              {faqData &&
                faqData.map((e, index) => (
                  <div
                    key={e.id}
                    className={`question ${
                      activeQuestion === index ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(index)}
                  >
                    <h5>{e.short_description}</h5>
                    <div
                      className={`arrow ${
                        activeQuestion === index ? "arrow-active" : ""
                      }`}
                    ></div>
                    {activeQuestion === index && (
                      <div className="answer" style={{ display: "block" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.long_description,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              {/* {faq &&
                faq.map((e, index) => (
                  <div
                    key={e.id}
                    className={`question ${
                      activeQuestion === index ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(index)}
                  >
                    <h5> Q. {e.short_description}</h5>
                    <div
                      className={`arrow ${
                        activeQuestion === index ? "arrow-active" : ""
                      }`}
                    ></div>
                    {activeQuestion === index && (
                      <div className="answer" style={{ display: "block" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.long_description,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              {faq &&
                faq.map((e) => (
                  <div
                    key={e.id}
                    className={`question ${
                      activeQuestion === e.short_description2 ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(e.short_description2)}
                  >
                    <h5> Q. {e.short_description2}</h5>
                    <div
                      className={`arrow ${
                        activeQuestion === e.short_description2
                          ? "arrow-active"
                          : ""
                      }`}
                    ></div>
                    {activeQuestion === e.short_description2 && (
                      <div className="answer" style={{ display: "block" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.long_description2,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              {faq &&
                faq.map((e) => (
                  <div
                    key={e.id}
                    className={`question ${
                      activeQuestion === e.short_description3 ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(e.short_description3)}
                  >
                    <h5> Q. {e.short_description3}</h5>
                    <div
                      className={`arrow ${
                        activeQuestion === e.short_description3
                          ? "arrow-active"
                          : ""
                      }`}
                    ></div>
                    {activeQuestion === e.short_description3 && (
                      <div className="answer" style={{ display: "block" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.long_description3,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}

              {faq &&
                faq.map((e) => (
                  <div
                    key={e.id}
                    className={`question ${
                      activeQuestion === e.short_description4 ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(e.short_description4)}
                  >
                    <h5> Q. {e.short_description4}</h5>
                    <div
                      className={`arrow ${
                        activeQuestion === e.short_description4
                          ? "arrow-active"
                          : ""
                      }`}
                    ></div>
                    {activeQuestion === e.short_description4 && (
                      <div className="answer" style={{ display: "block" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.long_description4,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}

              {faq &&
                faq.map((e) => (
                  <div
                    key={e.id}
                    className={`question ${
                      activeQuestion === e.short_description6 ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(e.short_description6)}
                  >
                    <h5> Q. {e.short_description6}</h5>
                    <div
                      className={`arrow ${
                        activeQuestion === e.short_description6
                          ? "arrow-active"
                          : ""
                      }`}
                    ></div>
                    {activeQuestion === e.short_description6 && (
                      <div className="answer" style={{ display: "block" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.long_description5,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              {faq &&
                faq.map((e) => (
                  <div
                    key={e.id}
                    className={`question ${
                      activeQuestion === e.short_description5 ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(e.short_description5)}
                  >
                    <h5> Q. {e.short_description5}</h5>
                    <div
                      className={`arrow ${
                        activeQuestion === e.short_description5
                          ? "arrow-active"
                          : ""
                      }`}
                    ></div>
                    {activeQuestion === e.short_description5 && (
                      <div className="answer" style={{ display: "block" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.long_description6,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}

              {faq &&
                faq.map((e) => (
                  <div
                    key={e.id}
                    className={`question ${
                      activeQuestion === e.short_description7 ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(e.short_description7)}
                  >
                    <h5> Q. {e.short_description7}</h5>
                    <div
                      className={`arrow ${
                        activeQuestion === e.short_description7
                          ? "arrow-active"
                          : ""
                      }`}
                    ></div>
                    {activeQuestion === e.short_description7 && (
                      <div className="answer" style={{ display: "block" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.long_description7,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}

              {faq &&
                faq.map((e) => (
                  <div
                    key={e.id}
                    className={`question ${
                      activeQuestion === e.short_description8 ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(e.short_description8)}
                  >
                    <h5> Q. {e.short_description8}</h5>
                    <div
                      className={`arrow ${
                        activeQuestion === e.short_description8
                          ? "arrow-active"
                          : ""
                      }`}
                    ></div>
                    {activeQuestion === e.short_description8 && (
                      <div className="answer" style={{ display: "block" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.long_description8,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}

              {faq && (
                <div>
                  {faq.map((e) => {
                    if (e.short_description9) {
                      return (
                        <div
                          key={e.id}
                          className={`question ${
                            activeQuestion === e.short_description9
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleQuestionClick(e.short_description9)
                          }
                        >
                          <h5> Q. {e.short_description9}</h5>
                          <div
                            className={`arrow ${
                              activeQuestion === e.short_description9
                                ? "arrow-active"
                                : ""
                            }`}
                          ></div>
                          {activeQuestion === e.short_description9 && (
                            <div
                              className="answer"
                              style={{ display: "block" }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: e.long_description9,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Return null or an empty fragment to hide the section
                      return null;
                    }
                  })}
                </div>
              )}
              {faq && (
                <div>
                  {faq.map((e) => {
                    if (e.short_description10) {
                      return (
                        <div
                          key={e.id}
                          className={`question ${
                            activeQuestion === e.short_description10
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleQuestionClick(e.short_description10)
                          }
                        >
                          <h5> Q. {e.short_description10}</h5>
                          <div
                            className={`arrow ${
                              activeQuestion === e.short_description10
                                ? "arrow-active"
                                : ""
                            }`}
                          ></div>
                          {activeQuestion === e.short_description10 && (
                            <div
                              className="answer"
                              style={{ display: "block" }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: e.long_description10,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Return null or an empty fragment to hide the section
                      return null;
                    }
                  })}
                </div>
              )}
              {faq && (
                <div>
                  {faq.map((e) => {
                    if (e.short_description11) {
                      return (
                        <div
                          key={e.id}
                          className={`question ${
                            activeQuestion === e.short_description11
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleQuestionClick(e.short_description11)
                          }
                        >
                          <h5> Q. {e.short_description11}</h5>
                          <div
                            className={`arrow ${
                              activeQuestion === e.short_description11
                                ? "arrow-active"
                                : ""
                            }`}
                          ></div>
                          {activeQuestion === e.short_description11 && (
                            <div
                              className="answer"
                              style={{ display: "block" }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: e.long_description11,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Return null or an empty fragment to hide the section
                      return null;
                    }
                  })}
                </div>
              )}
              {faq && (
                <div>
                  {faq.map((e) => {
                    if (e.short_description12) {
                      return (
                        <div
                          key={e.id}
                          className={`question ${
                            activeQuestion === e.short_description12
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleQuestionClick(e.short_description12)
                          }
                        >
                          <h5> Q. {e.short_description11}</h5>
                          <div
                            className={`arrow ${
                              activeQuestion === e.short_description12
                                ? "arrow-active"
                                : ""
                            }`}
                          ></div>
                          {activeQuestion === e.short_description12 && (
                            <div
                              className="answer"
                              style={{ display: "block" }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: e.long_description12,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Return null or an empty fragment to hide the section
                      return null;
                    }
                  })}
                </div>
              )}

              {faq && (
                <div>
                  {faq.map((e) => {
                    if (e.short_description13) {
                      return (
                        <div
                          key={e.id}
                          className={`question ${
                            activeQuestion === e.short_description13
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleQuestionClick(e.short_description13)
                          }
                        >
                          <h5> Q. {e.short_description11}</h5>
                          <div
                            className={`arrow ${
                              activeQuestion === e.short_description13
                                ? "arrow-active"
                                : ""
                            }`}
                          ></div>
                          {activeQuestion === e.short_description13 && (
                            <div
                              className="answer"
                              style={{ display: "block" }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: e.long_description13,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Return null or an empty fragment to hide the section
                      return null;
                    }
                  })}
                </div>
              )}

              {faq && (
                <div>
                  {faq.map((e) => {
                    if (e.short_description14) {
                      return (
                        <div
                          key={e.id}
                          className={`question ${
                            activeQuestion === e.short_description14
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleQuestionClick(e.short_description14)
                          }
                        >
                          <h5> Q. {e.short_description11}</h5>
                          <div
                            className={`arrow ${
                              activeQuestion === e.short_description14
                                ? "arrow-active"
                                : ""
                            }`}
                          ></div>
                          {activeQuestion === e.short_description14 && (
                            <div
                              className="answer"
                              style={{ display: "block" }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: e.long_description14,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Return null or an empty fragment to hide the section
                      return null;
                    }
                  })}
                </div>
              )}

              {faq && (
                <div>
                  {faq.map((e) => {
                    if (e.short_description15) {
                      return (
                        <div
                          key={e.id}
                          className={`question ${
                            activeQuestion === e.short_description15
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleQuestionClick(e.short_description15)
                          }
                        >
                          <h5> Q. {e.short_description11}</h5>
                          <div
                            className={`arrow ${
                              activeQuestion === e.short_description15
                                ? "arrow-active"
                                : ""
                            }`}
                          ></div>
                          {activeQuestion === e.short_description15 && (
                            <div
                              className="answer"
                              style={{ display: "block" }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: e.long_description15,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Return null or an empty fragment to hide the section
                      return null;
                    }
                  })}
                </div>
              )} */}

              {/* <div class="question">
                <h5>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore ?
                </h5>
                <div class="arrow"></div>
                <div class="answer">
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id es Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo con Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit
                  </p>
                </div>
              </div>

              <div class="question">
                <h5>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore ?
                </h5>
                <div class="arrow"></div>
                <div class="answer">
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id es Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo con Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewFaq;
