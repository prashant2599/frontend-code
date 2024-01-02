"use client";

import { useEffect } from "react";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};
const page = () => {
  return (
    <>
      <NewHeader />
      <ScrollToTop />
      <section id="medflick-disclaimer">
        <div className="midbox-inner  wiki-mk">
          <h1>Medflick Disclaimer</h1>

          <p>
            Welcome to Medflick! Our platform is committed to providing
            trustworthy healthcare information so that you can make educated
            decisions about your health and well-being. However, the following
            must be understood:
          </p>

          <ul>
            <li>
              {" "}
              <strong> Information in general:</strong> The information on
              Medflick is strictly for educational purposes. It is not intended
              to be a replacement for professional medical advice, diagnosis, or
              treatment. If you have any medical concerns, always seek the
              counsel of a certified healthcare expert.
            </li>

            <li>
              {" "}
              <strong> No Medical Support:</strong> Medical treatments,
              products, techniques, opinions, or healthcare practitioners are
              not endorsed or recommended by Medflick. The information provided
              is intended to be broad in nature and may not apply to specific
              instances.
            </li>

            <li>
              {" "}
              <strong> Precision and thoroughness:</strong> While we make every
              effort to give accurate and up-to-date information, medical
              knowledge is always changing. The information on Medflick may not
              always reflect the most recent changes in the medical sector.
            </li>

            <li>
              {" "}
              <strong> Individual Variability:</strong> Everyone's health and
              medical demands are unique. The material on Medflick may or may
              not be pertinent to your individual situation. For tailored
              advice, always visit a healthcare practitioner.
            </li>

            <li>
              {" "}
              <strong>
                {" "}
                Your use of Medflick is entirely at your own risk.
              </strong>{" "}
              You should not dismiss or postpone getting expert medical advice
              because of information gained on our platform. Any reliance on the
              information supplied is entirely at your own risk.
            </li>

            <li>
              {" "}
              <strong> Third-Party Links:</strong> Medflick may contain links to
              websites operated by third parties. These links are provided for
              your convenience; however, we have no control over or endorsement
              of the content of these websites. You access third-party websites
              at your own risk.
            </li>

            <li>
              {" "}
              <strong> No medical relationship:</strong> The use of Medflick
              does not result in the formation of a doctor-patient or healthcare
              provider-patient relationship. We do not offer medical advice,
              treatment, or prescriptions.
            </li>

            <li>
              {" "}
              <strong> Medical Emergencies:</strong> If you are experiencing a
              medical emergency, please seek immediate medical treatment or
              attending the nearest medical institution.{" "}
            </li>
          </ul>

          <p>
            You acknowledge and accept this disclaimer by using Medflick. If you
            have any questions or concerns about the information on our
            platform, we encourage you to seek the advice of a certified
            healthcare expert.
          </p>
        </div>
      </section>
      <NewFooter />
    </>
  );
};

export default page;
