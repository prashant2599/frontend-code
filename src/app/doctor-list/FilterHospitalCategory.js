"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import getAllHospitalsFilteration from "../lib/gerAllHospitalFilteration";
import Link from "next/link";

const FilterHospitalCategory = ({ hospital, speciality }) => {
  const router = useRouter();
  const [hospitalSpeciality, setHospitalSpeciality] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/speciality-list?hospital=${hospital}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setHospitalSpeciality(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [hospital]);

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

  const [hospitalspecialityId, setHospitalspecialityId] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);

  const handlehospitalSpeciality = (e) => {
    const select = e.target.value;
    setHospitalspecialityId(select);

    router.push(`/doctor-list?hospital=${hospital}&speciality=${select}`);
  };
  const handleSelectHospital = (e) => {
    const select = e.target.value;
    setSelectedHospital(select);

    router.push(`/doctor-list/${select}`);
  };

  useEffect(() => {
    setSelectedHospital(hospital);
  }, [hospital]);
  useEffect(() => {
    setHospitalspecialityId(speciality);
  }, [speciality]);
  return (
    <>
      <div className="doctors-list-find">
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
        <Link href={`/doctor-list/${hospital}`}>
          <div className="refresh-box">
            <span>
              <img src="/images/2023/05/loading.png" alt="icon" />
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FilterHospitalCategory;
