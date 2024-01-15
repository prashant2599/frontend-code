"use client";

import { useState, useEffect } from "react";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import {
  AiOutlineInstagram,
  AiFillLinkedin,
  AiOutlinePlus,
} from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const NewFooter = () => {
  const [speciality, setSpeciality] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllSpeciality();
        setSpeciality(result.data.Speciality);
      } catch (err) {
        console.log(err.message); // Set the error message in state
      }
    }

    fetchData();
  }, []);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
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

  const selectedSpecialities = speciality.slice(0, 4);
  return (
    <>
      <footer>
        <div className="midbox-inner wiki-mk">
          <div className="footer-section">
            <div className="footer-about">
              <img src="/images/2023/01/logo.png" alt="Brand Logo" />

              <p>
                Beyond boundaries and around-the-clock healthcare extends
                without limits, and so does our commitment. Medflick's 24/7
                availability ensures that whether you're at home or halfway
                across the world, we're here to provide the guidance you need.
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-navbox">
                <h4 className="footer-nav-des">Medflick</h4>
                <h4
                  className={`but ${
                    activeButton === "button1" ? "active" : ""
                  }`}
                  onClick={handleButtonClick}
                >
                  Medflick
                  <i className="fas fa-chevron-down">
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
                <h4 className="footer-nav-des">Treatments</h4>
                <h4
                  className={`but ${
                    activeButton === "button2" ? "active" : ""
                  }`}
                  onClick={handleButtonClick}
                >
                  Treatments
                  <i className="fas fa-chevron-down">
                    <AiOutlinePlus style={{ fontSize: "22px" }} />
                  </i>
                </h4>
                <ul className="footerbox">
                  {selectedSpecialities &&
                    selectedSpecialities.map((e) => (
                      <Link href={`/speciality/${e.slug}`} key={e.id}>
                        <li>{e.name}</li>
                      </Link>
                    ))}
                  <Link href="/specialities">
                    <li>View All</li>
                  </Link>
                </ul>
              </div>
              <div className="footer-navbox">
                <h4 className="footer-nav-des">Quick Links</h4>
                <h4
                  className={`but footer-nav-mob ${
                    activeButton === "button1" ? "active" : ""
                  }`}
                  onClick={handleButtonClick}
                >
                  Quick Links{" "}
                  <i className="fas fa-chevron-down">
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
                    <Link href="/request-a-free-quote" target="_self">
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
                <h4 className="footer-nav-des">Watch</h4>
                <h4
                  className={`but ${
                    activeButton === "button4" ? "active" : ""
                  }`}
                  onClick={handleButtonClick}
                >
                  Watch
                  <i className="fas fa-chevron-down">
                    <AiOutlinePlus style={{ fontSize: "22px" }} />
                  </i>
                </h4>
                <ul className="footerbox">
                  <li>
                    <a href="#" target="_self">
                      Expert Videos{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_self">
                      Testimonials{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_self">
                      Technological Updates{" "}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-navbox">
                <h4 className="footer-nav-des">Support</h4>
                <h4
                  className={`but ${
                    activeButton === "button5" ? "active" : ""
                  }`}
                  onClick={handleButtonClick}
                >
                  Support
                  <i className="fas fa-chevron-down">
                    <AiOutlinePlus style={{ fontSize: "22px" }} />
                  </i>
                </h4>
                <ul className="footerbox">
                  <li>
                    <Link href="/contact-us">Write to us</Link>
                  </li>
                  <li>
                    <Link href="/terms-and-conditions">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/disclaimer">Disclaimer</Link>
                  </li>
                </ul>
              </div>
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
                    <FaXTwitter style={{ fontSize: "20px" }} />
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
              © 2024 Medflick. All Rights Reserved |{" "}
              <Link href="/privacy-policy">Privacy Policy</Link> |{" "}
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default NewFooter;
