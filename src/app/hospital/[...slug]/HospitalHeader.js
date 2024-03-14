"use client";
import { useEffect, useState } from "react";

const HospitalHeader = ({ hospitalDetails }) => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  useEffect(() => {
    const handleScroll = () => {
      const profileLink = document.getElementById("profile-link");

      // Check if profileLink exists before manipulating its classList
      if (profileLink) {
        if (window.scrollY >= 100) {
          profileLink.classList.add("sticky-p");
        } else {
          profileLink.classList.remove("sticky-p");
        }
      }
    };

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <section id="profile-link">
        <div className="midbox-inner  wiki-mk ">
          <ul>
            <li>
              <a
                href="#reviews"
                target="_self"
                className={activeLink === "reviews" ? "active" : ""}
                onClick={() => handleLinkClick("reviews")}
              >
                Reviews
              </a>
            </li>
            <li>
              <a
                href="#overview"
                target="_self"
                className={activeLink === "overview" ? "active" : ""}
                onClick={() => handleLinkClick("overview")}
              >
                Overview
              </a>
            </li>

            <li>
              <a
                href="#gallery"
                target="_self"
                className={activeLink === "gallery" ? "active" : ""}
                onClick={() => handleLinkClick("gallery")}
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#doctor"
                target="_self"
                className={activeLink === "doctor" ? "active" : ""}
                onClick={() => handleLinkClick("doctor")}
              >
                Doctors
              </a>
            </li>
            <li>
              <a
                href="#amenitie"
                target="_self"
                className={activeLink === "amenitie" ? "active" : ""}
                onClick={() => handleLinkClick("amenitie")}
              >
                Amenities
              </a>
            </li>
          </ul>

          <div className="expert-profilebox">
            <div className="hospital-boxright">
              <div className="hos-profile">
                <div className="hosprofile-img">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/hospital/${hospitalDetails.icon}`}
                    alt={hospitalDetails.name}
                  />
                </div>{" "}
                <span>{hospitalDetails.name}</span>
              </div>
              {/* <a href="#" className="book-appointment">
                Enquire Now <img src="/images/2023/05/book.png" />
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HospitalHeader;
