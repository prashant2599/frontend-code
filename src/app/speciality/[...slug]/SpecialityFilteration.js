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

  const handleSelectCountry = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
    router.push(`/speciality/${slug}/${selectedCountry}`);
  };
  

  useEffect(() => {
    setSelectedCountry(countrySlug);
  }, [countrySlug]);
  const countryIcon = [
    {
      name: "India",
      "city-icon": "/images/icons/india.png",
      "city-icon-h": "/images/icons/indiaOne.png",
    },
    {
      name: "Oman",
      "city-icon": "/images/icons/oman.png",
      "city-icon-h": "/images/icons/omanOne.png",
    },
    {
      name: "Turkey",
      "city-icon": "/images/icons/turkey.png",
      "city-icon-h": "/images/icons/turkeyOne.png",
    },
  ];
  return (
    <>
      <div class="tab-treatment">
        {countries.map((country, index) => {
          const icon = countryIcon.find(
            (icon) => icon.name.toLowerCase() === country.toLowerCase()
          );
  
          return (
            <button
            className={`tablinks ${selectedCountry === country ? 'active' : ''}`}
            onClick={() => handleSelectCountry(country)}
          >
            {icon && (
              <>
                <img
                  className="city-icon"
                  src={icon["city-icon"]}
                  alt={country}
                />
                <img
                  className="city-icon-h"
                  src={icon["city-icon-h"]}
                  alt={country}
                />
              </>
            )}
            {country.charAt(0).toUpperCase() + country.slice(1)}
          </button>
          
          );
        })}
      </div>
    </>
  );
  
};

export default SpecialityFilteration;
