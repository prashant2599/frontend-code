"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchSpeciality = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const [speciality, setSpeciality] = useState([]);
  const [treatment, setTreatment] = useState([]);

  useEffect(() => {
    // Fetch the details data based on the activePackage ID
    axios
      .get(`https://dev.medflick.com/api/search`)
      .then((response) => {
        setSpeciality(response.data.searchData.speciality);
        setTreatment(response.data.searchData.treatments);
      })
      .catch((error) => {
        console.error("Error fetching details data:", error);
      });
  }, []);

  const filteredSpeciality = speciality
    ? speciality.filter((item) =>
        item.menu_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredTreatment = treatment
    ? treatment.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  return (
    <>
      <div className="search-medbox">
        <input
          type="text"
          placeholder="Search for Speciality and Treatments"
          name="name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        {searchQuery.length >= 2 && (
          <div className="searchbox-medf">
            {filteredSpeciality.length > 0 ? <h3>Specialities</h3> : null}
            {filteredSpeciality.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/speciality/${doctor.slug}`}
                onClick={() => {
                  setSearchQuery("");
                  if (typeof togglePopup === "function") {
                    togglePopup();
                  }
                  router.push(`/speciality/${doctor.slug}`); // Navigate to the link
                }}
              >
                <div className="searchbox-main">
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
            {filteredTreatment.length > 0 ? <h3>Treatments</h3> : null}

            {filteredTreatment.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/treatment/${doctor.slug}`}
                onClick={() => {
                  setSearchQuery("");
                  if (typeof togglePopup === "function") {
                    togglePopup();
                  }
                  router.push(`/treatment/${doctor.slug}`); // Navigate to the link
                }}
              >
                <div className="searchbox-main">
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

export default SearchSpeciality;
