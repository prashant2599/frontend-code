import QAform from "../Home/QaForm/QAform";
import PopForm from "../Home/QaForm/PopForm";
import getAllSpeciality from "../lib/getAllSpeciality";
import ShareQA from "./ShareQA";
import Link from "next/link";
import QuestionSearch from "./QuestionSearch";
import { FaComments } from "react-icons/fa";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";

const page = async () => {
  const data = await getAllSpeciality();
  const qa = data.data.qa;

  return (
    <>
      <NewHeader />
      <section id="questions-ans-section">
        <div className="midbox-inner wiki-mk">
          <div className="questions-ans">
            <div className="questions-ans-left">
              <QuestionSearch qa={qa} />

              <div className="search-question">
                <div className="search-question-left">
                  <div className="ding">
                    {/* <div className="sort">Sort:</div> */}
                    {/* <Select
                        id="wiki"
                        value={selectedOption}
                        onChange={handleSelectChange}
                        options={options}
                        isSearchable={true} // Enables search
                        placeholder=" Most Recent"
                        maxMenuHeight={150}
                      /> */}
                  </div>
                  <div className="ding">
                    {/* <div className="sort">Category:</div> */}
                    {/* <Select
                        id="wiki"
                        value={selectedOption}
                        onChange={handleSelectChange}
                        options={options}
                        isSearchable={true} // Enables search
                        placeholder="Category"
                        maxMenuHeight={150}
                      /> */}
                  </div>
                </div>
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
                <div className="search-question-right">
                  <span>Have any Questions?</span>
                  <PopForm />
                </div>
              </div>

              {qa &&
                qa.map((e) => (
                  <div className="comments-box" key={e.id}>
                    <div className="comments-profile">
                      <div className="comments-profileimg">
                        <img src="/images/icon.jpg" alt="user-profile" />
                      </div>
                      <h3>
                        {e.pname} <span>India</span>
                      </h3>
                    </div>
                    <Link
                      href={`/question/${e.id}/${encodeURIComponent(
                        e.short_description
                          .toLowerCase()
                          .replace(/[^\w\s]/g, "-")
                          .replace(/\s+/g, "-")
                          .replace(/-+$/, "")
                      )}`}
                    >
                      <h2>Q. {e.short_description}</h2>
                    </Link>
                    <div
                      dangerouslySetInnerHTML={{ __html: e.long_description }}
                    />
                    <div className="comments-button">
                      {/* <a
                          className="ask-comments"
                          onClick={() => handleLike(e.id)}
                        >
                          {likes[e.id] ? (
                            <i>
                              <AiTwotoneHeart
                                style={{ color: "red", fontSize: "23px" }}
                              />
                            </i>
                          ) : (
                            <i>
                              <AiOutlineHeart
                                style={{ color: "red", fontSize: "23px" }}
                              />
                            </i>
                          )}
                          Likes {likes[e.id] || 0}
                        </a> */}
                      <span className="ask-comments">
                        <i>
                          <FaComments />
                        </i>{" "}
                        Comments
                      </span>

                      <ShareQA desc={e.short_description} id={e.id} />
                    </div>
                  </div>
                ))}
            </div>
            {/* ASSIATANCE FORM */}
            <QAform />
          </div>
        </div>
      </section>
      <NewFooter />
    </>
  );
};

export default page;
export async function generateMetadata() {
  return {
    alternates: {
      canonical: `https://medflick.com/question-answer`,
    },
  };
}
