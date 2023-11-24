import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaComments } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import PopForm from "../Home/QaForm/PopForm";

const loading = () => {
  return (
    <>
      {/* <div id="cover-spin"></div> */}
      <section id="questions-ans-section">
        <div className="midbox-inner wiki-mk">
          <div className="questions-ans">
            <div className="questions-ans-left">
              <div className="search-suestions">
                <h1>Search for Questions</h1>

                <div className="search-medflick">
                  <div className="search-box-medflick">
                    <span>Search Terms:</span>
                    <div className="search-terms">
                      <input
                        type="text"
                        placeholder="Search Medflick"
                        name="name"
                        required=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="search-question">
                <div className="search-question-left"></div>
                {/* <div className="search-question-right">
                  <span>Have any Questions?</span>
                  <span
                    className="ask-question"
                    data-popup-open="popup-2"
                    // onClick={togglePopup}
                    style={{ cursor: "pointer" }}
                  >
                    <img src="images/2023/07/ask.png" alt="" /> Ask Question
                  </span>
                </div> */}
                <PopForm />
              </div>
              <div className="comments-box">
                <h2>
                  <Skeleton />
                </h2>

                <Skeleton height="100px" />
                <div className="comments-button">
                  <span className="ask-comments">
                    <i>
                      <FaComments />
                    </i>{" "}
                    Comments
                  </span>
                  <span className="ask-comments" style={{ cursor: "pointer" }}>
                    <i>
                      <IoIosShareAlt />
                    </i>{" "}
                    Share
                  </span>
                </div>
              </div>
              <div className="comments-box">
                <h2>
                  <Skeleton />
                </h2>

                <Skeleton height="100px" />
                <div className="comments-button">
                  <span className="ask-comments">
                    <i>
                      <FaComments />
                    </i>{" "}
                    Comments
                  </span>
                  <span className="ask-comments" style={{ cursor: "pointer" }}>
                    <i>
                      <IoIosShareAlt />
                    </i>{" "}
                    Share
                  </span>
                </div>
              </div>
              <div className="comments-box">
                <h2>
                  <Skeleton />
                </h2>

                <Skeleton height="100px" />
                <div className="comments-button">
                  <span className="ask-comments">
                    <i>
                      <FaComments />
                    </i>{" "}
                    Comments
                  </span>
                  <span className="ask-comments" style={{ cursor: "pointer" }}>
                    <i>
                      <IoIosShareAlt />
                    </i>{" "}
                    Share
                  </span>
                </div>
              </div>
              <div className="comments-box">
                <h2>
                  <Skeleton />
                </h2>

                <Skeleton height="100px" />
                <div className="comments-button">
                  <span className="ask-comments">
                    <i>
                      <FaComments />
                    </i>{" "}
                    Comments
                  </span>
                  <span className="ask-comments" style={{ cursor: "pointer" }}>
                    <i>
                      <IoIosShareAlt />
                    </i>{" "}
                    Share
                  </span>
                </div>
              </div>
              <div className="comments-box">
                <h2>
                  <Skeleton />
                </h2>

                <Skeleton height="100px" />
                <div className="comments-button">
                  <span className="ask-comments">
                    <i>
                      <FaComments />
                    </i>{" "}
                    Comments
                  </span>
                  <span className="ask-comments" style={{ cursor: "pointer" }}>
                    <i>
                      <IoIosShareAlt />
                    </i>{" "}
                    Share
                  </span>
                </div>
              </div>
              <div className="comments-box">
                <h2>
                  <Skeleton />
                </h2>

                <Skeleton height="100px" />
                <div className="comments-button">
                  <span className="ask-comments">
                    <i>
                      <FaComments />
                    </i>{" "}
                    Comments
                  </span>
                  <span className="ask-comments" style={{ cursor: "pointer" }}>
                    <i>
                      <IoIosShareAlt />
                    </i>{" "}
                    Share
                  </span>
                </div>
              </div>
              <div className="comments-box">
                <h2>
                  <Skeleton />
                </h2>

                <Skeleton height="100px" />
                <div className="comments-button">
                  <span className="ask-comments">
                    <i>
                      <FaComments />
                    </i>{" "}
                    Comments
                  </span>
                  <span className="ask-comments" style={{ cursor: "pointer" }}>
                    <i>
                      <IoIosShareAlt />
                    </i>{" "}
                    Share
                  </span>
                </div>
              </div>
              <div className="comments-box">
                <h2>
                  <Skeleton />
                </h2>

                <Skeleton height="100px" />
                <div className="comments-button">
                  <span className="ask-comments">
                    <i>
                      <FaComments />
                    </i>{" "}
                    Comments
                  </span>
                  <span className="ask-comments" style={{ cursor: "pointer" }}>
                    <i>
                      <IoIosShareAlt />
                    </i>{" "}
                    Share
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default loading;
