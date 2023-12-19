import Link from "next/link";
import getALLCountry from "../lib/getAllCountry";

const DoctorPagination = async ({ slug, doctor }) => {
  const treanding = await getALLCountry();
  const doctorCountry = treanding.country_name;
  //   const itemsPerPage = 10; // You can adjust this based on your preference
  // const totalBlogs = blogs.length;
  // const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  // // Generate an array of page numbers
  // const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  console.log(slug);
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
    (countryObj) => countryObj.country === countrySlug
  );

  console.log(isPositionCity);
  console.log("country", countrySlug);

  let href = `/doctors/${specialitySlug}/page/2`;
  if (isPositionInDoctorCountry) {
    href = `/doctors/${specialitySlug}/${countrySlug}/page/2`;
  }

  if (isPositionCity) {
    href = `/doctors/${specialitySlug}/${countrySlug}/${citySlug}/page/2`;
  }
  return (
    <>
      <div className="list-item-no">
        <ul>
          <li>
            {" "}
            <Link href="/" className="page active">
              1
            </Link>
          </li>
          <li>
            {" "}
            <Link href={href} className="page">
              2
            </Link>
          </li>
          <li>
            {" "}
            <Link href={`/doctors/${slug}/page/3`} className="page">
              3
            </Link>
          </li>
          <li>
            {" "}
            <Link href={`/doctors/${slug}/page/4`} className="page">
              4
            </Link>
          </li>
          <li>
            {" "}
            <Link href={`/doctors/${slug}/page/5`} className="page">
              5
            </Link>
          </li>
          {/* {pages.map((page) => (
            <li key={page}>
              <Link
                href={`/blogs/page/${page}`}
                className={page === 1 ? "active" : ""}
              >
                {page}
              </Link>
            </li>
          ))} */}
        </ul>
      </div>
    </>
  );
};

export default DoctorPagination;
