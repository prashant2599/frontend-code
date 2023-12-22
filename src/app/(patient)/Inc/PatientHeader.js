"use client";
import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import Link from "next/link";

const PatientHeader = () => {
  const [isOffcanvas, setIsOffcanvas] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");

    if (storedUserName) {
      const firstWord = storedUserName.split(' ')[0];
      setUserName(firstWord);
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
  return (
    <>
      <header className="header" id="header-id">
        <div className="headerTertiary">
          <Link href="/patient-dashboard" target="_self" className="logo-d">
            {" "}
            <img src="images/2023/01/logo.png" alt="Brand Logo" />
          </Link>
          <div className="topnav-right page-header">
            <nav>
              <div className="top-menu-wrapper">
                <ul className="top-menu">
                  <li>
                    <a href="#"> Home </a>
                  </li>
                  <li className="has-dropdown dropdown">
                    <a href="#" className="dropbtn">
                      Search
                      <i>
                        <GoChevronDown style={{ fontSize: "22px" }} />
                      </i>
                    </a>
                  </li>

                  <li>
                    <a href="#">Request Quote</a>
                  </li>
                  <li>
                    <a href="#"> Message </a>
                  </li>
                  <li>
                    <a href="#"> Videos </a>
                  </li>
                  <li>
                    <a href="#"> Visa Assistance </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="navbar__buttons">
            <div className="most-recent">
              <select className="jdgm-sort-dropdown" aria-label="Sort dropdown">
                <option value="select-language">Select Language</option>
                <option value="English" selected>
                  {" "}
                  English
                </option>
              </select>
            </div>

            <a className="navigation" href="#">
              <img src="/images/note.png" alt="notification" />
            </a>
            <a className="man-top" >
              <img src="/images/userIcon.png" alt="profile" /> {userName}
            </a>
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
                        />
                      </svg>
                    </span>
                  </li>

                  <li className="menu-item has-collapsible">
                    <a href="#"> Home</a>
                  </li>
                  <li className="menu-item has-collapsible">
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
                  </li>
                  <li className="menu-item has-collapsible">
                    <a href="#"> Request Quote</a>
                  </li>
                  <li className="menu-item has-collapsible">
                    <a href="#"> Message </a>
                  </li>
                  <li className="menu-item has-collapsible">
                    <a href="#">Videos</a>
                  </li>
                  <li className="menu-item has-collapsible">
                    <a href="#">Visa Assistance</a>
                  </li>
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
