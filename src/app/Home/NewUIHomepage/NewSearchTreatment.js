"use client";

import React, { useState, useEffect } from "react";
import HomeFilterDandH from "./FilterCountryHome/HomeFilterDandH";
import { useDoctorData } from "@/app/contex/DoctorDataContext";
import { HospitalData } from "@/app/contex/HospitalDataContext";
import Link from "next/link";
import getALLCountry from "@/app/lib/getAllCountry";
import getAllSpeciality from "@/app/lib/getAllSpeciality";

const NewSearchTreatment = () => {
  const { doctorsData } = useDoctorData();
  const doctorsNew = doctorsData.doctors_list;
  const { hospitalsData } = HospitalData();
  const Doctors = doctorsNew?.slice(0, 4) ?? [];
  const Hospitals = hospitalsData?.slice(0, 4) ?? [];

  const speciality = doctorsData.specility_name;

  const category = speciality?.slug;

  const country = speciality?.country;

  //  filteration
  const [countries, setCountries] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("india");
  const [selectedSpeciality, setSelectedSpeciality] = useState("transplants");
  //   const [doctorsData, setDoctorsData] = useState([]);
  const { setDoctorsData } = useDoctorData();
  const { setHospitalsData } = HospitalData();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch countries
      const countryData = await getALLCountry();
      setCountries(countryData.country_name);

      // Fetch specialities
      const specialityData = await getAllSpeciality();
      setSpecialities(specialityData.data.Speciality);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      const res = await fetch(
        `https://dev.medflick.com/api/doctors/${selectedSpeciality}/${selectedCountry}`
      );
      const data = await res.json();
      // Set the fetched data in the state
      setDoctorsData(data.doctors_list);
    };

    // Fetch data when selectedCountry or selectedSpeciality changes
    fetchDoctorsData();
  }, [selectedCountry, selectedSpeciality, setDoctorsData]);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      const res = await fetch(
        `https://dev.medflick.com/api/hospitals/${selectedSpeciality}/${selectedCountry}`
      );
      const data = await res.json();
      // Set the fetched data in the state
      setHospitalsData(data.hospital_list.hospital_list);
    };

    // Fetch data when selectedCountry or selectedSpeciality changes
    fetchDoctorsData();
  }, [selectedCountry, selectedSpeciality, setHospitalsData]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSpecialityChange = (e) => {
    setSelectedSpeciality(e.target.value);
  };

  return (
    <>
      <section id="hometop-find-treatments">
        <div class="midbox-inner wiki-mk">
          <h2>
            Find Best Hospitals, Doctors and Treatments{" "}
            <span>Around the World</span>
          </h2>

          {/* <HomeFilterDandH /> */}
          <div className="hometop-find-treatments">
            <div className="ding">
              <select
                onChange={handleCountryChange}
                value={selectedCountry}
                id="wiki-select"
              >
                {countries.map((e) => (
                  <option value={e.slug} key={e.id}>
                    {e.country.charAt(0).toUpperCase() + e.country.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="ding">
              <select
                onChange={handleSpecialityChange}
                value={selectedSpeciality}
                id="wiki-select"
              >
                {specialities.map((e) => (
                  <option value={e.slug} key={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div class="new-beginnings">
            <div class="new-beginnings-left">
              <h3>
                Best{" "}
                {category &&
                  category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                Doctors in {selectedCountry}
              </h3>
            </div>
            <div class="new-beginnings-right">
              <Link class="view-all" href={`/doctors/${category}`}>
                View All <img src="/new-images/2023/01/treatments-arrow.png" />
              </Link>
            </div>
          </div>

          <div class="home-doctors">
            {Doctors.map((e) => (
              <div class="item" key={e.id}>
                <div class="item-home-expert">
                  <img src={`https://dev.medflick.com/doctor/${e.image}`} />
                </div>
                <div class="home-expert-text">
                  <h3>
                    {e.prefix} {e.first_name} {e.last_name}
                  </h3>
                  <p>{e.designation}</p>
                </div>
                <div class="expert-button">
                  <Link class="view-profile" href={`/doctor/${e.slug}`}>
                    View Profile
                  </Link>
                  <a class="book-appointment" href="#">
                    Book Appointment
                  </a>
                </div>
              </div>
            ))}

            {/* <div class="item">
              <div class="item-home-expert">
                <img src="/new-images/2023/01/02/2.jpg" />
              </div>
              <div class="home-expert-text">
                <h3>Dr. Sachin Shah</h3>
                <p>Senior Neurosurgeon</p>
              </div>
              <div class="expert-button">
                <a class="view-profile" href="#">
                  View Profile
                </a>
                <a class="book-appointment" href="#">
                  Book Appointment
                </a>
              </div>
            </div>

            <div class="item">
              <div class="item-home-expert">
                <img src="/new-images/2023/01/02/3.jpg" />
              </div>
              <div class="home-expert-text">
                <h3>Dr. Santosh Joshi</h3>
                <p>Senior Neurosurgeon</p>
              </div>
              <div class="expert-button">
                <a class="view-profile" href="#">
                  View Profile
                </a>
                <a class="book-appointment" href="#">
                  Book Appointment
                </a>
              </div>
            </div>

            <div class="item">
              <div class="item-home-expert">
                <img src="/new-images/2023/01/02/4.jpg" />
              </div>
              <div class="home-expert-text">
                <h3>Dr. Shreya Dasgupta</h3>
                <p>Senior Neurosurgeon</p>
              </div>
              <div class="expert-button">
                <a class="view-profile" href="#">
                  View Profile
                </a>
                <a class="book-appointment" href="#">
                  Book Appointment
                </a>
              </div>
            </div> */}
          </div>

          <div class="new-beginnings">
            <div class="new-beginnings-left">
              <h3>
                Best{" "}
                {category &&
                  category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                Hospitals in {selectedCountry}
              </h3>
            </div>
            <div class="new-beginnings-right">
              <Link class="view-all" href={`/hospitals/${category}`}>
                View All <img src="/new-images/2023/01/treatments-arrow.png" />
              </Link>
            </div>
          </div>

          <div class="home-hospitals">
            {Hospitals.map((e) => (
              <div class="item" key={e.id}>
                <div class="item-home-expert">
                  <img src={`https://dev.medflick.com/hospital/${e.image}`} />
                </div>
                <div class="home-expert-text">
                  <h3>{e.name}</h3>
                  <p>Hospitals in India</p>
                </div>
                <div class="expert-button">
                  <Link class="view-profile" href={`/hospital/${e.slug}`}>
                    View Profile
                  </Link>
                  <a class="book-appointment" href="#">
                    Book Appointment
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewSearchTreatment;
