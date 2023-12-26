import React from "react";

const NewStayInTouch = () => {
  return (
    <>
      <section id="home-latest-updates">
        <div className="midbox-inner wiki-mk">
          <div className="home-latest-updates">
            <div className="home-latest-updatesleft">
              <h2>MedBlog: Your Source for Health Knowledge</h2>
            </div>

            <div className="home-latest-updatesright">
              <h3>Sign up to get Latest updates</h3>
              {/* <p>Get updates, beauty news, and special offers</p> */}

              <div className="footer-latest-news">
                <input
                  className="footer-news"
                  type="text"
                  placeholder="Enter Your Email address"
                  name="name"
                  required=""
                />
                <button type="submit" name="en" className="footer-news-button">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewStayInTouch;
