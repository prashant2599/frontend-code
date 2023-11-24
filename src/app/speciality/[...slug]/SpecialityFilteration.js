"use client";

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SpecialityFilteration = ({ countryResponse, slug, slugs }) => {
  const router = useRouter();
  const parts = slugs.split("/");
  const specialitySlug = parts[0];
  const countrySlug = parts[1];

//   console.log("position0", specialitySlug);
//   console.log("position1", countrySlug);

  const countries = countryResponse.split(",");

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSelectCountry = (e) => {
    const select = e.target.value;
    setSelectedCountry(select);

    router.push(`/speciality/${slug}/${select}`);
  };

  useEffect(() => {
    setSelectedCountry(countrySlug);
  }, [countrySlug]);
  return (
    <>
      <div className="doctors-list-find">
        <div className="ding" style={{ width: "20%" }}>
          <select
            id="wiki-select"
            onChange={handleSelectCountry}
            value={selectedCountry}
          >
            <option>Select Country</option>
            {countries.map((country, index) => (
              <option value={country} key={index}>
                {country.charAt(0).toUpperCase() + country.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default SpecialityFilteration;
