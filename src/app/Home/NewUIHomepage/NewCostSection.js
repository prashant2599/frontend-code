"use client";

import { useState, useEffect } from "react";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import getALLCountry from "@/app/lib/getAllCountry";
import Link from "next/link";

const NewCostSection = () => {
  const [countries, setCountries] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      // Fetch countries
      const countryData = await getALLCountry();
      setCountries(countryData.country_name);
      setActiveTab(countryData.country_name[0]?.country || "");
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const defaultOpenElement = document.getElementById("defaultOpen");
  //   if (defaultOpenElement) {
  //     openCity({ currentTarget: defaultOpenElement }, activeTab);
  //   } else {
  //     console.error("Default open element not found");
  //   }
  // }, [activeTab]);

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

        // Filter specialities based on the "featured" attribute
        const featuredSpecialities = result.data.Speciality.filter(
          (speciality) => speciality.featured === "1"
        );

        setSpeciality(featuredSpecialities);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, []);

  const countryIcon = [
    {
      name: "India",
      "city-icon": "/images/icons/india.png",
      "city-icon-h": "/images/icons/indiaOne.png",
    },
    {
      name: "Oman",
      "city-icon": "/images/icons/oman.png",
      "city-icon-h": "/images/icons/omanOne.png",
    },
    {
      name: "Turkey",
      "city-icon": "/images/icons/turkey.png",
      "city-icon-h": "/images/icons/turkeyOne.png",
    },
  ];

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
            {countries.map((tab) => {
              const icon = countryIcon.find(
                (icon) => icon.name.toLowerCase() === tab.country.toLowerCase()
              );

              return (
                <button
                  key={tab.id}
                  className={`tablinks ${
                    activeTab === tab.country ? "active" : ""
                  }`}
                  onClick={(evt) => openCity(evt, tab.country)}
                >
                  {icon && (
                    <>
                      <img
                        className="city-icon"
                        src={icon["city-icon"]}
                        alt={tab.country}
                      />
                      <img
                        className="city-icon-h"
                        src={icon["city-icon-h"]}
                        alt={tab.country}
                      />
                    </>
                  )}
                  {tab.country.charAt(0).toUpperCase() + tab.country.slice(1)}
                </button>
              );
            })}
          </div>

          {countries.map((tab) => (
            <div
              key={tab.id}
              id={tab.country}
              className="tabcontent"
              style={{ display: activeTab === tab.country ? "block" : "none" }}
            >
              <ul>
                {speciality
                  .filter((item) => item.country.includes(tab.country))
                  .map((filteredItem, index) => (
                    <li key={index}>
                      <Link
                        href={`/speciality/${filteredItem.slug}/${activeTab}`}
                      >
                        <img
                          src={`https://dev.medflick.com/speciality/${filteredItem.icon}`}
                          alt={filteredItem.slug}
                        />
                        <h3>{filteredItem.name}</h3>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          {/* {countries.map((tab) => (
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
          ))} */}
        </div>
      </section>
    </>
  );
};

export default NewCostSection;
