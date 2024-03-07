"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GoChevronDown } from "react-icons/go";
import MobileSearch from "./MobileSearch";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";
import HeaderSearch from "./HeaderSearch";
import MobileSideBarShare from "./MobileSideBarShare";

import MobileAskFreeQuestion from "./MobileAskFreeQuestion";

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

  useEffect(() => {
    // Function to handle scroll
    function handleScroll() {
      const header = document.getElementById("header-id");

      // Check if the header element exists
      if (header) {
        const sticky = header.offsetTop;

        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    }

    // Attach scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [userNames, setUserNames] = useState("");
  const { userName, setUserName } = useUser();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserNames(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    // Remove 'userName' from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");

    // Clear the user name in the component state
    setUserNames("");
    setUserName("");
    window.location.reload();
  };

  return (
    <>
      <div className="headerSecondry">
        <div className="header-inner wiki-mk">
          <Link href="/" target="_self" className="logo-m">
            {" "}
            <img
              src={`${process.env.NEXT_PUBLICK_IMAGE_URL}/2023/01/logo.webp`}
              alt="Medflick"
            />
          </Link>
          {/* Mobile serach */}
          <MobileSearch />
          {/* End */}
          <div className="m-phone">
            <a href="tel:+91-9111922232">
              <img
                src={`${process.env.NEXT_PUBLICK_IMAGE_URL}/2023/phone-icon.png`}
                alt="phone-icon"
              />
            </a>
          </div>
          <div className="get-started-m">
            <Link href="/request-a-free-quote">
              Get Started{" "}
              {/* <img src="/images/2023/01/arrow-w.png" alt="arrow-icon" /> */}
            </Link>
          </div>

          <nav className="navbar">
            <span className="open-menu" onClick={toggleOffcanvas}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16">
                <g fill="#ffffff" fillRule="evenodd">
                  <path d="M0 0h24v2H0zM0 7h24v2H0zM0 14h24v2H0z" />
                </g>
              </svg>
            </span>
            <div className={`menu-wrapper${isOffcanvas ? " offcanvas" : ""}`}>
              <ul className="menu">
                <li className="menu-block">
                  <a
                    onClick={() => {
                      toggleOffcanvas();
                      router.push("/");
                    }}
                  >
                    {" "}
                    <img
                      src={`${process.env.NEXT_PUBLICK_IMAGE_URL}/2023/01/logo.webp`}
                      alt="Brand Logo"
                    />
                  </a>
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
                      ></path>
                    </svg>
                  </span>
                </li>
                <li>
                  {/* <div className="head-searchbox">
                    <input
                      type="text"
                      placeholder="Search Medflick"
                      name="name"
                      required=""
                    />
                   
                  </div> */}
                  <HeaderSearch />
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
                            {e.name}
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
                            href={`/doctors/${e.slug}`}
                            className="dropbtn"
                            onClick={() => {
                              toggleOffcanvas();
                              router.push(`/doctors/${e.slug}`);
                            }}
                          >
                            {e.name} Doctors
                          </Link>{" "}
                        </li>
                      ))}
                  </ul>
                </li>
                {/* {userName || userNames ? (
                  <li className="menu-item has-collapsible">
                    <a
                      onClick={handleCollapsibleClick}
                      className="submenu-link"
                    >
                      My Account
                      <i style={{ marginLeft: "11.5rem" }}>
                        <GoChevronDown
                          style={{
                            fontFamily: "Material Icons",
                            content: "'\\E5CC'",
                            fontSize: "1.5rem",
                            fontWeight: 400,
                            lineHeight: "inherit",
                            position: "absolute",
                    
                            right: "0.5rem",
                            color: "rgb(87, 87, 87)",
                            transition: "all 0.35s ease 0s",
                          }}
                        />
                      </i>
                    </a>
                    <ul className="menu-child">
                      <li className="menu-child-item">
                        {" "}
                        <Link
                          href="/patient-dashboard"
                          className="dropbtn"
                          onClick={() => {
                            toggleOffcanvas();
                            router.push("/patient-dashboard");
                          }}
                        >
                          Dashboard{" "}
                        </Link>
                      </li>

                      <li className="menu-child-item">
                        {" "}
                        <Link
                          href="/patient-account"
                          className="dropbtn"
                          onClick={() => {
                            toggleOffcanvas();
                            router.push("/patient-account");
                          }}
                        >
                          View profile{" "}
                        </Link>
                      </li>

                      <li className="menu-child-item">
                        {" "}
                        <a className="dropbtn" onClick={handleLogout}>
                          Logout{" "}
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="menu-item has-collapsible">
                    <a
                      onClick={() => {
                        toggleOffcanvas();
                        router.push("/login");
                      }}
                      className="submenu-link"
                    >
                      Login
                    </a>
                  </li>
                )} */}

                <li className="menu-item has-collapsible">
                  <Link
                    href="/blogs"
                    onClick={() => {
                      toggleOffcanvas();
                      router.push("/blogs");
                    }}
                    className="submenu-link"
                  >
                    Blogs
                  </Link>
                </li>

                <li className="menu-item ">
                  <Link
                    href="/question-answer"
                    onClick={() => {
                      toggleOffcanvas();
                      router.push("/question-answer");
                    }}
                    className="submenu-link"
                  >
                    Question & Answer
                  </Link>
                </li>
                {userName || userNames ? (
                  <li className="menu-item">
                    <Link
                      href="patient-dashboard"
                      onClick={() => {
                        toggleOffcanvas();
                        router.push("/patient-dashboard");
                      }}
                      className="login-link"
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="menu-item">
                      <Link
                        href="/login"
                        onClick={() => {
                          toggleOffcanvas();
                          router.push("/login");
                        }}
                        className="login-link"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link
                        href="/sign-up"
                        onClick={() => {
                          toggleOffcanvas();
                          router.push("/sign-up");
                        }}
                        className="sign-up-link"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
                <div className="menu-footer">
                  <MobileAskFreeQuestion />

                  <div className="menu-footer-link">
                    <MobileSideBarShare />
                    <Link
                      href="/about-us"
                      onClick={() => {
                        toggleOffcanvas();
                        router.push("/about-us");
                      }}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact-us"
                      onClick={() => {
                        toggleOffcanvas();
                        router.push("/contact-us");
                      }}
                    >
                      Help
                    </Link>
                  </div>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
