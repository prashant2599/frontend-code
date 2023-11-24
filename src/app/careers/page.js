

import DontPay from "../Home/dontPay/DontPay";

const page = () => {
  return (
    <>
      <section id="career-slider">
        <img src="/images/careerD.jpg" className="category-d" />
        <img src="/images/careerM.jpg" className="category-m" />
        <div className="midbox-inner  wiki-mk">
          <div className="career-slidertext">
            <h1>Join Us</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscin elit, sed do
              eiusmod tempor incididunt ut labore consectetur ipsum dolor sit
              amet, consectetur elit, sed do eiusmod tempor incidid Lorem ipsum
              dolor sit amet adipiscin elit, sed do eiusmod tempor lorem ipsum
              dolor amet, consectetur adipiscin elit.
            </p>

            <a href="#">
              {" "}
              View All Jobs <img src="images/2023/01/arrow-c.png" alt="" />
            </a>
          </div>
        </div>
      </section>

      <section id="our-mission">
        <div className="midbox-inner  wiki-mk">
          <h2>
            Our <span>Mission</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo
            orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo
            orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo
            orem.
          </p>
        </div>
      </section>

      <section id="employee-benefit">
        <div className="midbox-inner  wiki-mk">
          <div className="employee-explore">
            <h2>
              Our <span>Perks</span>
            </h2>

            <ul>
              <li>
                <img src="/images/100.png" alt="" />
                <h3>Explore</h3>
                <p>100% paid employee health benefit options</p>
              </li>
              <li>
                <img src="/images/tree.png" alt="" />
                <h3>Read Reviews</h3>
                <p>Corporate wellness programs with Headspace and Peloton</p>
              </li>
              <li>
                <img src="/images/tree1.png" alt="" />
                <h3>Prepare</h3>
                <p>
                  Cell phone <br />
                  reimbursement
                </p>
              </li>
              <li>
                <img src="/images/tree2.png" alt="" />
                <h3>Treat</h3>
                <p>
                  Vacation and parental <br />
                  leave packages
                </p>
              </li>
            </ul>
          </div>

          <img src="/images/employee.jpg" />
        </div>
      </section>

      <section id="employee-openings">
        <div className="midbox-inner  wiki-mk">
          <div className="employee-explore">
            <h2>
              All <span>Openings</span>
            </h2>

            <div className="job-headbox">
              <div className="job-headtitle">Job Title </div>
              <div className="job-headtitle">Location </div>
              <div className="job-headtitle">Type </div>
            </div>

            <div className="openings-list">
              <div className="openings-box">
                <div className="openings-box1">
                  <div className="openings-details">1</div>
                  <div className="job-title">Finance & Strategy Associate</div>
                  <div className="job-details">New York, NY, United States</div>
                  <div className="job-type">Full-Time</div>
                </div>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id es Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore
                </p>
                <a href="/" className="apply-now">
                  {" "}
                  Apply Now
                </a>
              </div>

              <div className="openings-box">
                <div className="openings-box1">
                  <div className="openings-details">2</div>
                  <div className="job-title">Finance & Strategy Associate</div>
                  <div className="job-details">New York, NY, United States</div>
                  <div className="job-type">Full-Time</div>
                </div>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id es Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore
                </p>
                <a href="/" className="apply-now">
                  {" "}
                  Apply Now
                </a>
              </div>

              <div className="openings-box">
                <div className="openings-box1">
                  <div className="openings-details">3</div>
                  <div className="job-title">Finance & Strategy Associate</div>
                  <div className="job-details">New York, NY, United States</div>
                  <div className="job-type">Full-Time</div>
                </div>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id es Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore
                </p>
                <a href="/" className="apply-now">
                  {" "}
                  Apply Now
                </a>
              </div>

              <div className="openings-box">
                <div className="openings-box1">
                  <div className="openings-details">4</div>
                  <div className="job-title">Finance & Strategy Associate</div>
                  <div className="job-details">New York, NY, United States</div>
                  <div className="job-type">Full-Time</div>
                </div>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id es Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore
                </p>
                <a href="/" className="apply-now">
                  {" "}
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DontPay />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    openGraph: {
      images: "https://medflick.com/images/careerD.jpg",
    },
    alternates: {
      canonical: `https://medflick.com/careers`,
    },
  };
}
