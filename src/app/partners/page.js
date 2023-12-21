import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import getAllHospitals from "../lib/getAllHospitals";

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

            <div className="partner-with-right">
              <div className="treatment-right">
                <h2>Partner with Us</h2>

                <div className="treatment-form">
                  <div className="inputbox">
                    <label>Name</label>
                    <input type="text" placeholder="" name="name" required="" />
                  </div>
                </div>

                <div className="treatment-form">
                  <div className="inputbox">
                    <label>Phone</label>
                    <div className="phone-form">
                      <div className="phone-box1">
                        <select
                          aria-label="Sort dropdown"
                          className="phone-dropdown"
                        >
                          <option value="">Choose Code</option>
                          <option value="1">UK (+44)</option>
                          <option value="213">Algeria (+213)</option>
                          <option value="376">Andorra (+376)</option>
                          <option value="244">Angola (+244)</option>
                          <option value="1264">Anguilla (+1264)</option>
                          <option value="1268">
                            Antigua &amp; Barbuda (+1268)
                          </option>
                          <option value="54">Argentina (+54)</option>
                          <option value="374">Armenia (+374)</option>
                          <option value="297">Aruba (+297)</option>
                          <option value="61">Australia (+61)</option>
                          <option value="43">Austria (+43)</option>
                          <option value="994">Azerbaijan (+994)</option>
                          <option value="1242">Bahamas (+1242)</option>
                          <option value="973">Bahrain (+973)</option>
                          <option value="880">Bangladesh (+880)</option>
                          <option value="1246">Barbados (+1246)</option>
                          <option value="375">Belarus (+375)</option>
                          <option value="32">Belgium (+32)</option>
                          <option value="501">Belize (+501)</option>
                          <option value="229">Benin (+229)</option>
                          <option value="1441">Bermuda (+1441)</option>
                          <option value="975">Bhutan (+975)</option>
                          <option value="591">Bolivia (+591)</option>
                          <option value="387">Bosnia Herzegovina (+387)</option>
                          <option value="267">Botswana (+267)</option>
                          <option value="55">Brazil (+55)</option>
                          <option value="673">Brunei (+673)</option>
                          <option value="359">Bulgaria (+359)</option>
                          <option value="226">Burkina Faso (+226)</option>
                        </select>
                      </div>
                      <div className="phone-box2">
                        <input
                          type="text"
                          placeholder=""
                          name="name"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="treatment-form">
                  <div className="inputbox">
                    <label>Email</label>
                    <input type="text" placeholder="" name="name" required="" />
                  </div>
                </div>

                <div className="treatment-form">
                  <div className="inputbox">
                    <label>Your Query</label>
                    <textarea
                      className="querybox"
                      type="textarea"
                      name="query"
                      placeholder=""
                      rows="2"
                    ></textarea>
                  </div>
                </div>

                <button type="submit" name="en" className="home-button">
                  {" "}
                  Submit Now <img src="images/2023/01/arrow-c.png" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="partner-medflick">
        <div className="midbox-inner  wiki-mk">
          <h2>Why Partner wtih Medflick?</h2>
          <div className="partner-medflick">
            <div className="partner-medflick-item">
              <img src="/images/p1.png" alt="" />
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
              <img src="/images/p2.png" alt="" />
              <h3>Experienced medical counselors to assist the patients</h3>
              <p>
                Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                tempor incididunt ut labore Ut enim ad minim veniam, quis
                nostrud
              </p>
            </div>

            <div className="partner-medflick-item">
              <img src="/images/p3.png" alt="" />
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
                <img
                  src={`https://dev.medflick.com/hospital/${e.icon}`}
                  alt={e.slug}
                />
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
