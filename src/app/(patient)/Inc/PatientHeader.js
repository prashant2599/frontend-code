"use client";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/UserContext";
import HeaderSearch from "@/app/Home/Inc/HeaderSearch";

const PatientHeader = () => {
  const router = useRouter();
  const { userData } = useUser();
  const [isOffcanvas, setIsOffcanvas] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");

    if (storedUserName) {
      const firstWord = storedUserName.split(" ")[0];
      const capitalizedFirstWord =
        firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
      setUserName(capitalizedFirstWord);
    }
  }, []);

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
      const sticky = header.offsetTop;

      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    // Attach scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isActive, setIsActive] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    // Remove 'userName' from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");

    // Clear the user name in the component state
    // setUserNames("");
    setUserName("");
    window.location.reload();
  };

  const displayText =
    userData && userData.name
      ? `${
          userData.name.split(" ")[0].charAt(0).toUpperCase() +
          userData.name.split(" ")[0].slice(1)
        }`
      : null;
  return (
    <>
      <header className="header" id="header-id">
        <div className="headerTertiary">
          <Link href="/patient-dashboard" target="_self" className="logo-d">
            {" "}
            <img src="/images/2023/01/logo.png" alt="Brand Logo" />
          </Link>
          <div className="topnav-right page-header">
            <nav>
              <div className="top-menu-wrapper">
                <ul className="top-menu">
                  <li>
                    <Link href="/patient-dashboard"> Home </Link>
                  </li>
                  {/* <li className="has-dropdown dropdown">
                    <a href="#" className="dropbtn">
                      Search
                      <i>
                        <FaChevronDown />
                      </i>
                    </a>
                  </li> */}

                  <li>
                    <Link href="/patient-quote">Request Quote</Link>
                  </li>
                  {/* <li>
                    <a href="#"> Message </a>
                  </li>
                  <li>
                    <a href="#"> Videos </a>
                  </li> */}
                  <li>
                    <Link href="/get-visa-assistance"> Visa Assistance </Link>
                  </li>
                  <li>
                    <Link href="/patient-account"> View Profile </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="navbar__buttons">
            {/* <div className="most-recent">
              <select className="jdgm-sort-dropdown" aria-label="Sort dropdown">
                <option value="select-language">Select Language</option>
                <option value="English" selected>
                  {" "}
                  English
                </option>
              </select>
            </div> */}

            <a className="navigation" href="#">
              <img src="/images/note.png" alt="notification" />
            </a>
            {/* <a className="man-top">
              <img src="/images/userIcon.png" alt="profile" /> {userName}
            </a> */}
            <div className="action">
              <div className="man-top" onClick={toggleMenu}>
                <img src="/images/userIcon.png" /> {displayText}
              </div>
              <div className={`menu-dashboard ${isActive ? "active" : ""}`}>
                <ul>
                  <li>
                    <img src="/images/website.png" />
                    <Link
                      href="/"
                      onClick={() => {
                        toggleMenu(); // Close the offcanvas
                        router.push("/"); // Navigate to the link
                      }}
                    >
                      Visit Website
                    </Link>
                  </li>
                  <li>
                    <img src="/images/profile.png" />
                    <Link
                      href="/patient-account"
                      onClick={() => {
                        toggleMenu(); // Close the offcanvas
                        router.push("/patient-account"); // Navigate to the link
                      }}
                    >
                      View profile
                    </Link>
                  </li>
                  <li>
                    <img src="/images/logout.png" />
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="headerSecondry">
          <div className="header-inner wiki-mk">
            <Link href="/patient-dashboard" target="_self" className="logo-m">
              {" "}
              <img src="images/2023/01/logo.png" alt="Brand Logo" />
            </Link>

            <nav className="navbar">
              <span className="open-menu" onClick={toggleOffcanvas}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16">
                  <g fill="#fff" fill-rule="evenodd">
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
                      <img src="/images/2023/01/logo.png" alt="Brand Logo" />
                    </a>
                    <span className="close-menu" onClick={toggleOffcanvas}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                      >
                        <path
                          fill="#fff"
                          fill-rule="evenodd"
                          d="M17.778.808l1.414 1.414L11.414 10l7.778 7.778-1.414 1.414L10 11.414l-7.778 7.778-1.414-1.414L8.586 10 .808 2.222 2.222.808 10 8.586 17.778.808z"
                        ></path>
                      </svg>
                    </span>
                  </li>
                  <li>
                    <HeaderSearch />
                  </li>

                  <li className="menu-item has-collapsible">
                    <a href="#"> Home</a>
                  </li>
                  {/* <li className="menu-item has-collapsible">
                    <a href="#" onClick={handleCollapsibleClick}>
                      <span></span> Search
                    </a>
                    <ul className="menu-child">
                      <li className="menu-child-item">
                        <a href="#">Treatments </a>
                      </li>
                      <li className="menu-child-item">
                        <a href="#">Hospitals </a>
                      </li>
                    </ul>
                  </li> */}
                  <li className="menu-item has-collapsible">
                    <Link href="/patient-quote"> Request Quote</Link>
                  </li>
                  {/* <li className="menu-item has-collapsible">
                    <a href="#"> Message </a>
                  </li>
                  <li className="menu-item has-collapsible">
                    <a href="#">Videos</a>
                  </li> */}
                  <li className="menu-item has-collapsible">
                    <Link href="/get-visa-assistance">Visa Assistance</Link>
                  </li>
                  <li className="menu-item">
                    <a
                      onClick={() => {
                        toggleOffcanvas();
                        router.push("/patient-account");
                      }}
                      className="login-link"
                    >
                      View Profile
                    </a>
                  </li>
                  <div className="menu-footer">
                    <a
                      className="qsk-question"
                      href="#"
                      style={{ color: "#ff6800 !important" }}
                    >
                      Ask FREE Question{" "}
                      <img src="/images/whiteArrow.png" alt="" />
                    </a>

                    <div className="menu-footer-link">
                      <Link
                        href="/blogs"
                        onClick={() => {
                          toggleOffcanvas();
                          router.push("/blogs");
                        }}
                      >
                        Blogs
                      </Link>
                      <Link
                        href="/about-us"
                        onClick={() => {
                          toggleOffcanvas();
                          router.push("/about-us");
                        }}
                      >
                        About Us
                      </Link>
                      <a
                        href="/contact-us"
                        onClick={() => {
                          toggleOffcanvas();
                          router.push("/contact-us");
                        }}
                      >
                        Help
                      </a>
                    </div>
                  </div>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default PatientHeader;
