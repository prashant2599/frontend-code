"use client";
import { useState } from "react";

const TreatmentFaq = ({ faq }) => {
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
      <section id="faqs-home">
        <div className="midbox-inner  wiki-mk">
          <h2>
            Frequently asked <span>questions</span>
          </h2>

          {faq &&
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
                      dangerouslySetInnerHTML={{ __html: e.long_description }}
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
                      dangerouslySetInnerHTML={{ __html: e.long_description2 }}
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
                      dangerouslySetInnerHTML={{ __html: e.long_description3 }}
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
                      dangerouslySetInnerHTML={{ __html: e.long_description4 }}
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
                      dangerouslySetInnerHTML={{ __html: e.long_description5 }}
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
                      dangerouslySetInnerHTML={{ __html: e.long_description6 }}
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
                      dangerouslySetInnerHTML={{ __html: e.long_description7 }}
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
                      dangerouslySetInnerHTML={{ __html: e.long_description8 }}
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
                        activeQuestion === e.short_description9 ? "active" : ""
                      }`}
                      onClick={() => handleQuestionClick(e.short_description9)}
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
                        <div className="answer" style={{ display: "block" }}>
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
                        activeQuestion === e.short_description10 ? "active" : ""
                      }`}
                      onClick={() => handleQuestionClick(e.short_description10)}
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
                        <div className="answer" style={{ display: "block" }}>
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
                        activeQuestion === e.short_description11 ? "active" : ""
                      }`}
                      onClick={() => handleQuestionClick(e.short_description11)}
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
                        <div className="answer" style={{ display: "block" }}>
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
                        activeQuestion === e.short_description12 ? "active" : ""
                      }`}
                      onClick={() => handleQuestionClick(e.short_description12)}
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
                        <div className="answer" style={{ display: "block" }}>
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
                        activeQuestion === e.short_description13 ? "active" : ""
                      }`}
                      onClick={() => handleQuestionClick(e.short_description13)}
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
                        <div className="answer" style={{ display: "block" }}>
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
                        activeQuestion === e.short_description14 ? "active" : ""
                      }`}
                      onClick={() => handleQuestionClick(e.short_description14)}
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
                        <div className="answer" style={{ display: "block" }}>
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
                        activeQuestion === e.short_description15 ? "active" : ""
                      }`}
                      onClick={() => handleQuestionClick(e.short_description15)}
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
                        <div className="answer" style={{ display: "block" }}>
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
          )}
        </div>
      </section>
    </>
  );
};

export default TreatmentFaq;
