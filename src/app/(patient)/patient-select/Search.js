"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getALLSearchApi from "@/app/lib/getAllSearchApi";

const Search = () => {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Fetch specialities
      const specialityData = await getALLSearchApi();
      setDoctors(specialityData.searchData.doctors);
      setHospitals(specialityData.searchData.hospitals);
    };

    fetchData();
  }, []);

  const filteredDoctors = doctors
    ? doctors.filter(
        (item) =>
          item.prefix?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredHospitals = hospitals
    ? hospitals.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  return (
    <>
      <div className="search-medbox">
        <input
          type="text"
          placeholder="Search for Doctor and  Hospital"
          name="name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery.length >= 2 && (
          <div className="searchbox-medf" style={{ textAlign: "start" }}>
            {filteredDoctors.length > 0 ? <h3>Doctors</h3> : null}

            {filteredDoctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctor/${doctor.slug}`}
                onClick={() => {
                  setSearchQuery("");
                  if (typeof togglePopup === "function") {
                    togglePopup();
                  }
                  router.push(`/doctor/${doctor.slug}`); // Navigate to the link
                }}
              >
                <div className="searchbox-main" key={doctor.id}>
                  {`${doctor.prefix} ${doctor.first_name} ${doctor.last_name}`
                    .split(new RegExp(`(${searchQuery})`, "gi"))
                    .map((part, index) =>
                      part.toLowerCase() === searchQuery.toLowerCase() ? (
                        <span key={index} style={{ color: "#ff6800" }}>
                          {part}
                        </span>
                      ) : (
                        <span key={index}>{part}</span>
                      )
                    )}
                </div>
              </Link>
            ))}

            {filteredHospitals.length > 0 ? <h3>Hospitals</h3> : null}

            {filteredHospitals.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/hospital/${doctor.slug}`}
                onClick={() => {
                  setSearchQuery("");
                  if (typeof togglePopup === "function") {
                    togglePopup();
                  }
                  router.push(`/hospital/${doctor.slug}`);
                }}
              >
                <div className="searchbox-main" key={doctor.id}>
                  {doctor.name
                    .split(new RegExp(`(${searchQuery})`, "gi"))
                    .map((part, index) =>
                      part.toLowerCase() === searchQuery.toLowerCase() ? (
                        <span key={index} style={{ color: "#ff6800" }}>
                          {part}
                        </span>
                      ) : (
                        <span key={index}>{part}</span>
                      )
                    )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
