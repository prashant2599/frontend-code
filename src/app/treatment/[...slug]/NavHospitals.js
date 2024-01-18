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

const NavHospitals = ({ hospital }) => {
  return (
    <>
      <div className="owl-slider">
        <div id="hospitals-treatment">
          <Carousel
            responsive={responsive}
            arrows={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1500}
          >
            {hospital.map((e) => (
              <div className="item" style={{ marginRight: "20px" }} key={e.id}>
                <div className="hospitals-treatment">
                  <img
                    src={`https://dev.medflick.com/hospital/${e.home_image}`}
                    alt={e.slug}
                  />
                  <div className="hospitals-treat">
                    <h3 style={{ textAlign: "left" }}>{e.name}</h3>

                    <Link href={`/hospital/${e.slug}`} className="contact-now">
                      Contact Now{" "}
                      <img src="/images/2023/01/arrow-c.png" alt="icons" />
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

export default NavHospitals;
