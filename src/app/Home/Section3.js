import Image from "next/image";
import Link from "next/link";

const Section3 = () => {
  return (
    <>
      <section id="homemid-section">
        <div className="midbox-inner wiki-mk">
          <h2>
            {/* Lorem Ipsum dolor sit velit dolor <span>consect</span> */}
            With you, when you need us the most!
          </h2>
          <p>
            Providing you with every ounce of authentic health information when
            you need it the most.
          </p>
        </div>
      </section>
      <section id="healthcare-section">
        <div className="midbox-inner  wiki-mk">
          <div className="healthcare-box">
            <div className="healthcare-text">
              <h2>Answers</h2>
              <p>
                Empower your health journey with expert guidance! Engage with
                best doctors, ask questions and get all your queries sorted to
                make an informed decision
              </p>
              <Link className="learn-more" href="/question-answer">
                Learn More{" "}
                <img
                  class="learn-icon-d"
                  src="images/2023/01/learn-more.png"
                  alt="medflick-Answers"
                />
                <img class="learn-icon-m" src="/images/2023/learn-more-w.png" />
              </Link>
            </div>
            <div className="healthcare-img">
              <Image
                className="secon3-img"
                src="/images/2023/01/02/frame1.jpg"
                alt="medflick-Answers"
                height="441"
                width="400"
              />
            </div>
          </div>

          <div className="healthcare-box">
            <div className="healthcare-text">
              <h2>Affordable</h2>
              <p>
                Get high-quality healthcare facilities without worrying about
                the cost. Connect with best doctors and top hospitals in India
                for a treatment plan that fit your health needs and budget.
              </p>
              {/* <span className="learn-more" onClick={togglePopup}>
                Learn More <img src="images/2023/01/learn-more.png" alt="Affordable"/>
              </span> */}
            </div>
            <div className="healthcare-img">
              <Image
                className="health-img4"
                src="/images/2023/01/02/frame2.jpg"
                alt="Affordable"
                width="380"
                height="711"
              />
            </div>
          </div>

          <div className="healthcare-box">
            <div className="healthcare-text">
              <h2>Treatment</h2>
              <p>
                Connect with the best doctors, hospitals in India for a
                comprehensive and personalized treatment plan to ensure the best
                recovery for you and your loved ones.
              </p>
              <Link className="learn-more" href="/specialities">
                Learn More{" "}
                <img
                  class="learn-icon-d"
                  src="images/2023/01/learn-more.png"
                  alt="medflick-Answers"
                />
                <img class="learn-icon-m" src="/images/2023/learn-more-w.png" />
              </Link>
            </div>
            <div className="healthcare-img">
              <img src="images/2023/01/02/frame3.jpg" alt="Treatment" />
              <div className="animation-element slide-up1 in-view">
                <img
                  className="treatment-img"
                  src="/images/1.png"
                  alt="Treatment"
                />
              </div>
            </div>
          </div>

          <div className="healthcare-box">
            <div className="healthcare-text">
              <h2>Contact</h2>
              <p>
                Count on us for expert health guidance. You are just a step away
                from starting your journey to better health. Get in touch to
                find expert care at affordable prices.
              </p>
              <Link className="learn-more" href="/contact-us">
                Learn More{" "}
                <img
                  class="learn-icon-d"
                  src="images/2023/01/learn-more.png"
                  alt="medflick-Answers"
                />
                <img class="learn-icon-m" src="/images/2023/learn-more-w.png" />
              </Link>
            </div>
            <div className="healthcare-img">
              <Image
                className="health-img4"
                src="/images/2023/01/02/frame4.jpg"
                alt="Contact"
                width="380"
                height="441"
              />
            </div>
          </div>

          <div className="healthcare-box">
            <div className="healthcare-text">
              <h2>Find Your Community. Empower Your Knowledge.</h2>
              <p>
                The world&apos;s most trusted personalized health community with
                more than 1,00, 000 members that share their journey,
                experiences and health insights. Join your community and get
                access to make informed health decisions.
              </p>
              <Link className="learn-more" href="/question-answer">
                Learn More{" "}
                <img
                  class="learn-icon-d"
                  src="images/2023/01/learn-more.png"
                  alt="medflick-Answers"
                />
                <img class="learn-icon-m" src="/images/2023/learn-more-w.png" />
              </Link>
            </div>
            <div className="healthcare-img">
              <img src="images/2023/01/02/frame5.jpg" alt="Contact" />
              <div className="animation-element slide-up1 in-view">
                <img className="dr-img" src="/images/2.png" alt="Contact" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section3;
