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

const Hospitralspe = ({ hospital }) => {
  let hospitalSection = null;
  if (hospital?.length > 0) {
    hospitalSection = (
      <>
        <div className="owl-slider">
          <div id="hospitals-list">
            <Carousel
              responsive={responsive}
              arrows={false}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
            >
              {hospital &&
                hospital.map((e) => (
                  <div
                    className="item"
                    style={{ marginRight: "20px" }}
                    key={e.id}
                  >
                    <div className="hospitals-item">
                      <img
                        src={`https://dev.medflick.com/hospital/${e.home_image}`}
                        alt={e.slug}
                      />
                    </div>
                    <div className="hospitals-text">
                      <h3>{e.name}</h3>
                      {/* <div className="hospitals-sub">{e.short_description}</div> */}
                      {/* <div
                          className="hospitals-sub"
                          dangerouslySetInnerHTML={{
                            __html: e.short_description,
                          }}
                        /> */}
                      <Link
                        href={`/hospital/${e.slug}/${e.country}`}
                        className="contact-now"
                      >
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
    <>
      <section id="hospitals-section">
        <div className="midbox-inner  wiki-mk">
          <h2>Browse Medflick Assured Hospital Directory</h2>
          <p>
            Discover our comprehensive hospital listings. From cutting-edge
            technology and infrastructure to globally acclaimed medical experts,
            we&pos;re committed to assist you in finding the right healthcare
            options for your health needs.
          </p>
          {hospitalSection}
        </div>
      </section>
    </>
  );
};

export default Hospitralspe;
