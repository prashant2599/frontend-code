"use client";
import { useEffect, useState } from "react";

const DoctorHeader = ({ docotorDetails, treament }) => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const handleScroll = () => {
    const profileLink = document.getElementById("profile-link");

    if (profileLink) {
      if (window.scrollY >= 100) {
        profileLink.classList.add("sticky-p");
      } else {
        profileLink.classList.remove("sticky-p");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
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
                href="#about"
                target="_self"
                className={activeLink === "about" ? "active" : ""}
                onClick={() => handleLinkClick("about")}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#specializations"
                target="_self"
                className={activeLink === "specializations" ? "active" : ""}
                onClick={() => handleLinkClick("specializations")}
              >
                Specializations
              </a>
            </li>
            {treament.length > 0 && (
              <li>
                <a
                  href="#services"
                  target="_self"
                  className={activeLink === "services" ? "active" : ""}
                  onClick={() => handleLinkClick("services")}
                >
                  Services
                </a>
              </li>
            )}
          </ul>

          <div className="expert-profilebox">
            <div className="dr-boxright">
              <div className="doc-profile">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/doctor/${docotorDetails.image}`}
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
