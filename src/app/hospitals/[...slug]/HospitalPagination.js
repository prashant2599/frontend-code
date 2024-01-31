import React from "react";
import Link from "next/link";
import getALLCountry from "@/app/lib/getAllCountry";

const HospitalPagination = async ({
  slug,
  hospital,
  treatment,
  pageNumber,
  totalHospital,
}) => {
  const treanding = await getALLCountry();
  const doctorCountry = treanding.country_name;

  const parts = slug.split("/");
  const specialitySlug = parts[0];
  const countrySlug = parts[1];
  const citySlug = parts[2];
  const treatmentSlug = parts[1];
  const countrySlugTreatment = parts[3];
  const position5 = parts[5];

  const itemsPerPage = 10; // You can adjust this based on your preference
  const totalPages = Math.ceil(totalHospital / itemsPerPage);

  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <>
      <div className="list-item-no">
        <ul>
          {pages.map((page) => {
            let url;

            // Check if the countrySlug is in doctorCountry
            const isPositionInDoctorCountry = doctorCountry.some(
              (countryObj) => countryObj.country === countrySlug
            );

            const isPositionTreatmentCity =
              hospital && hospital.some((e) => e.location === citySlug);

            // Check if the citySlug is in the doctor's locations
            const isPositionCity =
              hospital && hospital.some((e) => e.location === countrySlug);

            // Generate URL based on conditions
            if (isPositionInDoctorCountry) {
              url = `/hospitals/${specialitySlug}/${countrySlug}/page/${page}`;
            } else if (isPositionCity) {
              url = `/hospitals/${specialitySlug}/${countrySlug}/${citySlug}/page/${page}`;
            } else if (isPositionTreatmentCity) {
              url = `/hospitals/${specialitySlug}/${countrySlug}/${citySlug}/${countrySlugTreatment}/page/${page}`;
            } else {
              // Default URL if no conditions are met
              url = `/hospitals/${specialitySlug}/page/${page}`;
            }
            return (
              <li key={page}>
                <Link href={url} className={page == pageNumber ? "active" : ""}>
                  {page}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default HospitalPagination;
