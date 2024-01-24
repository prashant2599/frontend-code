import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import DontPay from "../Home/dontPay/DontPay";

const page = () => {
  return (
    <>
      <NewHeader />
      <section id="career-slider">
        <img src="/images/careerD.jpg" className="category-d" />
        <img src="/images/careerM.jpg" className="category-m" />
        <div className="midbox-inner  wiki-mk">
          <div className="career-slidertext">
            <h1>Join Us</h1>
            <p>
              Medflick is a healthcare platform that connects patients and
              providers, fostering trust and exceptional values. Our culture is
              built on teamwork, optimism, brilliant learning opportunities, and
              professional growth. Medflick seeks professionals with unique
              perspectives, the ability to see opportunities, and the conviction
              to change the world with the right resources and team.
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
            Our <span>Ethos</span>
          </h2>
          <p>
            Even though we are a virtual healthcare provider that delivers care
            virtually, it’s important, on a daily basis, to remember that the
            person at the other end is real.
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
                <img src="/images/c1.png" alt="" />
                {/* <h3>100% Professional Growth</h3> */}
                <p>100% Professional Growth</p>
              </li>
              <li>
                <img src="/images/c2.png" alt="" />
                {/* <h3>Learning and Development Opportunities</h3> */}
                <p>Learning and Development Opportunities</p>
              </li>
              <li>
                <img src="/images/c3.png" alt="" />
                {/* <h3>Recognition Opportunities</h3> */}
                <p>Recognition Opportunities</p>
              </li>
              <li>
                <img src="/images/c4.png" alt="" />
                {/* <h3>Work-Life Balance</h3> */}
                <p>Work-Life Balance</p>
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
                  <div className="job-title">
                    International Patient Case Manager{" "}
                  </div>
                  <div className="job-details">Noida, India</div>
                  <div className="job-type">Full-Time</div>
                </div>
                <p>
                  We are seeking a dedicated and compassionate International
                  Patient Case Manager to join our Medflick team. The ideal
                  candidate will be responsible for overseeing and coordinating
                  patient care services, ensuring the highest level of quality
                  and patient satisfaction. The Patient Care Manager will work
                  closely with healthcare professionals, patients, and their
                  families to facilitate a seamless and positive healthcare
                  experience.
                </p>
                <a href="/" className="apply-now">
                  {" "}
                  Apply Now
                </a>
              </div>

              {/* <div className="openings-box">
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
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <DontPay />
      <NewFooter />
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
