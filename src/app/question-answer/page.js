import QAform from "../Home/QaForm/QAform";
import PopForm from "../Home/QaForm/PopForm";
import getAllSpeciality from "../lib/getAllSpeciality";
import QAComents from "./QAComents";
import ShareQA from "./ShareQA";

const page = async () => {
  const data = await getAllSpeciality();
  const qa = data.data.qa;

  return (
    <>
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
                  {/* <button id="show-hidden-menu" onClick={toggleMenu}>
                      Advanced Search
                      <img
                        className={menuVisible ? "plus1" : "plus"}
                        src="images/2023/07/plus.png"
                        alt=""
                      />
                      <img
                        className={menuVisible ? "plus" : "plus1"}
                        src="images/2023/07/plus1.png"
                        alt=""
                      />
                    </button> */}
                </div>

                {/* <div
                    className={`hidden-menu ${
                      menuVisible ? "visible" : "hidden"
                    }`}
                    style={hiddenMenuStyle}
                  >
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

                    <div className="search-medflick">
                      <div className="search-box-medflick">
                        <span>Date Range:</span>
                        <div className="date-range">
                          <input
                            type="text"
                            placeholder="DD/MM/YYYY"
                            name="name"
                            required=""
                          />
                        </div>
                        <div className="date-range1">
                          <span>To:</span>
                          <input
                            type="text"
                            placeholder="DD/MM/YYYY"
                            name="name"
                            required=""
                          />
                        </div>
                      </div>

                      <div className="search-button">
                        <button>Search Now</button>
                      </div>
                    </div>
                  </div> */}
              </div>

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
                <PopForm />
              </div>

              {qa &&
                qa.map((e) => (
                  <div className="comments-box" key={e.id}>
                    <div className="comments-profile">
                      {/* <div className="comments-profileimg">
                          <img src="images/2023/07/man.png" />
                        </div> */}
                      {/* <h3>
                          Lorem Ipsum <span>india</span>
                        </h3> */}
                    </div>

                    <h2>Q. {e.short_description}</h2>
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
                      <QAComents
                        Id={e.id}
                        specialityId={e.speciality_id}
                        subspecialityId={e.subspeciality_id}
                        treatments={e.treatments}
                      />

                      <ShareQA />
                    </div>
                  </div>
                ))}
            </div>
            {/* ASSIATANCE FORM */}
            <QAform />
          </div>
        </div>
      </section>
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
