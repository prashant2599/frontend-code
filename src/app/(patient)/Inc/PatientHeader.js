"use client"
import {useEffect} from "react";
import { GoChevronDown } from "react-icons/go";
import Link from "next/link";

const PatientHeader = () => {
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
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <header class="header" id="header-id">
        <div class="headerTertiary">
          <Link href="/patient-dashboard" target="_self" class="logo-d">
            {" "}
            <img src="images/2023/01/logo.png" alt="Brand Logo" />
          </Link>
          <div class="topnav-right page-header">
            <nav>
              <div class="top-menu-wrapper">
                <ul class="top-menu">
                  <li>
                    <a href="#"> Home </a>
                  </li>
                  <li class="has-dropdown dropdown">
                    <a href="#" class="dropbtn">
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
          <div class="navbar__buttons">
            <div class="most-recent">
              <select class="jdgm-sort-dropdown" aria-label="Sort dropdown">
                <option value="select-language">Select Language</option>
                <option value="English" selected>
                  {" "}
                  English
                </option>
              </select>
            </div>

            <a class="navigation" href="#">
              <img src="/images/note.png" alt="notification" />
            </a>
            <a class="man-top" href="#">
              <img src="/images/man-icon.png" alt="profile" /> Alex
            </a>
          </div>
        </div>

        <div class="headerSecondry">
          <div class="header-inner wiki-mk">
            <a href="index.html" target="_self" class="logo-m">
              {" "}
              <img src="images/2023/01/logo.png" alt="Brand Logo" />
            </a>

            <nav class="navbar">
              <span class="open-menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16">
                  <g fill="#fff" fill-rule="evenodd">
                    <path d="M0 0h24v2H0zM0 7h24v2H0zM0 14h24v2H0z" />
                  </g>
                </svg>
              </span>
              <div class="menu-wrapper">
                <ul class="menu">
                  <li class="menu-block">
                    <span class="close-menu">
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

                  <li class="menu-item has-collapsible">
                    <a href="#"> Home</a>
                  </li>
                  <li class="menu-item has-collapsible">
                    <a href="#">
                      <span></span> Search
                    </a>
                    <ul class="menu-child">
                      <li class="menu-child-item">
                        <a href="#">Treatments </a>
                      </li>
                      <li class="menu-child-item">
                        <a href="#">Hospitals </a>
                      </li>
                    </ul>
                  </li>
                  <li class="menu-item has-collapsible">
                    <a href="#"> Request Quote</a>
                  </li>
                  <li class="menu-item has-collapsible">
                    <a href="#"> Message </a>
                  </li>
                  <li class="menu-item has-collapsible">
                    <a href="#">Videos</a>
                  </li>
                  <li class="menu-item has-collapsible">
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
