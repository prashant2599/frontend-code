"use client";
import { useState, useEffect } from "react";
import getAllSpeciality from "../lib/getAllSpeciality";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const FilterationHospital = ({country}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [speciality, setSpeciality] = useState([]);
  const [doctorCountry, setDoctorCountry] = useState([]);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("none");
  const [selectedCountry, setSelectedCountry] = useState(null);




useEffect(() => {
    // Fetch the details data based on the activePackage ID
    const country = searchParams.get("country");
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/hospital-list-category-country?country=${country}`
    console.log(apiUrl)
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hospital-list-category-country?country=${country}`)
      .then((response) => {
        setSpeciality(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching details data:", error);
      });
  }, [searchParams]);

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

  const handleSpecialtyChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSpecialtyId(selectedId);
    router.push(`/hospitals/${selectedId}/${country}`);
  };

  useEffect(() => {
    setSelectedSpecialtyId("Select Speciality");
  }, []);

  const handleSelectCountry = (e) => {
    const select = e.target.value;
    setSelectedCountry(select);
    router.push(`/hospital-list-category?country=${select}`);
  };
  useEffect(() => {
    setSelectedCountry(country);
  }, [country]);

  const handleClearSelection = () => {
    router.push(`/hospitals`);
  };
  return (
    <>
      <div className="doctors-list-find">
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
        <div className="ding">
          <select
            id="wiki-select"
            onChange={handleSelectCountry}
            value={selectedCountry}
          >
            <option disabled>Select Country</option>
            {doctorCountry.map((e) => (
              <option value={e.country} key={e.id}>
                {e.country.charAt(0).toUpperCase() + e.country.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="refresh-box" onClick={handleClearSelection}>
          <span>
            <img src="/images/2023/05/loading.png" alt="icon" />
          </span>
        </div>
      </div>
    </>
  );
};

export default FilterationHospital;
