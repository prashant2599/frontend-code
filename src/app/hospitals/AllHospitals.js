import getAllHospitals from "../lib/getAllHospitals";
import HospitalShare from "../Home/hospitalForm/HospitalShare";
import HospitalForm from "../Home/hospitalForm/HospitalForm";
import Link from "next/link";
import HospitalSearch from "./[...slug]/HospitalSearch";
import AllHospitalPagination from "./AllHospitalPagination";
import AllHospitalsFilteration from "./AllHospitalsFilteration";
import AppointmentForm from "../Home/hospitalForm/AppointmentForm";
import React from "react";

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

const AllHospitals = async () => {
  const data = await getAllHospitals();
  const hospital = data.data.hospital;
  const hospitalGallery = data.data.hospital_gallery;
  const pageNumber = data.data.page;
  const count = data.data.count;

  return (
    <>
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <HospitalSearch />
        </div>
      </section>
      <section id="find-hospital-list">
        <div className="midbox-inner  wiki-mk">
          <h1>
            Medflick Assured Hospitals <span>({count} Results)</span>
          </h1>
          <AllHospitalsFilteration />
          <div className="hospital-midbox">
            <div className="hospital-midbox-left">
              {hospital.map((hospital) => {
                // Filter gallery items that match the current hospital's id
                const galleryImages = hospitalGallery.filter(
                  (gallery) =>
                    String(gallery.hospital_id) === String(hospital.id)
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
                                width="100%"
                              />
                            </Link>
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
              })}
              <AllHospitalPagination pageNumber={pageNumber} count={count} />
            </div>

            {/* Form */}
            <HospitalForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default AllHospitals;
