import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import DontPay from "../Home/dontPay/DontPay";

const page = () => {
  return (
    <>
      <NewHeader />
      <section id="about-head">
        <div className="midbox-inner  wiki-mk">
          <h1>
            ABOUT <span>Medflick</span>
          </h1>
          <img src="/images/2023/06/about-us.jpg" alt="about-us" />
        </div>
      </section>

      <section className="about-middle">
        <div className="midbox-inner  wiki-mk">
          <div className="about-middlebox">
            <div className="about-middle-left">
              <h2>
                Start Your Journey Now
                <br /> Ask a Free Question{" "}
              </h2>
              <a href="#">
                {" "}
                Contact Us <img src="/images/2023/01/arrow-c.png" alt="icon" />
              </a>
            </div>
            <div className="about-middle-right">
              <p>
                Medflick: Trusted health information when you need it the most.
                With Medflick, you don&apos;t have to do it alone. Your online
                hub for expert health videos, forums, informative blogs,
                treatments, best doctors, and top rated hospitals in India at
                one place.
              </p>

              <p>
                Our mission is to provide you with access to reliable healthcare
                knowledge, empowering you to make your informed and confident
                health decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-middle-no">
        <div className="midbox-inner  wiki-mk">
          <h2>Your Health Journey with Medflick</h2>

          <div className="about-middle-boxno">
            <div className="about-boxno-left">
              <ul>
                <li>
                  <h3>2000+</h3>
                  <p>Over 2,000 Patients on a Journey to Well-being</p>
                </li>
                <li>
                  <h3>4000+</h3>
                  <p>A Network of Over 4,000 Trusted Doctors</p>
                </li>
                <li>
                  <h3>1000+</h3>
                  <p>Medflick Trusted India&apos;s Premier Hospitals</p>
                </li>
              </ul>
            </div>
            <div className="about-boxno-right">
              <img src="/images/2023/06/about-right.jpg" />
            </div>
          </div>
        </div>
      </section>

      <section className="why-medflick">
        <div className="midbox-inner  wiki-mk">
          <h2>Why Choose Medflick?</h2>

          <div className="owl-slider">
            <div id="medflick" className="owl-carousel">
              <div className="item" style={{ margin: "10px" }}>
                <div className="item-medflick">
                  <img src="/images/2023/06/iconn.png" alt="icon" />
                  <h3>Direct hospital prices</h3>
                  <p>
                    At Medflick, we believe in transparency. We provide you with
                    direct access to hospital prices, ensuring you have a clear
                    understanding of the costs involved in your healthcare
                    journey. No hidden fees and unexpected expenses.
                  </p>
                </div>
              </div>

              <div className="item" style={{ margin: "10px" }}>
                <div className="item-medflick">
                  <img src="/images/2023/06/iconn.png" alt="icon" />
                  <h3>Trusted Hospitals</h3>
                  <p>
                    We have a network of India&apos;s top hospitals, known for
                    their excellence in healthcare. When you choose Medflick,
                    you&apos;re selecting from a list of most trusted hospitals
                    with world class facilities and technology. We ensure you
                    receive the best possible care.
                  </p>
                </div>
              </div>

              <div className="item" style={{ margin: "10px" }}>
                <div className="item-medflick">
                  <img src="/images/2023/06/iconn.png" alt="icon" />
                  <h3>Real Reviews</h3>
                  <p>
                    Your trust is important to us. That&apos;s why we offer real
                    reviews from patients who have experienced our partner
                    hospitals and doctors firsthand. Hear from others who have
                    walked the same path and make informed decisions based on
                    their experiences.
                  </p>
                </div>
              </div>

              <div className="item" style={{ margin: "10px" }}>
                <div className="item-medflick">
                  <img src="/images/2023/06/iconn.png" alt="icon" />
                  <h3>India&apos;s Top Doctors</h3>
                  <p>
                    Medflick connects you with India&apos;s top doctors and
                    specialists, so you can be confident that you&apos;re
                    receiving the best care and are in safe hands.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section-list">
        <div className="midbox-inner  wiki-mk">
          <div className="services-list">
            <div className="medflick-services-left">
              <div className="medflick-box-services">
                <div className="medflick-logo">
                  <img
                    src="/images/2023/02/logo.png"
                    className="logo-about"
                    alt="Brand Logo"
                  />
                </div>

                <ul>
                  <li>
                    <p>Consultation with a medical coordinator </p>
                    <h4>$ 0</h4>
                  </li>
                  <li>
                    <p>Finding a hospital and doctor </p>
                    <h4>$ 0</h4>
                  </li>
                  <li>
                    <p>Assistance in applying for a visa </p>
                    <h4>$ 0</h4>
                  </li>
                  <li>
                    <p>Assistance in travel arrangements </p>
                    <h4>$ 0</h4>
                  </li>
                  <li>
                    <p>24/7 Support </p>
                    <h4>$ 0</h4>
                  </li>
                  <li>
                    <p>Treatment </p>
                    <h4>$ XXX</h4>
                  </li>
                </ul>

                <div className="services-price">
                  <div className="total-price">Total Price:</div>
                  <div className="price-box">$ XXX</div>
                </div>
              </div>
            </div>

            <div className="medflick-services-right">
              <h2>Our Services are free for you</h2>
              <p>
                Medflick offers a wide range of services to meet your healthcare
                needs, ensuring that you receive holistic support throughout
                your medical journey. From providing direct access to
                India&apos;s best hospital prices, connecting you with the most
                trusted hospitals and India&apos;s best doctors, to offering
                real and honest reviews from patients who have been there, we
                strive to empower you with the information and resources
                necessary for informed health decisions.
              </p>
              <p>
                Choose Medflick for a healthcare experience that prioritizes
                transparency, trust, real experiences, and access to the best
                doctors and hospitals in India. Your well-being is our priority.
              </p>
              <a href="#">
                {" "}
                Contact Us <img src="/images/2023/01/arrow-c.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <DontPay />

      {/* <section id="best-healthcare">
        <div className="midbox-inner  wiki-mk">
          <div className="pay-box">
            <div className="medflick-payleft">
              <h4>Find the best healthcare provider for you</h4>
            </div>

            <div className="medflick-payright">
              <a href="#" className="consultation">
                {" "}
                Request a free consultation{" "}
                <img src="/images/2023/01/arrow-w.png" alt="" />
              </a>
              <a href="#" className="contact">
                {" "}
                Explore Now <img src="/images/2023/01/arrow-c.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </section> */}
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    openGraph: {
      images: "https://medflick.com/images/2023/02/logo.png",
    },
    alternates: {
      canonical: `https://medflick.com/about-us`,
    },
  };
}
