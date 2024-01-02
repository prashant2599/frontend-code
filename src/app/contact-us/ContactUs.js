"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const ContactUs = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (index) => {
    setActiveItem(index === activeItem ? null : index);
  };
  return (
    <>
      <ScrollToTop />{" "}
      <section id="contact-head">
        <div className="midbox-inner  wiki-mk">
          <div className="contact-box">
            <h1>Need Assistance?</h1>
            <p>
              Our dedicated experts are ready to assist, eager to address any
              inquiries you might have
            </p>

            <Link href="/free-consultation" className="learn">
              Call me Back <img src="/images/2023/01/arrow-w.png" alt="" />
            </Link>
          </div>
        </div>
      </section>
      <section className="support-medflick">
        <div className="midbox-inner  wiki-mk">
          <div className="support-box">
            <div
              className={`support-itembox ${activeItem === 0 ? "active" : ""}`}
            >
              <h2>Chat with Sales</h2>
              <p>Speak to our friendly team</p>
              <a
                href="mailto:care@medflick.com"
                className="sales-box"
                onClick={() => handleItemClick(0)}
              >
                care@medflick.com{" "}
                <img src="/images/2023/01/arrow-c.png" alt="" />
              </a>
            </div>

            <div
              className={`support-itembox ${activeItem === 1 ? "active" : ""}`}
            >
              <h2>Chat with Support</h2>
              <p>We’re here to help</p>
              <a
                href="mailto:care@medflick.com"
                className="sales-box"
                onClick={() => handleItemClick(1)}
              >
                care@medflick.com{" "}
                <img src="/images/2023/01/arrow-c.png" alt="" />
              </a>
            </div>

            <div
              className={`support-itembox ${activeItem === 2 ? "active" : ""}`}
            >
              <h2>Visit Us</h2>
              <p>
                View our office HQ : D-213 Sector - 63, Noida - 201301 India
              </p>
              <a
                href="#"
                className="sales-box"
                onClick={() => handleItemClick(2)}
              >
                View on Google Maps{" "}
                <img src="/images/2023/01/arrow-c.png" alt="" />
              </a>
            </div>

            <div
              className={`support-itembox ${activeItem === 3 ? "active" : ""}`}
            >
              <h2>Call Us</h2>
              <p>we are available 24/7</p>
              <a
                href="tel:+919111922232"
                className="sales-box"
                onClick={() => handleItemClick(3)}
              >
                (+91) 9111922232{" "}
                <img src="/images/2023/01/arrow-c.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
