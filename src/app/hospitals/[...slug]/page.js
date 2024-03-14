import HospitalForm from "@/app/Home/hospitalForm/HospitalForm";
import HospitalShare from "@/app/Home/hospitalForm/HospitalShare";
import Link from "next/link";
import HospitalFilters from "../HospitalFilters";
import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";
import HospitalSearch from "./HospitalSearch";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";
import getALLCountry from "@/app/lib/getAllCountry";
import AppointmentForm from "@/app/Home/hospitalForm/AppointmentForm";
import HospitalPagination from "./HospitalPagination";

function formatText(text) {
  if (typeof text === "string") {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    // Handle the case where 'text' is not a string or is undefined
    return "Invalid input"; // Or any other appropriate error handling
  }
}

const page = async ({ params }) => {
  try {
    const combinedSlug = params.slug.join("/");
    const apires = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/hospitals/${combinedSlug}`,
      { cache: "no-store" }
    );

    const datas = await apires.json();
    const hospital = datas.hospital_list.hospital_list;
    const treatment = datas.hospital_list.treatment;
    const info = datas.hospital_list.specility_name;
    const images = datas.hospital_list.hospital_gallery;
    const pageNumber = datas.hospital_list.page;
    const totalHospital = datas.hospital_list.count;

    const country = await getALLCountry();
    const doctorCountry = country.country_name;

    const slugs = combinedSlug;
    const parts = slugs.split("/");
    const specialitySlug = parts[0];
    const countrySlug = parts[1];
    const citySlug = parts[2];
    const treatmentSlug = parts[1];
    const countrySlugTreatment = parts[3];
    const position5 = parts[5];
    const isPositionInDoctorCountry = doctorCountry.some(
      (countryObj) => countryObj.country === countrySlug
    );
    const isPositionCity = hospital.some((e) => e.location === countrySlug);

    const isPositionTreatmentCity = hospital.some(
      (e) => e.location === citySlug
    );

    const formattedSpeciality = formatText(specialitySlug);
    const formattedCountry = formatText(countrySlug);
    const formattedCity = formatText(citySlug);
    const formattedTreatmentCountry = formatText(countrySlugTreatment);

    return (
      <>
        <NewHeader />
        <section id="find-doctors">
          <div className="midbox-inner  wiki-mk">
            <HospitalSearch />
          </div>
        </section>
        <section id="find-hospital-list">
          <div className="midbox-inner  wiki-mk">
            {isPositionInDoctorCountry ? (
              <h1>
                Best {formattedSpeciality} Hospitals in {formattedCountry}{" "}
                <span>({totalHospital} Results)</span>
              </h1>
            ) : isPositionCity ? (
              <h1>
                Best {formattedSpeciality} Hospitals in {formattedCountry},{" "}
                {formattedCity} <span>({totalHospital} Results)</span>
              </h1>
            ) : isPositionTreatmentCity ? (
              <h1>
                Best {formattedCountry} Hospitals in {formattedCity},{" "}
                {formattedTreatmentCountry}{" "}
                <span>({totalHospital} Results)</span>
              </h1>
            ) : (
              <h1>
                Best {formattedSpeciality} Hospitals{" "}
                <span>({totalHospital} Results)</span>
              </h1>
            )}

            <HospitalFilters
              hospital={hospital}
              slug={combinedSlug}
              treatment={treatment}
            />

            <div className="hospital-midbox">
              <div className="hospital-midbox-left">
                {hospital.length > 0 ? (
                  hospital.map((hospital) => {
                    // Filter gallery items that match the current hospital's id
                    const galleryImages = images.filter(
                      (gallery) => gallery.hospital_id === String(hospital.id)
                    );

                    return (
                      <div className="hospital-item-list" key={hospital.id}>
                        <div className="hospital-item-img">
                          <div className="tabs_wrapper">
                            <div className="tabs_container">
                              <div data-hash="one" key={hospital.id}>
                                <Link href={`/hospital/${hospital.slug}`}>
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/hospital/${hospital.image}`}
                                    alt={hospital.slug}
                                  />
                                </Link>
                              </div>
                              <ul className="tabs tab-h">
                                {galleryImages.map((e) => (
                                  <React.Fragment key={e.id}>
                                    {e.icon
                                      .split(",")
                                      .slice(0, 2)
                                      .map((imageName, index) => (
                                        <li className="active" key={index}>
                                          <img
                                            src={`https://dev.medflick.com/hospital/${imageName.trim()}`}
                                            alt={`Image ${index + 1}`}
                                          />
                                        </li>
                                      ))}
                                  </React.Fragment>
                                ))}
                              </ul>

                              {/* <div className="activeImage" data-hash="two">
                              {galleryImages.map(
                                (e, outerIndex) =>
                                  e.icon &&
                                  e.icon.split(",").map((icon, innerIndex) => (
                                    <img
                                      key={`${outerIndex}-${innerIndex}`} // Provide a unique key for each image
                                      src={`${
                                        process.env.BASE_URL
                                      }/hospital/${icon.trim()}`}
                                      alt={icon.trim()} // Use the image filename as the alt text
                                      width="50%"
                                    />
                                  ))
                              )}
                            </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="hospital-item-doc">
                          <Link href={`/hospital/${hospital.slug}`}>
                            <h3>{hospital.name}</h3>
                          </Link>
                          {/* <div className="department-sub">
                          Oncologist, Medical Oncologist
                        </div> */}
                          {/* <div className="rating-star">
                            5{" "}
                            <i>
                              <AiTwotoneStar />
                            </i>{" "}
                            (523)
                          </div> */}

                          <div className="ho-docimg">
                            {hospital.nabl && (
                              <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/hospital/${hospital.nabl}`}
                                alt={hospital.slug}
                              />
                            )}
                            {hospital.nabh && (
                              <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/hospital/${hospital.nabh}`}
                                alt={hospital.slug}
                              />
                            )}
                            {hospital.jci && (
                              <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/hospital/${hospital.jci}`}
                                alt={hospital.slug}
                              />
                            )}
                          </div>
                          {hospital.doc !== null && (
                            <div className="hos-no">
                              <strong>Doctors:</strong> {hospital.doc}
                            </div>
                          )}
                          {hospital.bed !== null && (
                            <div className="hos-no">
                              <strong>Beds:</strong> {hospital.bed}
                            </div>
                          )}
                          {hospital.ambulance !== null && (
                            <div className="hos-no">
                              <strong>Ambulances:</strong> {hospital.ambulance}
                            </div>
                          )}
                          <div className="department-sub-shotdesc">
                            {hospital.short_description &&
                            hospital.short_description.length > 100
                              ? `${hospital.short_description.slice(0, 100)}...`
                              : hospital.short_description}
                          </div>
                        </div>
                        <div className="doctor-item-button">
                          <AppointmentForm
                            HospitalName={hospital.name}
                            hospitalId={hospital.id}
                            specialityId={hospital.speciality_id}
                          />
                          <Link
                            href={`/hospital/${hospital.slug}`}
                            className="view-profile"
                          >
                            View Profile{" "}
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/05/profile.png`}
                              alt="icon"
                            />
                          </Link>
                          {/* share  */}
                          <HospitalShare
                            slug={hospital.slug}
                            country={hospital.country}
                          />

                          <div className="hospital-location-box">
                            {formatText(hospital.city)}
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/05/loc.png`}
                              alt="icon"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <h1 style={{ textAlign: "center", margin: "20px" }}>
                      No Hospital Found
                    </h1>
                  </div>
                )}
                <HospitalPagination
                  slug={combinedSlug}
                  hospital={hospital}
                  treatment={treatment}
                  pageNumber={pageNumber}
                  totalHospital={totalHospital}
                />
              </div>

              {/* Form */}
              <HospitalForm info={info.id} />
            </div>
          </div>
        </section>
        <NewFooter />
      </>
    );
  } catch (error) {
    if (error) {
      notFound();
    }
  }
};

export default page;

export async function generateMetadata({ params }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const currentMonthName = monthNames[currentMonthIndex];
  const currentYear = currentDate.getFullYear();

  const combinedSlug = params.slug.join("/");
  const res = await fetch(
    `https://dev.medflick.com/api/hospitals/${combinedSlug}`
  );
  const datas = await res.json();
  const info = datas.hospital_list.specility_name;
  const treatmentApi = datas.hospital_list.treatment;
  const hospital = datas.hospital_list.hospital_list;

  const country = await getALLCountry();
  const doctorCountry = country.country_name;
  const slugs = combinedSlug;
  const parts = slugs.split("/");
  const specialitySlug = parts[0];
  const countrySlug = parts[1];
  const citySlug = parts[2];
  const treatmentSlug = parts[1];
  const countrySlugTreatment = parts[3];
  const position5 = parts[5];
  //  for treatment formant country wise

  // if (formattedTreatment.includes("Surgery")) {
  //   updatedTreatment = formattedTreatment.replace(/Surgery/g, "Surgeon");
  // } else {
  //   updatedTreatment = formattedTreatment;
  // }

  const formattedSpeciality = formatText(specialitySlug);
  const formattedCountry = formatText(countrySlug);
  const formattedCity = formatText(citySlug);
  const formattedTreatmnetCountry = formatText(countrySlugTreatment);

  const isPositionInDoctorCountry = doctorCountry.some(
    (countryObj) => countryObj.country === countrySlug
  );
  const isPositionCity = hospital.some((e) => e.location === countrySlug);

  const isPositionTreatmentCity = hospital.some((e) => e.location === citySlug);

  if (isPositionInDoctorCountry === true) {
    return {
      title:
        "Best " +
        formattedSpeciality +
        " " +
        "hospitals in " +
        formattedCountry +
        " " +
        "View reviews - " +
        currentYear,

      description:
        "Find Updated list of " +
        formattedSpeciality +
        " " +
        "hospitals in " +
        formattedCountry +
        ". Find Top " +
        formattedSpeciality +
        " " +
        "Surgeons in " +
        formattedCountry +
        " " +
        "and review | Book hassle free appointment",

      alternates: {
        canonical: `https://medflick.com/hospitals/${combinedSlug}`,
      },
    };
  } else if (isPositionCity === true) {
    return {
      title:
        "Best " +
        formattedSpeciality +
        " " +
        "hospitals in " +
        formattedCountry +
        ", " +
        formattedCity +
        " " +
        "View reviews - " +
        currentYear,
      description:
        "Find Updated list of " +
        formattedSpeciality +
        " " +
        "hospitals in " +
        formattedCountry +
        ", " +
        formattedCity +
        ". Find Top " +
        formattedSpeciality +
        " " +
        "Surgeons in " +
        formattedCountry +
        ", " +
        formattedCity +
        " " +
        "and review | Book hassle free appointment",
      alternates: {
        canonical: `https://medflick.com/hospitals/${combinedSlug}`,
      },
    };
  } else if (isPositionTreatmentCity === true) {
    return {
      title:
        "Best " +
        formattedCountry +
        " " +
        "hospitals in " +
        formattedCity +
        ", " +
        formattedTreatmnetCountry +
        "- View review " +
        currentYear,
      description:
        "Find Updated List of " +
        formattedCountry +
        " " +
        "Specialist hospitals in " +
        formattedCity +
        "," +
        formattedTreatmnetCountry +
        ". Find Top " +
        formattedCountry +
        " " +
        "Specialist " +
        formattedCity +
        "," +
        formattedTreatmnetCountry +
        " and reviews | Book hassle-free appointment",
    };
  } else {
    return {
      title:
        "Best " +
        formattedSpeciality +
        " " +
        "hospitals | Experts " +
        formattedSpeciality +
        " " +
        "Surgeons View Review - " +
        currentYear,

      description:
        "Find Updated List Of " +
        formattedSpeciality +
        " " +
        "hospitals. Find top " +
        formattedSpeciality +
        " " +
        "surgeons and review | Book hassle free appointment ",
      alternates: {
        canonical: `https://medflick.com/hospitals/${combinedSlug}`,
      },
    };
  }
}
