import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import getAllHospitals from "../lib/getAllHospitals";
import PartnersForm from "./PartnersForm";
import Link from "next/link";
import getAllHospitalsFilteration from "../lib/gerAllHospitalFilteration";

const page = async () => {
  const data = await getAllHospitalsFilteration();
  const hospital = data.data;
  const featuredHospitals = hospital.filter(
    (hospital) => hospital.featured === "1"
  );
  return (
    <>
      <NewHeader />
      <section id="partner-with">
        <div className="midbox-inner  wiki-mk">
          <div className="partner-with-box">
            <div className="partner-with-left">
              <h1>Interested in partnering with us?</h1>
              <p>
                We are India’s leading healthtech platform. If you are a doctor,
                hospital, or healthcare facilitator and wish to recommend
                patients in your area, then please fill the form at your
                earliest convenience. Our team will contact you shortly.
              </p>

              {/* <p>
                As a potential partner, your expertise and local presence are
                essential in helping us deliver high-quality care to a wider
                range of patients.
              </p> */}
            </div>

            <PartnersForm />
          </div>
        </div>
      </section>

      <section id="partner-medflick">
        <div className="midbox-inner  wiki-mk">
          <h2>Why Choose Medflick as Your Partner?</h2>
          <div className="partner-medflick">
            <div className="partner-medflick-item">
              <img src="/images/p1.png" alt="medflick-icon" />
              <h3>
                Facilitates Patients to Establish Seamless Connections with
                Doctors and Hospitals
              </h3>
              <p>
                Medflick provides a simplified platform to patients to get in
                touch with the desired healthcare provider. It offers excellent
                accessibility, easy & smooth interactions, improving overall
                healthcare experience.
              </p>
            </div>

            <div className="partner-medflick-item">
              <img src="/images/p2.png" alt="medflick-icon" />
              <h3>
                Experienced Medical Counselors Provide Personalized Support to
                Patients
              </h3>
              <p>
                Our team of experienced and compassionate medical counselors is
                offering personalized assistance to the patients by addressing
                their issues with care. They are providing comprehensive
                guidance and assistance to patients with a holistic approach,
                fostering trust and confidence in patients.
              </p>
            </div>

            <div className="partner-medflick-item">
              <img src="/images/p3.png" alt="medflick-icon" />
              <h3>
                Minimises You Manual Workload to Further Streamline Your
                Practice
              </h3>
              <p>
                With the manual workload associated with providing easy access
                to patients and accurately addressing their needs at earliest
                seamlessly managed, healthcare providers can devote their
                attention towards their practices maximally.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="our-partners">
        <div className="midbox-inner  wiki-mk">
          <h2>Our Partners</h2>

          <div className="partners-logo">
            {featuredHospitals.map((e) => (
              <div className="logo-img" key={e.id}>
                <Link href={`/hospital/${e.slug}`}>
                  <img
                    src={`https://dev.medflick.com/hospital/${e.icon}`}
                    alt={e.slug}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-head">
        <div className="midbox-inner  wiki-mk">
          <div className="join-us-box">
            <h2>
              Join Us in Our Mission To Make Healthcare Accessible Globally
            </h2>
            <p>
              Come along with us to break down barriers in healthcare access
              worldwide. Through our collaborative efforts, we can expand
              healthcare reach even across the borders, promoting equity and
              well-being for all.
            </p>

            <a href="/" className="learn">
              Become our Partner <img src="images/2023/01/arrow-w.png" alt="" />
            </a>
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
      canonical: `https://medflick.com/partners`,
    },
  };
}
