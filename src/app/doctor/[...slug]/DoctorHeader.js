"use client";
import { useEffect } from "react";

const DoctorHeader = ({ docotorDetails, treament }) => {
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
              <a href="#about" target="_self">
                About
              </a>
            </li>
            <li>
              <a href="#specializations" target="_self">
                Specializations
              </a>
            </li>
            {treament.length > 0 && (
              <li>
                <a href="#services" target="_self">
                  Services
                </a>
              </li>
            )}
          </ul>

          <div className="expert-profilebox">
            <div className="dr-boxright">
              <div className="doc-profile">
                <img
                  src={`https://dev.medflick.com/doctor/${docotorDetails.image}`}
                  alt={docotorDetails.slug}
                />{" "}
                {docotorDetails.prefix} {docotorDetails.first_name}{" "}
                {docotorDetails.last_name}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorHeader;
