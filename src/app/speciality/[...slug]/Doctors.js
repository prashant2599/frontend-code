"use client";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3.3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Doctors = ({ doctor }) => {
  let doctorSection = null;
  if (doctor?.length > 0) {
    doctorSection = (
      <>
        <div className="owl-slider">
          <div id="doctors-list">
            <Carousel
              responsive={responsive}
              arrows={false}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              ssr
            >
              {doctor &&
                doctor.map((e) => (
                  <div
                    className="item"
                    style={{ marginRight: "20px" }}
                    key={e.id}
                  >
                    <div className="doctors-item">
                      <img
                        src={`https://dev.medflick.com/doctor/${e.image}`}
                        alt={e.slug}
                      />
                    </div>
                    <div className="doctors-text">
                      <h3>
                        {e.prefix} {e.first_name} {e.last_name}
                      </h3>
                      <div className="doctors-sub">{e.designation}</div>
                      {/* <div className="doctors-bio">{e.short_description}</div> */}
                      {/* <div
                          className="doctors-bio"
                          dangerouslySetInnerHTML={{  
                            __html: e.short_description,
                          }}
                        /> */}
                      <Link href={`/doctor/${e.slug}`} className="contact-now">
                        Contact Now{" "}
                        <img src="/images/2023/01/arrow-c.png" alt="icon" />
                      </Link>
                    </div>
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
      </>
    );
  }
  return (
    <section id="doctors-section">
      <div className="midbox-inner  wiki-mk">
        <h2>
          Expertise You Can
          <span>Trust</span>
        </h2>
        <p>
          Get connected to India&apos;s best doctors/ surgeons from top
          hospitals. Find trusted medical expertise & reliable knowledge
          tailored to your needs at one place.
        </p>
        {doctorSection}
      </div>
    </section>
  );
};

export default Doctors;
