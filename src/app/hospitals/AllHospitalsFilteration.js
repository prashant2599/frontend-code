"use client";
import { useState, useEffect } from "react";
import getAllSpeciality from "../lib/getAllSpeciality";
import axios from "axios";
import { useRouter } from "next/navigation";

const AllHospitalsFilteration = () => {
  const router = useRouter();
  const [speciality, setSpeciality] = useState([]);
  const [doctorCountry, setDoctorCountry] = useState([]);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("none");
  const [selectedCountry, setSelectedCountry] = useState(null);

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

    // Redirect to another page with the selected ID
    router.push(`/hospitals/${selectedId}`);
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
    setSelectedCountry("Select Country");
  }, []);

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

export default AllHospitalsFilteration;
