"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import getALLCountry from "@/app/lib/getAllCountry";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import HomeDoctorForm from "../doctorForm/HomeDoctorForm";
import HomeHospitalForm from "../hospitalForm/HomeHospitalForm";

function formatText(text) {
  if (typeof text === "string") {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return "Invalid input";
  }
}

const NewSearchTreatment = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [hospitalsData, setHospitalsData] = useState([]);
  const doctorsNew = doctorsData.doctors_list;
  const Doctors = doctorsNew?.slice(0, 4) ?? [];
  const Hospitals = hospitalsData?.slice(0, 4) ?? [];
  //  filteration
  const [countries, setCountries] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("india");
  const [selectedSpeciality, setSelectedSpeciality] = useState("neurosurgery");

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

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hospital-list-category-country?country=${selectedCountry}`)
  //     .then((response) => {
  //       setSpecialities(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching details data:", error);
  //     });
  // }, [selectedCountry]);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      const res = await fetch(
        `https://dev.medflick.com/api/doctorsforhome/${selectedSpeciality}/${selectedCountry}`
      );
      const data = await res.json();
      setDoctorsData(data.doctors_list);
    };

    fetchDoctorsData();
  }, [selectedCountry, selectedSpeciality, setDoctorsData]);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      const res = await fetch(
        `https://dev.medflick.com/api/hospitalsforhome/${selectedSpeciality}/${selectedCountry}`
      );
      const data = await res.json();

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

  const formattedSpeciality = formatText(selectedSpeciality);

  return (
    <>
      <section id="hometop-find-treatments">
        <div className="midbox-inner wiki-mk">
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
        </div>
      </section>

      {/* doctor */}
      <div className="midbox-inner wiki-mk">
        <div className="new-beginnings">
          <div className="new-beginnings-left">
            <h3>
              Best {formattedSpeciality} Doctors in{" "}
              <span style={{ color: "#ff6800" }}>
                {selectedCountry.charAt(0).toUpperCase() +
                  selectedCountry.slice(1)}
              </span>
            </h3>
          </div>
          <div className="new-beginnings-right">
            <Link
              className="view-all"
              href={`/doctors/${selectedSpeciality}/${selectedCountry}`}
            >
              View All <img src="/images/treatments-arrow.png" alt="arrow" />
            </Link>
          </div>
        </div>

        <div className="home-doctors">
          {Doctors.length > 0 ? (
            Doctors.map((e) => (
              <div className="item" key={e.id}>
                <div className="item-home-expert">
                  <Link href={`/doctor/${e.slug}`}>
                    <img
                      src={`https://dev.medflick.com/doctor/${e.icon}`}
                      alt={e.slug}
                    />
                  </Link>
                </div>
                <div className="home-expert-text">
                  <div style={{ display: "flex" }}>
                    <div>
                      <Link href={`/doctor/${e.slug}`}>
                        <h3>
                          {e.prefix} {e.first_name} {e.last_name}
                        </h3>
                      </Link>
                    </div>
                    <div className="home-page-hospital-logo">
                      <Link href={`/hospital/${e.hospital_slug}`}>
                        <img
                          src={`https://dev.medflick.com/hospital/${e.hospitalicon}`}
                          className="home-doctor-hospital-logo"
                          alt={e.hospital_slug}
                        />
                      </Link>
                    </div>
                  </div>
                  <p>
                    {e.dept.length > 25 ? `${e.dept.slice(0, 25)}..` : e.dept}
                  </p>
                </div>
                <HomeDoctorForm
                  slug={e.slug}
                  first={e.prefix}
                  middle={e.first_name}
                  last={e.last_name}
                  doctorId={e.id}
                  specialityId={e.speciality_id}
                />
              </div>
            ))
          ) : (
            <p>Oops, no doctors found.</p>
          )}
        </div>
      </div>

      {/* hospital */}
      <div className="midbox-inner wiki-mk">
        <div className="new-beginnings">
          <div className="new-beginnings-left">
            <h3>
              Best {formattedSpeciality} Hospitals in{" "}
              <span style={{ color: "#ff6800" }}>
                {selectedCountry.charAt(0).toUpperCase() +
                  selectedCountry.slice(1)}
              </span>
            </h3>
          </div>
          <div className="new-beginnings-right">
            <Link
              className="view-all"
              href={`/hospitals/${selectedSpeciality}/${selectedCountry}`}
            >
              View All <img src="/images/treatments-arrow.png" alt="arrow" />
            </Link>
          </div>
        </div>

        <div className="home-hospitals">
          {Hospitals.length > 0 ? (
            Hospitals.map((e) => (
              <div className="item" key={e.id}>
                <div className="item-home-expert">
                  <Link href={`/hospital/${e.slug}`}>
                    <img
                      src={`https://dev.medflick.com/hospital/${e.home_image}`}
                      alt={e.name}
                    />
                  </Link>
                </div>
                <div className="home-expert-text">
                  <Link href={`/hospital/${e.slug}`}>
                    <h3>{e.name}</h3>
                  </Link>
                  <p>
                    <span className="home-page-hospital-in">
                      {" "}
                      Hospitals in{" "}
                    </span>
                    {formatText(e.city)},{" "}
                    {selectedCountry.charAt(0).toUpperCase() +
                      selectedCountry.slice(1)}
                  </p>
                </div>
                <HomeHospitalForm
                  slug={e.slug}
                  country={e.country}
                  name={e.name}
                  hospitalId={e.id}
                  specialityId={e.speciality_id}
                />
              </div>
            ))
          ) : (
            <p>Oops, no hospitals found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NewSearchTreatment;
