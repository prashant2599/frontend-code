"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  const handleNameClick = (id, spe, speNAME, treatmentName) => {
    if (id === selectedtreatmentId) {
      // If the clicked item is already selected, deselect it
      setShowContinue(false);
      setSelectedtreatmentId(null);
      setSelectedspecialityId(null);
      setSelectedspecialityName(null);
      setSelectedTreatmentName(null);
    } else {
      // If the clicked item is not selected, select it
      setShowContinue(true);
      setSelectedtreatmentId(id);
      setSelectedspecialityId(spe);
      setSelectedspecialityName(speNAME);
      setSelectedTreatmentName(treatmentName);
    }
  };

  useEffect(() => {
    localStorage.setItem("treatment", selectedtreatmentId);
    localStorage.setItem("speciality", selectedspecialityId);
  }, [selectedtreatmentId, selectedspecialityId]);

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
            <a>
              <img src="/images/2023/01/back-icon.png" alt="icon" /> Back
            </a>
            <div className="barbox">
              {" "}
              <img src="/images/2023/01/bar-img.png" alt="bar-icon" />{" "}
            </div>
          </div>

          <div className="request-quote">
            <h1>What is the medical problem you want to address?</h1>
            {/* <div className="search-medbox">
              <input
                type="text"
                placeholder="Search for doctor, hospital or treatments"
                name="name"
                required=""
              />
            </div> */}

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
                        <div
                          className="specialists-boxitem"
                          style={{
                            border:
                              items.id === selectedtreatmentId
                                ? "1px solid #ff6800"
                                : "inherit",
                          }}
                          key={items.id}
                        >
                          <div
                            className="boxitem"
                            onClick={() =>
                              handleNameClick(
                                items.id,
                                e.id,
                                e.name,
                                items.name
                              )
                            }
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

            {showContinue && (
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
            )}
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
