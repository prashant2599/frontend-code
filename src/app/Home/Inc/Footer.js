"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CgFacebook } from "react-icons/cg";
import { GoChevronDown } from "react-icons/go";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiOutlineInstagram,
  AiFillLinkedin,
  AiOutlinePlus,
} from "react-icons/ai";

import Link from "next/link";
const Footer = () => {
  const [speciality, setSpeciality] = useState([]);
  useEffect(() => {
    // Fetch the details data based on the activePackage ID
    axios
      .get(`https://dev.medflick.com/api`)
      .then((response) => {
        setSpeciality(response.data.data.Speciality);
      })
      .catch((error) => {
        console.error("Error fetching details data:", error);
      });
  }, []);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  // Function to toggle the visibility of the list
  const toggleAbout = () => {
    setIsAboutVisible(!isAboutVisible);
  };

  // const contentStyle = {
  //   display: isOpen ? "none" : "block",
  // };

  // active in active
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (event) => {
    const button = event.currentTarget;
    const targetFooterbox = button.nextElementSibling;

    // Close all open windows
    document.querySelectorAll(".footerbox").forEach((footerbox) => {
      if (footerbox !== targetFooterbox) {
        footerbox.style.display = "none";
      }
    });

    // Toggle this window open/close
    targetFooterbox.style.display =
      targetFooterbox.style.display === "block" ? "none" : "block";

    // Set the active button
    setActiveButton(button);
  };
  return (
    <>
      <footer>
        <div className="midbox-inner wiki-mk">
          <div className="footer-logo">
            <div className="footer-logobox">
              <Link href="/" target="_self">
                <img src="/images/2023/01/logo.png" alt="Medflick" />
              </Link>
            </div>
            <div className="footer-customer">
              <h2>24X7 Support:</h2>
              <p>
                Beyond Boundaries, Around the Clock Healthcare knows no
                boundaries, and neither does our support. Medflick&apos;s 24/7
                availability ensures that whether you&apos;re at home or halfway
                across the world, we&apos;re here to provide the guidance you
                need.
              </p>
              <Link href="/contact-us">
                Contact us <img src="/images/2023/01/arrow-c.png" alt="" />
              </Link>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-navbox">
              <h4
                className={`but ${activeButton === "button1" ? "active" : ""}`}
                onClick={handleButtonClick}
              >
                Medflick{" "}
                <i className="fotter-icon">
                  <AiOutlinePlus style={{ fontSize: "22px" }} />
                </i>
              </h4>

              <ul className="footerbox">
                <li>
                  <Link href="/about-us" target="_self">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" target="_self">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" target="_self">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/doctors" target="_self">
                    For Doctors
                  </Link>
                </li>
                <li>
                  <Link href="/partners" target="_self">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-navbox">
              <h4
                className={`but ${activeButton === "button2" ? "active" : ""}`}
                onClick={handleButtonClick}
              >
                Treatments
                <i className="fotter-icon">
                  <AiOutlinePlus style={{ fontSize: "22px" }} />
                </i>
              </h4>
              <ul className="footerbox">
                {speciality &&
                  speciality.map((e) => (
                    <Link
                      href={`/speciality/${e.slug}`}
                      key={e.id}
                    >
                      <li>{e.name}</li>
                    </Link>
                  ))}
              </ul>
            </div>
            <div className="footer-navbox">
              <h4
                className={`but ${activeButton === "button3" ? "active" : ""}`}
                onClick={handleButtonClick}
              >
                Quick Links{" "}
                <i className="fotter-icon">
                  <AiOutlinePlus style={{ fontSize: "22px" }} />
                </i>
              </h4>
              <ul className="footerbox">
                <li>
                  <Link href="/blogs" target="_self">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/question-answer" target="_self">
                    Q&A
                  </Link>
                </li>
                <li>
                  <Link href="/question-answer" target="_self">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/query" target="_self">
                    Request a free quote
                  </Link>
                </li>
                {/* <li>
                  <a href="#" target="_self">
                    Non Proident{" "}
                  </a>
                </li>
                <li>
                  <a href="#" target="_self">
                    Anim ipsum
                  </a>
                </li> */}
              </ul>
            </div>
            <div className="footer-navbox">
              <h4
                className={`but ${activeButton === "button4" ? "active" : ""}`}
                onClick={handleButtonClick}
              >
                Watch
                <i className="fotter-icon">
                  <AiOutlinePlus style={{ fontSize: "22px" }} />
                </i>
              </h4>
              <ul className="footerbox">
                <li>
                  <a href="#" target="_self">
                    Expert Videos
                  </a>
                </li>
                <li>
                  <a href="#" target="_self">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" target="_self">
                    Technological Updates
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-navbox">
              <h4
                className={`but ${activeButton === "button5" ? "active" : ""}`}
                onClick={handleButtonClick}
              >
                Support
                <i className="fotter-icon">
                  <AiOutlinePlus style={{ fontSize: "22px" }} />
                </i>
              </h4>
              <ul className="footerbox">
                <li>
                  <Link href="/contact-us" target="_self">
                    Write to us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" target="_self">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/terms" target="_self">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" target="_self">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="copyright">
            <div className="wiki">
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/company/medflickdotcom/"
                    target="_black"
                  >
                    <AiFillLinkedin style={{ fontSize: "20px" }} />
                  </a>
                </li>
                <li>
                  <a href=" https://twitter.com/MedFlick" target="_black">
                    <AiOutlineTwitter style={{ fontSize: "20px" }} />
                  </a>
                </li>
                {/* <li>
                  <a href="#" target="_black">
                    <AiFillYoutube style={{ fontSize: "20px" }} />
                  </a>
                </li> */}
                <li>
                  <a
                    href=" https://www.instagram.com/mymedflick/?hl=en"
                    target="_black"
                  >
                    <AiOutlineInstagram style={{ fontSize: "20px" }} />
                  </a>
                </li>
              </ul>
            </div>
            <div className="wh">
              © Medflick, 2023. All rights reserved. |
              <a href="#" target="_black">
                Privacy Policy
              </a>{" "}
              |
              <a href="#" target="_black">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
