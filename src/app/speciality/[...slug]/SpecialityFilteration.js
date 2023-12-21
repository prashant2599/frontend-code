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
      <div class="tab-treatment">
      {countries.map((country, index) => (
        <button
          class="tablinks"
          onclick="openCity(event, 'treatment-1')"
          id="defaultOpen"
          value={country} key={index}
        >
          <img
            src="https://wgrowth.partners/wwpl/medflick_newsite/images/2023/01/06/1.png"
            alt=""
          />{" "}
          {country.charAt(0).toUpperCase() + country.slice(1)}
        </button>
        ))}

        {/* <button class="tablinks" onclick="openCity(event, 'treatment-2')">
          <img
            src="https://wgrowth.partners/wwpl/medflick_newsite/images/2023/01/06/2.png"
            alt=""
          />{" "}
          Turkey
        </button>

        <button class="tablinks" onclick="openCity(event, 'treatment-3')">
          <img
            src="https://wgrowth.partners/wwpl/medflick_newsite/images/2023/01/06/3.png"
            alt=""
          />{" "}
          UAE
        </button>

        <button class="tablinks" onclick="openCity(event, 'treatment-4')">
          <img
            src="https://wgrowth.partners/wwpl/medflick_newsite/images/2023/01/06/4.png"
            alt=""
          />{" "}
          Thailand
        </button> */}
      </div>
      {/* <div className="doctors-list-find">
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
      </div> */}
    </>
  );
};

export default SpecialityFilteration;
