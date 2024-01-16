import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import getAllHospitals from "../lib/getAllHospitals";
import PartnersForm from "./PartnersForm";
import Link from "next/link";

const page = async () => {
  const data = await getAllHospitals();
  const hospital = data.data.hospital;
  return (
    <>
      <NewHeader />
      <section id="partner-with">
        <div className="midbox-inner  wiki-mk">
          <div className="partner-with-box">
            <div className="partner-with-left">
              <h1>Interested in becoming our partner?</h1>
              <p>
                If you represent a doctor, medical center, or healthcare
                facilitator and are interested in becoming a valued partner with
                our organization, we invite you to complete the form below.{" "}
              </p>

              <p>
                As a potential partner, your expertise and local presence are
                essential in helping us deliver high-quality care to a wider
                range of patients.
              </p>
            </div>

            <PartnersForm />
          </div>
        </div>
      </section>

      <section id="partner-medflick">
        <div className="midbox-inner  wiki-mk">
          <h2>Why Partner wtih Medflick?</h2>
          <div className="partner-medflick">
            <div className="partner-medflick-item">
              <img src="/images/p1.png" alt="medflick-icon" />
              <h3>
                Make it easier for patients to connect with doctors & Hospitals
              </h3>
              <p>
                Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                tempor incididunt ut labore Ut enim ad minim veniam, quis
                nostrud
              </p>
            </div>

            <div className="partner-medflick-item">
              <img src="/images/p2.png" alt="medflick-icon" />
              <h3>Experienced medical counselors to assist the patients</h3>
              <p>
                Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                tempor incididunt ut labore Ut enim ad minim veniam, quis
                nostrud
              </p>
            </div>

            <div className="partner-medflick-item">
              <img src="/images/p3.png" alt="medflick-icon" />
              <h3>Reduce manual work for your practices</h3>
              <p>
                Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                tempor incididunt ut labore Ut enim ad minim veniam, quis
                nostrud
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="our-partners">
        <div className="midbox-inner  wiki-mk">
          <h2>Our Partners</h2>

          <div className="partners-logo">
            {hospital.map((e) => (
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
              Join us to make healthcare accessible for everyone, Worldwide
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Ut enim minim orem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do
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
