"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
    ,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

const HospitalGallery = ({ gallery, image }) => {
  const iconArray = gallery.length > 0 ? gallery[0].icon.split(",") : [];
  return gallery.length > 0 ? (
    <div id="gallery" className="profile-data-section">
      <h2>Gallery</h2>
      <div className="owl-slider">
        <div id="gallery-list" className="owl-carousel">
          <Carousel responsive={responsive} arrows={false}>
            {iconArray.map((icon, index) => (
              <div className="item" key={index} style={{ marginRight: "20px" }}>
                <img
                  src={`https://dev.medflick.com/hospital/${icon.trim()}`}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  ) : null;
};

export default HospitalGallery;
