"use client";
import { useEffect } from "react";

const HospitalHeader = ({ hospitalDetails }) => {
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
              <a href="#reviews" target="_self" className="active">
                Reviews
              </a>
            </li>
            <li>
              <a href="#overview" target="_self">
                Overview
              </a>
            </li>
           
            <li>
              <a href="#gallery" target="_self">
                Gallery
              </a>
            </li>
            <li>
              <a href="#doctor" target="_self">
                Doctors
              </a>
            </li>
            <li>
              <a href="#amenitie" target="_self">
                Amenities
              </a>
            </li>
          </ul>

          <div className="expert-profilebox">
            <div className="hospital-boxright">
              <div className="hos-profile">
                <div className="hosprofile-img">
                  <img
                    src={`https://dev.medflick.com/hospital/${hospitalDetails.icon}`}
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
