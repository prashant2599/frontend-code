"use client";

import { useState, useEffect } from "react";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiOutlineInstagram,
  AiFillLinkedin,
  AiOutlinePlus,
} from "react-icons/ai";
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
  return (
    <>
      <footer>
        <div class="midbox-inner wiki-mk">
          <div class="footer-section">
            <div class="footer-about">
              <img src="/images/2023/01/logo.png" alt="Brand Logo" />
              <p>
                Beyond Boundaries, Around the Clock Healthcare knows no
                boundaries, and neither does our support. Medflick&apos;s 24/7
                availability ensures that whether you&apos;re at home or halfway
                across the world, we&apos;re here to provide the guidance you
                need.
              </p>
            </div>

            <div class="footer-links">
              <div class="footer-navbox">
                <h4 class="footer-nav-des">Medflick</h4>
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
              <div class="footer-navbox">
                <h4 class="footer-nav-des">Treatments</h4>
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
                  {speciality &&
                    speciality.map((e) => (
                      <Link href={`/speciality/${e.slug}`} key={e.id}>
                        <li>{e.name}</li>
                      </Link>
                    ))}
                </ul>
              </div>
              <div class="footer-navbox">
                <h4 class="footer-nav-des">Quick Links</h4>
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
              <div class="footer-navbox">
                <h4 class="footer-nav-des">Watch</h4>
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
                <ul class="footerbox">
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
              <div class="footer-navbox">
                <h4 class="footer-nav-des">Support</h4>
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
          </div>

          <div class="copyright">
            <div class="wiki">
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
            <div class="wh">
              © 2023 Medflick. All Rights Reserved |{" "}
              <a href="#" target="_black">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="#" target="_black">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    
    </>
  );
};

export default NewFooter;
