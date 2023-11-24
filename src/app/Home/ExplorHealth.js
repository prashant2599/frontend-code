"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import getAllSpeciality from "../lib/getAllSpeciality";
import Image from "next/image";
const ExplorHealth = () => {
  const [speciality, setSpeciality] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllSpeciality();
        setSpeciality(result.data.Speciality);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, []);
  const [activeTab, setActiveTab] = useState(1); // Initial active tab

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <section id="explore-health">
        <div className="midbox-inner  wiki-mk">
          <div className="home-treatment">
            <h4>Treatments</h4>

            <div className="tab">
              {speciality &&
                speciality.map((filteredSpecialities) => (
                  <button
                    className={`tablinks ${
                      activeTab === filteredSpecialities.id ? "active" : ""
                    }`}
                    onMouseOver={() => handleTabChange(filteredSpecialities.id)}
                    key={filteredSpecialities.id}
                  >
                    {filteredSpecialities.name}
                    <img
                      src="/images/2023/01/treatments-arrow.png"
                      alt="Arrow"
                    />
                  </button>
                ))}

              {/* <button
                className={`tablinks ${activeTab === "wiki-2" ? "active" : ""}`}
                onMouseOver={() => handleTabChange("wiki-2")}
              >
                Kidney Transplant{" "}
                <img src="images/2023/01/treatments-arrow.png" alt="Arrow" />
              </button>
              <button
                className={`tablinks ${activeTab === "wiki-3" ? "active" : ""}`}
                onMouseOver={() => handleTabChange("wiki-3")}
              >
                Heart Surgery
                <img src="images/2023/01/treatments-arrow.png" />
              </button>
              <button
                className={`tablinks ${activeTab === "wiki-4" ? "active" : ""}`}
                onMouseOver={() => handleTabChange("wiki-4")}
              >
                Cancer <img src="images/2023/01/treatments-arrow.png" />
              </button>
              <button className="tablinks">
                IVF Treatment <img src="images/2023/01/treatments-arrow.png" />
              </button>
              <button className="tablinks">
                Orthopedic
                <img src="images/2023/01/treatments-arrow.png" />
              </button> */}
            </div>

            {/* <div className="tab tab1">
              <button
                className={`tablinks ${activeTab === "wiki-1" ? "active" : ""}`}
                onMouseOver={() => handleTabChange("wiki-1")}
              >
                Dental{" "}
                <img src="images/2023/01/treatments-arrow.png" alt="Arrow" />
              </button>
            </div>
            <div
              id="wiki-1"
              className={`tabcontent ${activeTab === "wiki-1" ? "active" : ""}`}
              style={{ display: activeTab === "wiki-1" ? "block" : "none" }}
            >
              <div className="explore-pro">
                <img
                  className="pd-img3"
                  src="images/2023/01/05/01.jpg"
                  alt="Dental"
                />
                <div className="explore-box ex-pro">
                  <h3>Ut enim admi sit veniam quis nostrud</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec sed purus consectetur, interdum felis in, auctor
                    ligula. Lorem ipsum dolor sit amet.
                  </p>
                  <Link className="more-img" href="/">
                    {" "}
                    <i className="fa fa-arrow-right"></i>{" "}
                  </Link>
                </div>
              </div>
            </div> */}

            <div className="tab tab1">
              {speciality &&
                speciality.map((filteredSpecialities) => (
                  <button
                    className={`tab tab1 ${
                      activeTab === filteredSpecialities.id ? "active" : ""
                    }`}
                    onMouseOver={() => handleTabChange(filteredSpecialities.id)}
                    key={filteredSpecialities.id}
                  >
                    {filteredSpecialities.name}
                    <img
                      src="images/2023/01/treatments-arrow.png"
                      alt="arrow"
                    />
                  </button>
                ))}
            </div>
            {speciality &&
              speciality.map((filteredSpecialities) => (
                <div
                  id={filteredSpecialities.id}
                  className={`tabcontent ${
                    activeTab === filteredSpecialities.id ? "active" : ""
                  }`}
                  key={filteredSpecialities.slug}
                >
                  <div className="explore-pro">
                    <Image
                      className="pd-img3"
                      src={`https://dev.medflick.com/speciality/${filteredSpecialities.image}`}
                      alt={filteredSpecialities.name}
                      width="942"
                      height="420"
                    />
                    <div className="explore-box ex-pro">
                      <h3 style={{ color: "#fff" }}>
                        {filteredSpecialities.name}
                      </h3>
                      {/* <p>{filteredSpecialities.short_description}</p> */}
                      <div
                        className="doctors-bio"
                        style={{ color: "#fff" }}
                        dangerouslySetInnerHTML={{
                          __html: filteredSpecialities.short_description,
                        }}
                      />
                      <Link
                        className="more-img"
                        href={`/speciality/${filteredSpecialities.slug}`}
                      >
                        <BsArrowRight
                          style={{
                            color: "#ffffff",
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

            {/* 
            <div className="tab tab1">
              <button
                className={`tab tab1 ${activeTab === "wiki-3" ? "active" : ""}`}
                onMouseOver={() => handleTabChange("wiki-3")}
              >
                Heart Surgery <img src="images/2023/01/treatments-arrow.png" />
              </button>
            </div>
            <div
              id="wiki-3"
              className={`tabcontent ${activeTab === "wiki-3" ? "active" : ""}`}
            >
              <div className="explore-pro">
                <img className="pd-img3" src="images/2023/01/05/03.jpg" />
                <div className="explore-box">
                  <h3>Lose weight with the Body Program</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec sed purus consectetur, interdum felis in, auctor
                    ligula. Lorem ipsum dolor sit amet.
                  </p>
                  <Link className="more-img" href="/">
                    {" "}
                    <i className="fa fa-arrow-right"></i>{" "}
                  </Link>
                </div>
              </div>
            </div>

            <div className="tab tab1">
              <button
                className={`tab tab1 ${activeTab === "wiki-4" ? "active" : ""}`}
                onMouseOver={() => handleTabChange("wiki-4")}
              >
                Cancer <img src="images/2023/01/treatments-arrow.png" />
              </button>
            </div>
            <div
              id="wiki-4"
              className={`tabcontent ${activeTab === "wiki-4" ? "active" : ""}`}
            >
              <div className="explore-pro">
                <img className="pd-img3" src="images/2023/01/05/04.jpg" />
                <div className="explore-box ex-pro">
                  <h3>Plan for Your Future</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec sed purus consectetur, interdum felis in, auctor
                    ligula. Lorem ipsum dolor sit amet.
                  </p>
                  <Link className="more-img" href="/">
                    {" "}
                    <i className="fa fa-arrow-right"></i>{" "}
                  </Link>
                </div>
              </div>
            </div>

            <div className="tab tab1">
              <button className="tablinks">
                IVF Treatment <img src="images/2023/01/treatments-arrow.png" />
              </button>
            </div>
            <div id="wiki-5" className="tabcontent">
              <div className="explore-pro">
                <img className="pd-img3" src="images/2023/01/05/05.jpg" />
                <div className="explore-box ex-pro">
                  <h3>Plan for Your Future</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec sed purus consectetur, interdum felis in, auctor
                    ligula. Lorem ipsum dolor sit amet.
                  </p>
                  <Link className="more-img" href="/">
                    {" "}
                    <i className="fa fa-arrow-right"></i>{" "}
                  </Link>
                </div>
              </div>
            </div>

            <div className="tab tab1">
              <button className="tablinks">
                Orthopedic <img src="images/2023/01/treatments-arrow.png" />
              </button>
            </div>
            <div id="wiki-6" className="tabcontent">
              <div className="explore-pro">
                <img className="pd-img3" src="images/2023/01/05/06.jpg" />
                <div className="explore-box">
                  <h3>Plan for Your Future</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec sed purus consectetur, interdum felis in, auctor
                    ligula. Lorem ipsum dolor sit amet.
                  </p>
                  <Link className="more-img" href="/">
                    <i>
                      <BsArrowRight />
                    </i>
                  </Link>
                </div>
              </div>
            </div> */}

            <Link className="view-all" href="/specialities">
              View All
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExplorHealth;
