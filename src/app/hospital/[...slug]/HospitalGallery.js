"use client";

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 3,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 3,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

const HospitalGallery = ({ gallery }) => {
  return (
    <>
      <div className="owl-slider">
        <div id="gallery-list" className="owl-carousel">
          {/* <Carousel responsive={responsive} arrows={false}>
            {gallery.map((e) => (
              <div className="item" key={e.id} style={{ marginRight: "20px" }}>
                <img
                  src={`https://dev.medflick.com/hospital/${e.icon}`}
                  alt={gallery.name}
                />
              </div>
            ))}
          </Carousel> */}
        </div>
      </div>
    </>
  );
};

export default HospitalGallery;
