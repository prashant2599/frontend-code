"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GoChevronDown } from "react-icons/go";
import MobileSearch from "./MobileSearch";
import { useRouter } from "next/navigation";

const MobileHeader = ({ speciality }) => {
  const router = useRouter();
  const [isOffcanvas, setIsOffcanvas] = useState(false);

  const toggleOffcanvas = () => {
    setIsOffcanvas((prevIsOffcanvas) => !prevIsOffcanvas);
  };
  const handleCollapsibleClick = (event) => {
    const clickedCollapsible = event.target.closest(".has-collapsible");
    const allCollapsibles = document.querySelectorAll(".has-collapsible");

    allCollapsibles.forEach((collapsible) => {
      if (collapsible !== clickedCollapsible) {
        collapsible.classList.remove("active");
      }
    });

    clickedCollapsible.classList.toggle("active");
  };

  return (
    <>
      <div className="headerSecondry">
        <div className="header-inner wiki-mk">
          <Link href="/" target="_self" className="logo-m">
            {" "}
            <img src="/images/2023/01/logo.png" alt="Medflick" />
          </Link>
          {/* Mobile serach */}
          <MobileSearch />
          {/* End */}
          <div className="m-phone">
            <a href="tel:+91-9111922232">
              <img src="/images/2023/phone-icon.png" alt="phone-icon" />
            </a>
          </div>
          <div className="get-started-m">
            <Link href="/query">
              Get Started{" "}
              {/* <img src="/images/2023/01/arrow-w.png" alt="arrow-icon" /> */}
            </Link>
          </div>

          <nav className="navbar">
            <span className="open-menu" onClick={toggleOffcanvas}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16">
                <g fill="#444444" fillRule="evenodd">
                  <path d="M0 0h24v2H0zM0 7h24v2H0zM0 14h24v2H0z" />
                </g>
              </svg>
            </span>
            <div className={`menu-wrapper${isOffcanvas ? " offcanvas" : ""}`}>
              <ul className="menu">
                <li className="menu-block">
                  <span className="close-menu" onClick={toggleOffcanvas}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                    >
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M17.778.808l1.414 1.414L11.414 10l7.778 7.778-1.414 1.414L10 11.414l-7.778 7.778-1.414-1.414L8.586 10 .808 2.222 2.222.808 10 8.586 17.778.808z"
                      />
                    </svg>
                  </span>
                </li>

                <li className="menu-item has-collapsible">
                  <a href="#/" onClick={handleCollapsibleClick}>
                    Treatments
                    <i style={{ marginLeft: "10rem" }}>
                      <GoChevronDown
                        style={{
                          fontFamily: "Material Icons",
                          content: "'\\E5CC'",
                          fontSize: "1.5rem",
                          fontWeight: 400,
                          lineHeight: "inherit",
                          position: "absolute",
                          /* top: "5rem", */
                          right: "0.5rem",
                          color: "rgb(87, 87, 87)",
                          transition: "all 0.35s ease 0s",
                        }}
                      />
                    </i>
                  </a>
                  <ul className="menu-child">
                    {speciality &&
                      speciality.map((e) => (
                        <li className="menu-child-item" key={e.id}>
                          <Link
                            href={`/speciality/${e.slug}`}
                            className="dropbtn"
                            onClick={() => {
                              toggleOffcanvas(); // Close the offcanvas
                              router.push(`/speciality/${e.slug}`); // Navigate to the link
                            }}
                          >
                            {e.menu_name}
                          </Link>{" "}
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="menu-item has-collapsible">
                  <a href="#/" onClick={handleCollapsibleClick}>
                    Hospitals
                    <i style={{ marginLeft: "11rem" }}>
                      <GoChevronDown
                        style={{
                          fontFamily: "Material Icons",
                          content: "'\\E5CC'", // Use the Unicode code point instead of the character itself
                          fontSize: "1.5rem",
                          fontWeight: 400,
                          lineHeight: "inherit",
                          position: "absolute",
                          /* top: "5rem", */
                          right: "0.5rem",
                          color: "rgb(87, 87, 87)",
                          transition: "all 0.35s ease 0s",
                        }}
                      />
                    </i>
                  </a>
                  <ul className="menu-child">
                    {speciality &&
                      speciality.map((e) => (
                        <li className="menu-child-item" key={e.id}>
                          <Link
                            href={`/hospitals/${e.slug}`}
                            className="dropbtn"
                            onClick={() => {
                              toggleOffcanvas(); // Close the offcanvas
                              router.push(`/hospitals/${e.slug}`); // Navigate to the link
                            }}
                          >
                            {e.name} Hospitals
                          </Link>{" "}
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="menu-item has-collapsible">
                  <a href="#/" onClick={handleCollapsibleClick}>
                    Doctors
                    <i style={{ marginLeft: "11.5rem" }}>
                      <GoChevronDown
                        style={{
                          fontFamily: "Material Icons",
                          content: "'\\E5CC'", // Use the Unicode code point instead of the character itself
                          fontSize: "1.5rem",
                          fontWeight: 400,
                          lineHeight: "inherit",
                          position: "absolute",
                          /* top: "5rem", */
                          right: "0.5rem",
                          color: "rgb(87, 87, 87)",
                          transition: "all 0.35s ease 0s",
                        }}
                      />
                    </i>
                  </a>
                  <ul className="menu-child">
                    {speciality &&
                      speciality.map((e) => (
                        <li className="menu-child-item" key={e.id}>
                          <Link
                            href={`/doctors/${e.slug}`}
                            className="dropbtn"
                            onClick={() => {
                              toggleOffcanvas(); // Close the offcanvas
                              router.push(`/doctors/${e.slug}`); // Navigate to the link
                            }}
                          >
                            {e.name} Doctors
                          </Link>{" "}
                        </li>
                      ))}
                  </ul>
                </li>
                {/* <li className="menu-item has-collapsible">
                    <Link href="/">Testimonials</Link>
                  </li> */}
                <li className="menu-item has-collapsible">
                  <a
                    onClick={() => {
                      toggleOffcanvas();
                      router.push("/query");
                    }}
                  >
                    Book an Appointment
                  </a>
                </li>
                <li className="menu-item" style={{ background: "#ff6800" }}>
                  {/* <Link className="menu-link" style={{ color: "#fff" }}>
                    Quick info
                  </Link> */}
                </li>
                {/* <li className="menu-item">
                    <Link href="careers.html" className="submenu-link">
                      Careers
                    </Link>
                  </li> */}
                {/* <li className="menu-item">
                    <Link href="/" className="submenu-link">
                      News & Events
                    </Link>
                  </li> */}
                <li className="menu-item">
                  <a
                    onClick={() => {
                      toggleOffcanvas();
                      router.push("/blogs");
                    }}
                    className="submenu-link"
                  >
                    Blog
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    href="/contact-us"
                    onClick={() => {
                      toggleOffcanvas();
                      router.push("/contact-us");
                    }}
                    className="submenu-link"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
