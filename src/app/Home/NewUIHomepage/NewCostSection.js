"use client";

import { useState, useEffect } from "react";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import getALLCountry from "@/app/lib/getAllCountry";
import Link from "next/link";

const NewCostSection = () => {
  const tabs = [
    {
      id: "treatment-1",
      label: "India",
      icon: "/new-images/2023/01/06/1.png",
      hoverIcon: "/new-images/2023/01/06/hover-1.png",
      content: [
        "Transplants",
        "Neurosurgery",
        "Cancer Care",
        "Cardiac Surgery",
        "IVF",
        "Cosmetic & Plastic Surgery",
      ],
    },
    {
      id: "treatment-2",
      label: "Turkey",
      icon: "/new-images/2023/01/06/2.png",
      hoverIcon: "/new-images/2023/01/06/hover-2.png",
      content: [
        "Treatment 2 Content 1",
        "Treatment 2 Content 2",
        "Treatment 2 Content 3",
      ],
    },
    {
      id: "treatment-3",
      label: "UAE",
      icon: "/new-images/2023/01/06/3.png",
      hoverIcon: "/new-images/2023/01/06/hover-3.png",
      content: [
        "Treatment 3 Content 1",
        "Treatment 3 Content 2",
        "Treatment 3 Content 3",
      ],
    },
    {
      id: "treatment-4",
      label: "Thailand",
      icon: "/new-images/2023/01/06/4.png",
      hoverIcon: "/new-images/2023/01/06/hover-4.png",
      content: [
        "Treatment 4 Content 1",
        "Treatment 4 Content 2",
        "Treatment 4 Content 3",
      ],
    },
  ];

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // Fetch countries
      const countryData = await getALLCountry();
      setCountries(countryData.country_name);
    };

    fetchData();
  }, []);

  const [activeTab, setActiveTab] = useState("india");

  useEffect(() => {
    openCity(document.getElementById("defaultOpen"), activeTab);
  }, [activeTab]);

  const openCity = (evt, cityName) => {
    if (!evt || !evt.currentTarget) {
      console.error("Invalid event object");
      return;
    }

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    setActiveTab(cityName);
  };

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

  return (
    <>
      <section id="home-treatment-costs">
        <div className="midbox-inner wiki-mk">
          <h2>Compare Treatment Costs</h2>
          <p>
            Medflick provides a straightforward avenue to view hospital prices,
            ensuring openness in healthcare expenses, free from concealed
            charges enables you to make a well-informed choice by comparing
            treatment costs based on your specific needs.
          </p>

          <div className="tab-treatment">
            {countries.map((tab) => (
              <button
                key={tab.id}
                className={`tablinks ${
                  activeTab === tab.country ? "active" : ""
                }`}
                onClick={(evt) => openCity(evt, tab.country)}
              >
                {/* <img className="city-icon" src={tab.icon} alt="" />
                <img className="city-icon-h" src={tab.hoverIcon} alt="" /> */}
                {tab.country.charAt(0).toUpperCase() + tab.country.slice(1)}
              </button>
            ))}
          </div>

          {countries.map((tab) => (
            <div
              key={tab.id}
              id={tab.country}
              className="tabcontent"
              style={{ display: activeTab === tab.country ? "block" : "none" }}
            >
              <ul>
                {speciality.map((item, index) => (
                  <li key={item.id}>
                    <Link href={`/speciality/${item.slug}/${activeTab}`}>
                      <img
                        src={`https://dev.medflick.com/speciality/${item.icon}`}
                        alt={item.name}
                      />
                      <h3>{item.name}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default NewCostSection;
