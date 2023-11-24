"use client";

import React, { useState, useEffect } from "react";
import getALLCountry from "@/app/lib/getAllCountry";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import { useDoctorData } from "@/app/contex/DoctorDataContext";
import { HospitalData } from "@/app/contex/HospitalDataContext";

const HomeFilterDandH = () => {
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
  );
};

export default HomeFilterDandH;
