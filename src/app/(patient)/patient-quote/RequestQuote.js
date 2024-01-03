"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchSpeciality from "./SearchSpeciality";

const RequestQuote = () => {
  const router = useRouter();
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
  });

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

  const initialActivePackage =
    speciality && speciality.length > 0 ? speciality[0].slug : null;
  const [activePackage, setActivePackage] = useState("transplants");

  const handlePackageClick = (packageId) => {
    setActivePackage(packageId);
  };
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (activePackage) {
      // Fetch the details data based on the activePackage ID
      axios
        .get(`https://dev.medflick.com/api/speciality/${activePackage}`)
        .then((response) => {
          setDetails(response.data.data.treatment_list);
        })
        .catch((error) => {
          console.error("Error fetching details data:", error);
        });
    }
  }, [activePackage]);

  const back = () => {
    navigate(-1);
  };

  // for continue button
  const [selectedtreatmentId, setSelectedtreatmentId] = useState(null);
  const [selectedspecialityId, setSelectedspecialityId] = useState(null);
  const [selectedspecialityName, setSelectedspecialityName] = useState(null);
  const [selectedTreatmentName, setSelectedTreatmentName] = useState(null);

  // const handleNameClick = (id, spe, speNAME, treatmentName) => {
  //   if (id === selectedtreatmentId) {
  //     // If the clicked item is already selected, deselect it
  //     setShowContinue(false);
  //     setSelectedtreatmentId(null);
  //     setSelectedspecialityId(null);
  //     setSelectedspecialityName(null);
  //     setSelectedTreatmentName(null);
  //   } else {
  //     // If the clicked item is not selected, select it
  //     setShowContinue(true);
  //     setSelectedtreatmentId(id);
  //     setSelectedspecialityId(spe);
  //     setSelectedspecialityName(speNAME);
  //     setSelectedTreatmentName(treatmentName);
  //   }
  // };
  const handleNameClick = (id, spe, speNAME, treatmentName) => {
    // Save selected data to localStorage
    localStorage.setItem("treatment", id);
    localStorage.setItem("speciality", spe);
    localStorage.setItem("selectedspecialityName", speNAME);
    localStorage.setItem("selectedTreatmentName", treatmentName);

    // Redirect to the patient-report page
    router.push("/patient-select");
  };
  // useEffect(() => {
  //   localStorage.setItem("treatment", selectedtreatmentId);
  //   localStorage.setItem("speciality", selectedspecialityId);
  // }, [selectedtreatmentId, selectedspecialityId]);

  console.log(selectedtreatmentId);
  console.log(selectedTreatmentName);

  const clearSelectedTreatment = () => {
    setSelectedtreatmentId(null);
    setSelectedTreatmentName("");
    setShowContinue(false);
  };

  const [selectedItemId, setSelectedItemId] = useState(null);

  return (
    <>
      <section id="request-quote-section">
        <div className="midbox-inner wiki-mk">
          <div className="top-back">
            <Link href="/patient-dashboard">
              <img src="/images/2023/01/back-icon.png" alt="icon" /> Back
            </Link>
            <div className="barbox">
              <div className="barbox-bar">
                <img src="images/2023/02/3.png" /> Select Medical Problem
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Select Doctor &amp; Hospital
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Patient Details
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Upload Medical Report
              </div>
              <div className="barbox-bar">
                <img src="images/2023/02/2.png" /> Get Quotes
              </div>
            </div>
          </div>

          <div className="request-quote">
            <h1>What is the medical problem you want to address?</h1>
            <SearchSpeciality />

            <h2>Medical conditions & Services</h2>

            <div className="conditions-services">
              <div className="health-tabs">
                {speciality &&
                  speciality.map((e) => (
                    <button
                      //   className="conditions active"
                      className={`conditions ${
                        activePackage === e.slug ? "active" : ""
                      }`}
                      onClick={() => handlePackageClick(e.slug)}
                      id={e.id}
                      key={e.id}
                    >
                      <img
                        src={`https://dev.medflick.com/speciality/${e.icon}`}
                        alt={e.name}
                        className="health-tabs-img"
                      />
                      {e.name}
                    </button>
                  ))}
              </div>
              {speciality &&
                speciality.map((e) => (
                  <div
                    key={e.id}
                    id={e.id}
                    // className="conditionsbox"
                    className={`conditionsbox ${
                      activePackage === e.slug ? "active" : ""
                    }`}
                    style={{
                      display: activePackage === e.slug ? "block" : "none",
                    }}
                  >
                    <div className="specialists-item">
                      {details.map((items) => (
                        <div className="specialists-boxitem" key={items.id}>
                          <div
                            className="boxitem"
                            onClick={() =>
                              handleNameClick(
                                items.id,
                                e.id,
                                e.slug,
                                items.slug
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={`https://dev.medflick.com/speciality/${e.icon}`}
                              alt={`${e.name} hospitals`}
                            />
                            <h4>{items.name} </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* {showContinue && (
              <div className="continue-buttonbox">
                <Link
                  href="/patient-report"
                  state={{
                    selectedtreatmentId,
                    selectedspecialityId,
                    selectedspecialityName,
                  }}
                  className="continue"
                >
                  Continue
                </Link>
              </div>
            )} */}
          </div>
        </div>
      </section>

      <section id="section-assistance">
        <div className="midbox-inner wiki-mk">
          <ul>
            <li>
              <h3>Need Assistance?</h3>
              <p>Can’t find what you’re looking for? Let up help</p>
              <a href="#/" className="get-help">
                {" "}
                Get Help
              </a>
            </li>
            <li>
              <h3>Need Assistance?</h3>
              <p>Can’t find what you’re looking for? Let up help</p>
              <a href="#/" className="get-help">
                {" "}
                Get Help
              </a>
            </li>
            <li>
              <h3>Need Assistance?</h3>
              <p>Can’t find what you’re looking for? Let up help</p>
              <a href="#/" className="get-help">
                {" "}
                Get Help
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default RequestQuote;
