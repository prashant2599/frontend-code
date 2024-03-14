"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
const responsiveHospital = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1.1,
  },
};

const CostCityWise = ({ cost, info }) => {
  return (
    <>
      <section id="health-city">
        <div className="midbox-inner  wiki-mk">
          <h2>{info}</h2>

          <div className="owl-slider">
            <div id="city-list">
              <Carousel
                responsive={responsiveHospital}
                arrows={false}
                autoPlay={true}
                autoPlaySpeed={2000}
                infinite={false}
              >
                {cost.map((e) => (
                  <div
                    className="item"
                    style={{ marginRight: "20px" }}
                    key={e.id}
                  >
                    <div className="city-item">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/treatments/${e.icon}`}
                        alt={e.slug}
                      />
                      <div className="city-box">
                        <h3>{e.name}</h3>
                        <ul>
                          <li>
                            <h4>{e.lowest_cost}</h4>
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/03/line-icon.png`}
                              alt="icons"
                            />
                            <h5>Lowest Cost (Approx)</h5>
                          </li>
                          <li>
                            <h4>{e.average_cost}</h4>
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/03/line-icon1.png`}
                              alt="icons"
                            />
                            <h5>Average Cost (Approx)</h5>
                          </li>
                          <li>
                            <h4>{e.highest_cost}</h4>
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/03/line-icon2.png`}
                              alt="icons"
                            />
                            <h5>Highest Cost (Approx)</h5>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CostCityWise;
