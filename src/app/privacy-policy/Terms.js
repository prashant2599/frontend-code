"use client";

import { useEffect, useState } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const Terms = () => {
  const [latestDate, setLatestDate] = useState({
    day: 0,
    month: "",
    year: 0,
  });

  useEffect(() => {
    // Function to update the latest date
    const updateLatestDate = () => {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Months are 0-indexed
      const year = currentDate.getFullYear();

      setLatestDate({
        day,
        month,
        year,
      });
    };

    // Call the function to set the initial state
    updateLatestDate();

    // Set up an interval or other triggers to update the date as needed
    // For example, update the date every minute
    const intervalId = setInterval(updateLatestDate, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <ScrollToTop />{" "}
      <section id="medflick-disclaimer">
        <div className="midbox-inner  wiki-mk">
          <h1>Medflick&apos;s Privacy Statement</h1>

          <h2>
            Last updated on {latestDate.day}/{latestDate.month}/
            {latestDate.year}
          </h2>

          <p>
            Your privacy is essential to us at Medflick. This Privacy Statement
            explains how we collect, use, disclose, and safeguard your personal
            information when you use our website and services. You consent to
            the practices outlined in this policy by using Medflick.
          </p>

          <h2> The Data We Gather </h2>

          <ul>
            <li>
              {" "}
              <strong> Personal Information:</strong> When you use our website
              and services, we may collect personal information such as your
              name, email address, and any other information you submit
              voluntarily.{" "}
            </li>

            <li>
              {" "}
              <strong> Usage Data:</strong> We gather information about your
              interactions with our platform, such as your IP address, browser
              type, operating system, and sites visited.{" "}
            </li>

            <li>
              {" "}
              <strong> Cookies and Tracking technology:</strong> To improve your
              experience on our website, we utilize cookies and related tracking
              technology. You may change your cookie options in your
              browser&pos;s settings.{" "}
            </li>
          </ul>

          <h2> How We Will Use Your Data </h2>
          <ul>
            <li>
              {" "}
              We use your personal information to deliver and improve our
              services, answer to your enquiries, and keep you updated on new
              products, services and promotions.
            </li>

            <li>
              We evaluate trends, administer our website, and collect
              demographic information for aggregate purposes using usage
              information.
            </li>

            <li>
              {" "}
              We may use your information to tailor your experience, such as by
              delivering material based on your preferences.
            </li>
          </ul>

          <h2> Information Dissemination </h2>
          <ul>
            <li>
              We do not sell, rent, or transfer your personal information for
              marketing purposes to third parties.
            </li>

            <li>
              We may share your information with third-party service providers
              who help us operate our platform and perform our services. These
              service providers are limited by confidentiality agreements and
              can only use your information for particular reasons.
            </li>

            <li>
              {" "}
              We may be obliged by law, regulation, legal process, or government
              request to reveal your information.
            </li>
          </ul>

          <h2> Data Safety </h2>
          <ul>
            <li>
              {" "}
              We use reasonable security measures to prevent unauthorized
              access, alteration, disclosure, or destruction of your personal
              information.
            </li>

            <li>
              {" "}
              Please keep in mind, however, that no mode of data transfer over
              the internet is completely secure. We cannot ensure the security
              of any information you provide to our platform.
            </li>
          </ul>

          <h2> Third-Party Connections</h2>
          <p>
            {" "}
            Links to third-party websites may be found on Medflick. We have no
            control over these websites privacy practices and are not
            responsible for their content or practices.
          </p>

          <h2> The Privacy of Children</h2>
          <p>
            {" "}
            Medflick is not designed for use by children under the age of 18. We
            do not collect personal information deliberately from minors under
            the age of 18. If you suspect we have obtained information from a
            kid under the age of 18, please contact us so that we can delete it.
          </p>

          <h2> Modifications to this Privacy Statement</h2>
          <p>
            {" "}
            This Privacy Policy may be updated from time to time. Any
            modifications will be noted on this page, and the amended policies
            will go into effect as soon as they are posted.
          </p>

          <h2> Get in Touch</h2>
          <p>
            {" "}
            Please contact us at contact@medflick.com if you have any questions
            or concerns about this Privacy Policy or your personal information.{" "}
          </p>
        </div>
      </section>
    </>
  );
};

export default Terms;
