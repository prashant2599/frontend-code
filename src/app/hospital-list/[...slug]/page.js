import Link from "next/link";
import HospitalShare from "@/app/Home/hospitalForm/HospitalShare";
import HospitalFilters from "@/app/hospitals/HospitalFilters";
import React from "react";
import HospitalForm from "@/app/Home/hospitalForm/HospitalForm";
import Image from "next/image";
import { notFound } from "next/navigation";
import HospitalSearch from "@/app/hospitals/[...slug]/HospitalSearch";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";
import getALLCountry from "@/app/lib/getAllCountry";
import AppointmentForm from "@/app/Home/hospitalForm/AppointmentForm";
import TreatmentHospitalPagination from "./TreatmentHospitalPagination";

function formatText(text) {
  if (typeof text === "string") {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return "Invalid input";
  }
}

const page = async ({ params }) => {
  try {
    const combinedSlug = params.slug.join("/");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/hospital-list/${combinedSlug}`,
      { cache: "no-store" }
    );

    const datas = await res.json();
    const hospital = datas.hospital_list.hospital_list;
    const treatment = datas.hospital_list.treatment;
    const info = datas.hospital_list.specility_name;
    const images = datas.hospital_list.hospital_gallery;
    const pageNumber = datas.hospital_list.page;
    const totalHospital = datas.hospital_list.count;

    const country = await getALLCountry();
    const doctorCountry = country.country_name;

    const parts = combinedSlug.split("/");
    const specialitySlug = parts[0];
    const countrySlug = parts[1];
    const citySlug = parts[2];

    const isPositionInDoctorCountry = doctorCountry.some(
      (countryObj) => countryObj.country === citySlug
    );

    const FormatedTreatment = formatText(countrySlug);
    const FormatedCity = formatText(citySlug);
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
                Best {FormatedTreatment} Hospital in {FormatedCity}{" "}
                <span>({totalHospital} Results)</span>
              </h1>
            ) : (
              <h1>
                Best {FormatedTreatment} Hospitals{" "}
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
                                    src={`https://dev.medflick.com/hospital/${hospital.image}`}
                                    alt={hospital.name}
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
                            </div>
                          </div>
                        </div>
                        <div className="hospital-item-doc">
                          <Link href={`/hospital/${hospital.slug}`}>
                            <h3>{hospital.name}</h3>
                          </Link>

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
                                src={`https://dev.medflick.com/hospital/${hospital.nabl}`}
                                alt={hospital.name}
                              />
                            )}
                            {hospital.nabh && (
                              <img
                                src={`https://dev.medflick.com/hospital/${hospital.nabh}`}
                                alt={hospital.name}
                              />
                            )}
                            {hospital.jci && (
                              <img
                                src={`https://dev.medflick.com/hospital/${hospital.jci}`}
                                alt={hospital.name}
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
                <TreatmentHospitalPagination
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
  const parts = combinedSlug.split("/");
  const specialitySlug = parts[0];
  const countrySlug = parts[1];
  const citySlug = parts[2];
  const country = await getALLCountry();
  const doctorCountry = country.country_name;
  const isPositionInDoctorCountry = doctorCountry.some(
    (countryObj) => countryObj.country === citySlug
  );
  const FormatedTreatment = formatText(countrySlug);
  const FormatedCity = formatText(citySlug);

  if (isPositionInDoctorCountry === true) {
    return {
      title:
        "Best " +
        FormatedTreatment +
        " " +
        "hospitals in " +
        FormatedCity +
        "- " +
        "View review -" +
        currentYear,
      description:
        "Find Updated List of " +
        FormatedTreatment +
        " " +
        "Specialist hospitals in " +
        FormatedCity +
        ". Find Top " +
        FormatedTreatment +
        " " +
        "Specialist " +
        FormatedCity +
        " and reviews | Book hassle-free appointment",
      alternates: {
        canonical: `https://medflick.com/hospital-list/${combinedSlug}`,
      },
    };
  } else {
    return {
      title:
        "Best " +
        FormatedTreatment +
        " " +
        "hospitals | Medflick Doctor List -" +
        currentYear,
      description:
        "Find Updated List of " +
        FormatedTreatment +
        " " +
        "Specialist hospitals. Find Top " +
        FormatedTreatment +
        " " +
        "Specialist  and reviews | Book hassle-free appointment",
      alternates: {
        canonical: `https://medflick.com/hospital-list/${combinedSlug}`,
      },
    };
  }
}
