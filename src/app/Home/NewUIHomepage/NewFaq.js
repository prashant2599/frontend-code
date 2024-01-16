"use client";
import { useState } from "react";

const NewFaq = () => {
  const faqData = [
    {
      id: 1,
      short_description:
        "How can I get a second opinion and communicate with medical professionals on Medflick?",
      long_description:
        "Certainly! You can consult our doctors for an expert opinion on your diagnosis and treatment by booking an online consultation and sharing your medical history. Additionally, Medflick encourages user participation and interaction through forums, allowing you to share stories, ask questions, and learn from others who have faced similar health challenges—creating a platform that promotes information exchange and community assistance.",
    },
    {
      id: 2,
      short_description:
        "What medical specializations does Medflick provide coverage for?",
      long_description:
        "Medical disciplines covered by Medflick include Bone Marrow Transplant, Cancer/Oncology, Cardiac Sciences, IVF, Neurosurgery, Spine Surgery & Spinal Cord Damage, Plastic Surgery, and Rehabilitation. We attempt to give trustworthy information on a wide range of medical disorders and treatment choices.",
    },
    {
      id: 3,
      short_description: "Is Medflick available on all platforms?",
      long_description:
        "Yes, Medflick is intended to be used on a variety of devices. You can use your Desktop Computer, Laptop, Tablet, or Smartphone to access our platform, allowing you to study medical information and connect with the community whenever and wherever you want.",
    },
    {
      id: 4,
      short_description:
        "Can Medflick assist with my travel itinerary and visa for treatment in India?",
      long_description:
        "Certainly! To initiate your treatment planning with Medflick, book an online consultation and provide your medical history. Our dedicated team will assess the information and reach out to help plan your treatment, including assistance with travel itinerary and visa formalities.",
    },
    {
      id: 5,
      short_description: "Are the Hospitals or clinics accredited?",
      long_description:
        "Yes, the hospitals and clinics we are associated with are fully accredited, meeting either Indian (NABH) or International Standards (JCI) of healthcare quality and patient safety. These facilities consistently meet the stringent criteria set by the Quality Control of India (QCI), enhancing overall patient satisfaction by providing world-class treatment facilities.",
    },
  ];

  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleQuestionClick = (id) => {
    if (activeQuestion === id) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(id);
    }
  };
  return (
    <>
      <section id="home-faqs">
        <div className="midbox-inner wiki-mk">
          <div className="faqs-section">
            <div className="faqs-left">
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faqs-right">
              {faqData &&
                faqData.map((e, index) => (
                  <div
                    key={e.id}
                    className={`question ${
                      activeQuestion === index ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(index)}
                  >
                    <h5>{e.short_description}</h5>
                    <div
                      className={`arrow ${
                        activeQuestion === index ? "arrow-active" : ""
                      }`}
                    ></div>
                    {activeQuestion === index && (
                      <div className="answer" style={{ display: "block" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e.long_description,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewFaq;
