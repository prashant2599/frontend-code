"use client";

import Link from "next/link";
import { useEffect } from "react";


const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};


const ContactUs = () => {
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
              <div className="support-itembox active">
                <h2>Chat with Sales</h2>
                <p>Speak to our friendly team</p>

                <a href="#" className="sales-box">
                  care@medflick.com{" "}
                  <img src="/images/2023/01/arrow-c.png" alt="" />
                </a>
              </div>

              <div className="support-itembox">
                <h2>Chat with Support</h2>
                <p>We’re here to help</p>

                <a href="#" className="support-button">
                  care@medflick.com{" "}
                  <img src="/images/2023/01/arrow-w.png" alt="" />
                </a>
              </div>

              <div className="support-itembox">
                <h2>Visit Us</h2>
                <p>View our office HQ</p>

                <a href="#" className="support-button">
                  View on Google Maps{" "}
                  <img src="/images/2023/01/arrow-w.png" alt="" />
                </a>
              </div>

              <div className="support-itembox">
                <h2>Call Us</h2>
                <p>Mon-Fri: 10 AM - 7 PM</p>

                <a href="#" className="support-button">
                  (+91) 9111922232{" "}
                  <img src="/images/2023/01/arrow-w.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </section>
   </>
  )
}

export default ContactUs