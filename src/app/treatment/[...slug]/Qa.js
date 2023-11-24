import Link from "next/link";

const Qa = ({ qa }) => {
  const shouldRenderSection = qa.length > 0;
  return (
    <>
      {shouldRenderSection && (
        <section id="health-queries">
          <div className="midbox-inner  wiki-mk">
            <div className="queries-head">
              <div className="querieshead-left">
                <h2>Get answers to Health Queries</h2>
                <p>
                  Timely Information for Informed Choices. Ask health questions,
                  receive expert answers. Empowering you with the insights to
                  make informed health decisions.
                </p>
              </div>
              <div className="querieshead-right">
                <Link href="/question-answer" className="queries-ask">
                  Ask FREE Question{" "}
                  <img src="/images/2023/01/arrow-w.png" alt="icon" />
                </Link>
              </div>
            </div>

            <div className="healthcare-professionals">
              {Array.isArray(qa) ? (
                qa.map((e) => (
                  <div className="professionals" key={e.id}>
                    <div className="professionals-box">
                      <img src="/images/2023/01/icon-m.png" alt={e.name} />
                      <div className="question-box">{e.short_description}</div>
                      <div
                        className="question-ans"
                        dangerouslySetInnerHTML={{ __html: e.long_description }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>qa is not an array</p>
              )}

              <div className="professionals treatmen-query">
                <div className="homeform-left">
                  <div className="home-form">
                    <div className="homequery">
                      <label>Your Query</label>
                      <textarea
                        className="magbox"
                        type="textarea"
                        name="query"
                        placeholder=""
                        rows="2"
                      ></textarea>
                    </div>
                  </div>

                  <div className="home-form">
                    <div className="inputbox1">
                      <label>Age</label>
                      <input
                        type="text"
                        placeholder=""
                        name="name"
                        required=""
                      />
                    </div>
                    <div className="inputbox1">
                      <label>Gender</label>
                      <input
                        type="text"
                        placeholder=""
                        name="name"
                        required=""
                      />
                    </div>
                  </div>

                  <div className="home-form">
                    <button type="submit" name="en" className="home-button">
                      {" "}
                      Submit Now{" "}
                      <img src="/images/2023/01/arrow-c.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Qa;
