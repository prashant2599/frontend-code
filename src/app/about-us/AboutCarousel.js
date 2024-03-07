"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
const responsiveHospital = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.5,
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

const AboutCarousel = () => {
  return (
    <>
      <div className="owl-slider">
        <div id="medflick" className="owl-carousel">
          <Carousel
            responsive={responsiveHospital}
            arrows={false}
            autoPlay={true}
            autoPlaySpeed={2000}
            infinite={true}
          >
            <div className="item" style={{ margin: "10px" }}>
              <div className="item-medflick">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/06/iconn.png`}
                  alt="icon"
                />
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
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/about/1.png`}
                  alt="icon"
                />
                <h3>Trusted Hospitals</h3>
                <p>
                  We have a network of World&apos;s top hospitals, known for
                  their excellence in healthcare. When you choose Medflick,
                  you&apos;re selecting from a list of most trusted hospitals
                  with world class facilities and technology. We ensure you
                  receive the best possible care.
                </p>
              </div>
            </div>

            <div className="item" style={{ margin: "10px" }}>
              <div className="item-medflick">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/about/2.png`}
                  alt="icon"
                />
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
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/about/3.png`}
                  alt="icon"
                />
                <h3>World&apos;s Top Doctors</h3>
                <p>
                  Medflick connects you with World&apos;s top doctors and
                  specialists, so you can be confident that you&apos;re
                  receiving the best care and are in safe hands.
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default AboutCarousel;
