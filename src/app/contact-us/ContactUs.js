"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import CallMeBackForm from "./CallMeBackForm";

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

            <CallMeBackForm />
          </div>
        </div>
      </section>
      <section className="support-medflick">
        <div className="midbox-inner  wiki-mk">
          <div className="support-box">
            <div
              className={`support-itembox ${activeItem === 0 ? "active" : ""}`}
            >
              <h2>Chat with Med Buddy</h2>
              <p>Speak to our friendly team</p>
              <a
                href="mailto:care@medflick.com"
                className="sales-box"
                onClick={() => handleItemClick(0)}
              >
                care@medflick.com{" "}
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/01/arrow-c.png`}
                  alt="medflick-chat"
                />
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
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/01/arrow-c.png`}
                  alt="medflick-email"
                />
              </a>
            </div>

            <div
              className={`support-itembox ${activeItem === 2 ? "active" : ""}`}
            >
              <h2>Visit Us</h2>
              <p>
                View our office HQ : D-213 Sector - 63, Noida - 201301, India
              </p>
              <a
                href="#"
                className="sales-box"
                onClick={() => handleItemClick(2)}
              >
                View on Google Maps{" "}
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/01/arrow-c.png`}
                  alt="medflick-map"
                />
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
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/01/arrow-c.png`}
                  alt="medflick-number"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
