"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import getAllSpeciality from "../lib/getAllSpeciality";

const HospitalFilters = ({ hospital, slug, treatment }) => {
  const slugs = slug;
  const parts = slugs.split("/");
  const specialitySlug = parts[0];
  const countrySlug = parts[1];
  const citySlug = parts[2];
  const treatmentSlug = parts[1];
  const countrySlugTreatment = parts[3];
  const position5 = parts[5];

  // console.log(slugs);

  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("none");
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  //   const [selectedHospital, setSelectedHospital] = useState(null);

  //   const [treatment, setTreatment] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllSpeciality();
        setSpeciality(result.data.Speciality);
      } catch (err) {
        console.log(err.message); // Set the error message in state
      }
    }

    fetchData();
  }, []);

  const [hospitalCountry, setHospitalCountry] = useState([]);

  useEffect(() => {
    // Fetch the details data based on the activePackage ID
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hospitalBYCountry`)
      .then((response) => {
        setHospitalCountry(response.data.country_name);
      })
      .catch((error) => {
        console.error("Error fetching details data:", error);
      });
  }, []);

  const handleSpecialtyChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSpecialtyId(selectedId);

    // Redirect to another page with the selected ID
    router.push(`/hospitals/${selectedId}`);
  };

  const handleSelectTreatment = (e) => {
    const select = e.target.value;
    setSelectedTreatment(select);

    if (isPositionInDoctorCountry === true) {
      router.push(`/hospital-list/${specialitySlug}/${select}/${countrySlug}`);
    } else if (
      isPositionTreatmentCity === true &&
      isPositionInTreatment === true
    ) {
      router.push(
        `/hospitals/${specialitySlug}/${select}/${citySlug}/${countrySlugTreatment}`
      );
    } else if (isPositionCity === true) {
      router.push(
        `/hospitals/${specialitySlug}/${select}/${countrySlug}/${citySlug}`
      );
    } else if (
      isPositionInTreatment === true &&
      positionTreatmentCountry === true
    ) {
      router.push(`/hospital-list/${specialitySlug}/${select}/${citySlug}`);
    } else if (isPositionInTreatment === true) {
      router.push(`/hospital-list/${specialitySlug}/${select}`);
      // router.push(
      //   `/doctors/${specialitySlug}/${select}/${citySlug}/${countrySlugTreatment}`
      // );
    } else {
      router.push(`/hospital-list/${specialitySlug}/${select}`);
    }
  };

  useEffect(() => {
    // Update the selectedSpecialtyId when the "id" parameter changes in the URL
    setSelectedSpecialtyId(specialitySlug);
  }, [specialitySlug]);

  // console.log("position0", specialitySlug);
  // console.log("position1", countrySlug);
  // console.log("position2", citySlug);
  // console.log("position3", countrySlugTreatment);

  const handleSelectLocation = (e) => {
    const select = e.target.value;
    setSelectedLocation(select);

    if (isPositionInTreatment === true) {
      router.push(
        `/hospitals/${specialitySlug}/${countrySlug}/${select}/${citySlug}`
      );
    } else {
      router.push(`/hospitals/${specialitySlug}/${select}/${countrySlug}`);
    }
  };

  const handleSelectCountry = (e) => {
    const select = e.target.value;
    setSelectedCountry(select);

    if (isPositionInTreatment === true) {
      router.push(`/hospital-list/${specialitySlug}/${countrySlug}/${select}`);
    } else {
      router.push(`/hospitals/${specialitySlug}/${select}`);
    }
  };

  const uniqueLocations = [
    ...new Set(hospital.map((doctor) => doctor.location)),
  ];

  const handleClearSelection = () => {
    if (specialitySlug === "speciality") {
      router.push(`/hospitals/${countrySlug}`);
    } else {
      router.push(`/hospitals/${specialitySlug}`);
    }
  };

  // Determine position country
  const isPositionInDoctorCountry = hospitalCountry.some(
    (countryObj) => countryObj.country === countrySlug
  );

  const positionTreatmentCountry = hospitalCountry.some(
    (e) => e.country === citySlug
  );

  const isPositionCity = hospital.some((e) => e.location === countrySlug);
  const isPositionTreatmentCity = hospital.some((e) => e.location === citySlug);

  // Determine position treatment
  const isPositionInTreatment = treatment.some((e) => e.slug === countrySlug);

  useEffect(() => {
    if (isPositionInTreatment !== true) {
      setSelectedTreatment("Treatments");
    } else if (isPositionInTreatment === true) {
      setSelectedTreatment(countrySlug);
    }
  }, [
    countrySlugTreatment,
    specialitySlug,
    countrySlug,
    citySlug,
    isPositionInTreatment,
  ]);

  useEffect(() => {
    if (isPositionTreatmentCity === true && isPositionInTreatment === true) {
      setSelectedLocation(citySlug);
    } else if (positionTreatmentCountry === true && isPositionCity === true) {
      setSelectedLocation(countrySlug);
    } else {
      setSelectedLocation("Location");
    }
  }, [
    countrySlug,
    citySlug,
    countrySlugTreatment,
    isPositionTreatmentCity,
    isPositionInTreatment,
    positionTreatmentCountry,
    isPositionCity,
  ]);

  useEffect(() => {
    if (isPositionCity === true) {
      setSelectedCountry(citySlug);
    } else if (isPositionInDoctorCountry === true) {
      setSelectedCountry(countrySlug);
    } else if (
      isPositionTreatmentCity === true &&
      isPositionInTreatment === true
    ) {
      setSelectedCountry(countrySlugTreatment);
    } else if (
      positionTreatmentCountry === true &&
      isPositionInTreatment === true
    ) {
      setSelectedCountry(citySlug);
    } else if (isPositionInTreatment === true) {
      setSelectedCountry("Country");
    } else if (isPositionInDoctorCountry !== true) {
      setSelectedCountry("Country");
    }
  }, [
    countrySlug,
    countrySlugTreatment,
    citySlug,
    position5,
    isPositionCity,
    isPositionInTreatment,
    isPositionTreatmentCity,
    isPositionInDoctorCountry,
    positionTreatmentCountry,
  ]);
  return (
    <>
      <div className="doctors-list-find">
        <div className="ding">
          <select
            id="wiki-select"
            onChange={handleSpecialtyChange}
            value={selectedSpecialtyId}
          >
            {speciality &&
              speciality.map((e) => (
                <option value={e.slug} key={e.id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>

        {isPositionInDoctorCountry && (
          <div className="ding">
            <select
              id="wiki-select"
              onChange={handleSelectLocation}
              value={selectedLocation}
            >
              <option disabled>Location</option>
              {uniqueLocations.map((location) => (
                <option value={location} key={location}>
                  {location.charAt(0).toUpperCase() + location.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}
        {positionTreatmentCountry && (
          <div className="ding">
            <select
              id="wiki-select"
              onChange={handleSelectLocation}
              value={selectedLocation}
            >
              <option disabled>Location</option>
              {uniqueLocations.map((location) => (
                <option value={location} key={location}>
                  {location.charAt(0).toUpperCase() + location.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {isPositionTreatmentCity && (
          <div className="ding">
            <select
              id="wiki-select"
              onChange={handleSelectLocation}
              value={selectedLocation}
            >
              <option disabled>Location</option>
              {uniqueLocations.map((location) => (
                <option value={location} key={location}>
                  {location.charAt(0).toUpperCase() + location.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="ding">
          <select
            id="wiki-select"
            onChange={handleSelectTreatment}
            value={selectedTreatment}
          >
            <option disabled>Treatments</option>
            {treatment.map((e) => (
              <option value={e.slug} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div className="ding">
          <select
            id="wiki-select"
            onChange={handleSelectCountry}
            value={selectedCountry}
          >
            <option disabled>Country</option>
            {/* {uniqueCountry.map((location) => (
              <option value={location} key={location}>
                {location.charAt(0).toUpperCase() + location.slice(1)}
              </option>
            ))} */}
            {hospitalCountry.map((e) => (
              <option value={e.country} key={e.id}>
                {e.country.charAt(0).toUpperCase() + e.country.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="refresh-box" onClick={handleClearSelection}>
          <span>
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/05/loading.png`}
              alt="icon"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default HospitalFilters;
