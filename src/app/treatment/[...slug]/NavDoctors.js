"use client";

import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const NavDoctors = ({ doctor }) => {
  return (
    <>
      <div className="owl-slider">
        <div id="doctors-treatment" className="owl-carousel">
          <Carousel
            responsive={responsive}
            arrows={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1500}
          >
            {doctor.map((e) => (
              <div className="item" style={{ marginRight: "20px" }} key={e.id}>
                <div className="doctors-treatment">
                  <img
                    src={`https://dev.medflick.com/doctor/${e.image}`}
                    alt={e.slug}
                  />
                  <div className="doctors-treat">
                    <h3>
                      {e.prefix} {e.first_name} {e.last_name}
                    </h3>
                    <div className="doctors-sub">
                      {e.designation.length > 30
                        ? e.designation.slice(0, 30) + "..."
                        : e.designation}
                    </div>

                    <Link href={`/doctor/${e.slug}`} className="contact-now">
                      Contact Now{" "}
                      <img src="/images/2023/01/arrow-c.png" alt="arrow-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default NavDoctors;
