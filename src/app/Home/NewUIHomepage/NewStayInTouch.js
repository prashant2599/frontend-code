import React from "react";

const NewStayInTouch = () => {
  return (
    <>
      <section id="home-latest-updates">
        <div class="midbox-inner wiki-mk">
          <div class="home-latest-updates">
            <div class="home-latest-updatesleft">
              <h2>
                Lorem ipsum dolor sit, consectetur adipiscing elit, sed do
                eiusmod
              </h2>
            </div>

            <div class="home-latest-updatesright">
              <h3>Stay in Touch</h3>
              <p>Get updates, beauty news, and special offers</p>

              <div class="footer-latest-news">
                <input
                  class="footer-news"
                  type="text"
                  placeholder="Email address"
                  name="name"
                  required=""
                />
                <button type="submit" name="en" class="footer-news-button">
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
