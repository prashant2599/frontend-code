"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import getAllSpeciality from "../lib/getAllSpeciality";
import getAllHospitalsFilteration from "../lib/gerAllHospitalFilteration";

const SpecialitySelect = ({ doctor, treatment, slug, specialityIdCity }) => {
  // split the slug to show speciality
  const slugs = slug;
  const parts = slugs.split("/");
  const specialitySlug = parts[0];
  const countrySlug = parts[1];
  const citySlug = parts[2];
  const treatmentSlug = parts[1];
  const countrySlugTreatment = parts[3];
  const position5 = parts[5];

  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("none");
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [doctorCountry, setDoctorCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);

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

  const [hospitalList, setHospitalList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllHospitalsFilteration();
        setHospitalList(result.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch the details data based on the activePackage ID
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctorBYCountry`)
      .then((response) => {
        setDoctorCountry(response.data.country_name);
      })
      .catch((error) => {
        console.error("Error fetching details data:", error);
      });
  }, []);

  const isPositionHospital = hospitalList.some(
    (e) => e.slug === specialitySlug
  );
  const isPositionInDoctorCountry = doctorCountry.some(
    (countryObj) => countryObj.country === countrySlug
  );

  const [hospitalSpeciality, setHospitalSpeciality] = useState([]);

  useEffect(() => {
    if (isPositionHospital === true) {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/speciality-list?hospital=${specialitySlug}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setHospitalSpeciality(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      null;
    }
  }, [specialitySlug, isPositionHospital]);

  const [cityFilter, setCityFilter] = useState([]);

  useEffect(() => {
    if (isPositionInDoctorCountry === true) {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/onlycity?specility_id=${specialityIdCity}&country=${countrySlug}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setCityFilter(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      null;
    }
  }, [countrySlug, specialityIdCity, isPositionInDoctorCountry]);

  const handleSpecialtyChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSpecialtyId(selectedId);

    router.push(`/doctors/${selectedId}`);
  };

  const handleSelectLocation = (e) => {
    const select = e.target.value;
    setSelectedLocation(select);

    if (isPositionInTreatment === true) {
      router.push(
        `/doctors/${specialitySlug}/${countrySlug}/${select}/${citySlug}`
      );
    } else {
      router.push(`/doctors/${specialitySlug}/${select}/${countrySlug}`);
    }
  };

  const handleSelectTreatment = (e) => {
    const select = e.target.value;
    setSelectedTreatment(select);

    if (isPositionInDoctorCountry === true) {
      router.push(`/doctor-list/${specialitySlug}/${select}/${countrySlug}`);
    } else if (
      isPositionTreatmentCity === true &&
      isPositionInTreatment === true
    ) {
      router.push(
        `/doctors/${specialitySlug}/${select}/${citySlug}/${countrySlugTreatment}`
      );
    } else if (isPositionCity === true) {
      router.push(
        `/doctors/${specialitySlug}/${select}/${countrySlug}/${citySlug}`
      );
    } else if (
      isPositionInTreatment === true &&
      positionTreatmentCountry === true
    ) {
      router.push(`/doctor-list/${specialitySlug}/${select}/${citySlug}`);
    } else if (isPositionInTreatment === true) {
      router.push(`/doctor-list/${specialitySlug}/${select}`);
      // router.push(
      //   `/doctors/${specialitySlug}/${select}/${citySlug}/${countrySlugTreatment}`
      // );
    } else {
      router.push(`/doctor-list/${specialitySlug}/${select}`);
    }
  };

  // unique locations
  const uniqueLocations = [...new Set(doctor.map((doctor) => doctor.location))];

  const handleSelectHospital = (e) => {
    const select = e.target.value;
    setSelectedHospital(select);

    router.push(`/doctor-list/${select}`);
  };

  const handleSelectCountry = (e) => {
    const select = e.target.value;
    setSelectedCountry(select);

    if (isPositionInTreatment === true) {
      router.push(`/doctor-list/${specialitySlug}/${countrySlug}/${select}`);
    } else {
      router.push(`/doctors/${specialitySlug}/${select}`);
    }
  };

  const handleClearSelection = () => {
    if (isPositionHospital === true) {
      router.push(`/doctors`);
    } else {
      router.push(`/doctors/${specialitySlug}`);
    }
  };
  // console.log("position0", specialitySlug);
  // console.log("position1", countrySlug);
  // console.log("position2", citySlug);
  // console.log("position3", countrySlugTreatment);

  // Determine position country


  const positionTreatmentCountry = doctorCountry.some(
    (e) => e.country === citySlug
  );

  // Determine position treatment

 
  const isPositionCity = doctor.some((e) => e.location === countrySlug);
  const isPositionTreatmentCity = doctor.some((e) => e.location === citySlug);

  // Determine position treatment
  const isPositionInTreatment = treatment.some((e) => e.slug === countrySlug);
   
console.log("isPositionCity",isPositionCity)
console.log("isPositionTreatmentCity",isPositionTreatmentCity)

console.log("countrySlug",countrySlug)

  // console.log("countryBolean", isPositionInDoctorCountry);
  // console.log("cityBolean", isPositionCity);
  // console.log("cityTreatmentBolean", isPositionTreatmentCity);
  // console.log("TreatmentBolean", isPositionInTreatment);
  // console.log("HospitalBolean", isPositionHospital);
  // console.log("treatmentCountry", positionTreatmentCountry);

  useEffect(() => {
    if (isPositionHospital === true) {
      setSelectedHospital(specialitySlug);
    } else {
      setSelectedHospital("Hospitals");
    }
  }, [specialitySlug, isPositionHospital]);

  useEffect(() => {
    if (isPositionHospital === true) {
      setSelectedSpecialtyId("Select Speciality");
      setHospitalspecialityId("Select Speciality");
    } else {
      setSelectedSpecialtyId(specialitySlug);
    }
  }, [specialitySlug, isPositionHospital]);

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
console.log("citySlug", citySlug)
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

  const [hospitalspecialityId, setHospitalspecialityId] = useState("");

  const handlehospitalSpeciality = (e) => {
    const select = e.target.value;
    setHospitalspecialityId(select);

    router.push(`/doctor-list?hospital=${specialitySlug}&speciality=${select}`);
  };

  return (
    <>
      <div className="doctors-list-find">
        {isPositionHospital ? (
          <div className="ding">
            <select
              id="wiki-select"
              onChange={handlehospitalSpeciality}
              value={hospitalspecialityId}
            >
              <option disabled>Select Speciality</option>
              {hospitalSpeciality &&
                hospitalSpeciality.map((e) => (
                  <option value={e.slug} key={e.id}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        ) : (
          <div className="ding">
            <select
              id="wiki-select"
              onChange={handleSpecialtyChange}
              value={selectedSpecialtyId}
            >
              <option disabled>Select Speciality</option>
              {speciality &&
                speciality.map((e) => (
                  <option value={e.slug} key={e.id}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {isPositionInDoctorCountry && (
          <div className="ding">
            <select
              id="wiki-select"
              onChange={handleSelectLocation}
              value={selectedLocation}
            >
              <option>Location</option>
              {cityFilter.map((location, index) => (
                <option value={location.location} key={index}>
                  {location.location.charAt(0).toUpperCase() +
                    location.location.slice(1)}
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
              <option>Location</option>
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
              {cityFilter.map((location) => (
                <option value={location} key={location}>
                  {location.charAt(0).toUpperCase() + location.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {!isPositionHospital && (
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
        )}

        {!isPositionHospital && (
          <div className="ding">
            <select
              id="wiki-select"
              onChange={handleSelectCountry}
              value={selectedCountry}
            >
              <option disabled>Country</option>
              {doctorCountry.map((e) => (
                <option value={e.country} key={e.id}>
                  {e.country.charAt(0).toUpperCase() + e.country.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {isPositionHospital && (
          <div className="ding">
            <select
              id="wiki-select"
              onChange={handleSelectHospital}
              value={selectedHospital}
            >
              <option disabled>Hospitals</option>
              {hospitalList.map((e) => (
                <option value={e.slug} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="refresh-box" onClick={handleClearSelection}>
          <span>
            <img src="/images/2023/05/loading.png" alt="icon" />
          </span>
        </div>
      </div>
    </>
  );
};

export default SpecialitySelect;
