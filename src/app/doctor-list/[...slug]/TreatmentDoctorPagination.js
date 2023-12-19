import getALLCountry from "@/app/lib/getAllCountry";
import Link from "next/link";

const TreatmentDoctorPagination = async ({
  slug,
  doctor,
  pageNumber,
  totalDoctor,
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

  const isPositionCity =
    doctor && doctor.some((e) => e.location === countrySlug);
  const isPositionTreatmentCity =
    doctor && doctor.some((e) => e.location === citySlug);

  const isPositionInDoctorCountry = doctorCountry.some(
    (countryObj) => countryObj.country === citySlug
  );

  console.log(isPositionInDoctorCountry);
  console.log("country", citySlug);

  const itemsPerPage = 10; // You can adjust this based on your preference
  const totalPages = Math.ceil(totalDoctor / itemsPerPage);

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
                (countryObj) => countryObj.country === citySlug
              );

            // Check if the citySlug is in the doctor's locations
            const isPositionCity =
              doctor && doctor.some((e) => e.location === countrySlug);

            // Generate URL based on conditions
            if (isPositionInDoctorCountry) {
              url = `/doctor-list/${specialitySlug}/${countrySlug}/${citySlug}/page/${page}`;
            } else if (isPositionCity) {
              url = `/doctor-list/${specialitySlug}/${countrySlug}/${citySlug}/page/${page}`;
            } else {
              // Default URL if no conditions are met
              url = `/doctor-list/${specialitySlug}/page/${page}`;
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

export default TreatmentDoctorPagination;
