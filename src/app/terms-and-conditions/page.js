import React from "react";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";

const page = () => {
  return (
    <>
      <NewHeader />
      <section id="medflick-disclaimer">
        <div className="midbox-inner  wiki-mk">
          <h1>Medflick: Terms and Conditions</h1>
          <p>
            Welcome to Medflick! These terms and conditions set out the ground
            rules for using our website and services. You acknowledge and agree
            to be bound by these Terms by using this website and utilizing our
            services. If you disagree with these Terms, please do not use our
            website or services.
          </p>
          <h2>Definitions and Application</h2>
          <ul>
            <li>
              "Medflick," "we," "us," or "our" refer to the company and its
              employees.
            </li>
            <li>
              "User," "you," or "your" refers to any individual or entity who
              accesses or uses our website or services.
            </li>
          </ul>
          <h2>Website Use</h2>
          <ul>
            <li>
              To use our website and services, you must be at least 18 years
              old. You affirm that you are at least 18 years old by using our
              website.
            </li>
            <li>
              {" "}
              You consent to the usage of our website and services may only be
              for legitimate purposes and in accordance with all applicable laws
              and regulations.
            </li>
            <li>
              We reserve the right, at our sole discretion, to alter, stop, or
              cancel any aspect of the website or services at any time and
              without notice.
            </li>
          </ul>
          <h2>Intellectual Property Rights</h2>
          <ul>
            <li>
              {" "}
              Medflick owns the content on our website, including but not
              limited to text, graphics, photos, logos, trademarks, and
              software, and it is protected by copyright and other intellectual
              property laws.
            </li>
            <li>
              {" "}
              You may not duplicate, distribute, edit, display, or create
              derivative works from any of our website's content without our
              prior written permission.
            </li>
          </ul>
          <h2>Confidentiality</h2>
          <ul>
            <li>
              We respect your privacy and adhere to our Privacy Policy when
              handling your personal information. By utilizing our website and
              services, you agree to the practices outlined in our Privacy
              Policy.
            </li>
          </ul>
          <h2>Medical Advice Disclaimer</h2>
          <ul>
            <li>
              Medflick offers general healthcare information solely for
              educational purposes. Our website's content is not intended to be
              a substitute for professional medical advice, diagnosis, or
              treatment.
            </li>
            <li>
              Always seek the opinion of a trained healthcare expert if you have
              any medical conditions or concerns. Never disregard competent
              medical advice or put off getting it because of anything on this
              website.
            </li>
          </ul>
        </div>
      </section>
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `https://medflick.com/terms-and-conditions`,
    },
  };
}
