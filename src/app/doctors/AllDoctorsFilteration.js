"use client";
import { useState, useEffect } from "react";
import getAllSpeciality from "../lib/getAllSpeciality";
import axios from "axios";
import { useRouter } from "next/navigation";
import getAllHospitalsFilteration from "../lib/gerAllHospitalFilteration";

const AllDoctorsFilteration = () => {
  const router = useRouter();
  const [speciality, setSpeciality] = useState([]);
  const [doctorCountry, setDoctorCountry] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("none");
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctorBYCountry`)
      .then((response) => {
        setDoctorCountry(response.data.country_name);
      })
      .catch((error) => {
        console.error("Error fetching details data:", error);
      });
  }, []);

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

  const handleSpecialtyChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSpecialtyId(selectedId);

    // Redirect to another page with the selected ID
    router.push(`/doctors/${selectedId}`);
  };

  useEffect(() => {
    setSelectedSpecialtyId("Select Speciality");
  }, []);

  const handleSelectCountry = (e) => {
    const select = e.target.value;
    setSelectedCountry(select);
    router.push(`/doctor-list/${select}`);
  };

  useEffect(() => {
    setSelectedCountry("Select Hospital");
  }, []);

  const handleClearSelection = () => {
    router.push(`/doctors`);
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
            <option disabled>Select Hospital</option>
            {hospitalList.map((e) => (
              <option value={e.slug} key={e.id}>
                {e.name}
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

export default AllDoctorsFilteration;
