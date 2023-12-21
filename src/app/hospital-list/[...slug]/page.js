import Link from "next/link";
import HospitalShare from "@/app/Home/hospitalForm/HospitalShare";
import HospitalFilters from "@/app/hospitals/HospitalFilters";
import React from "react";
import HospitalForm from "@/app/Home/hospitalForm/HospitalForm";
import Image from "next/image";
import { AiTwotoneStar } from "react-icons/ai";
import { notFound } from "next/navigation";
import HospitalListPopUpForm from "@/app/Home/hospitalForm/HospitalListPopUpForm";
import HospitalSearch from "@/app/hospitals/[...slug]/HospitalSearch";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";

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
    return (
      <>
      <NewHeader />
        <section id="find-doctors">
          <div className="midbox-inner  wiki-mk">
           <HospitalSearch hospital={hospital} slug={combinedSlug} />
          </div>
        </section>
        <section id="find-hospital-list">
          <div className="midbox-inner  wiki-mk">
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
                                <Link
                                  href={`/hospital/${hospital.slug}/${hospital.country}`}
                                >
                                  <Image
                                    src={`https://dev.medflick.com/hospital/${hospital.image}`}
                                    alt={hospital.name}
                                    width="181"
                                    height="187"
                                  />
                                </Link>
                              </div>
                              <ul class="tabs tab-h">
                                {galleryImages.map((e) => (
                                  <React.Fragment
                                    className="active"
                                    id="tab1"
                                    key={e.id}
                                  >
                                    {e.icon
                                      .split(",")
                                      .map((imageName, index) => (
                                        <li className="active" key={index}>
                                          <Image
                                            key={index}
                                            src={`https://dev.medflick.com/hospital/${imageName.trim()}`} // Trim to remove any leading/trailing spaces
                                            alt={`Image ${index + 1}`}
                                            width="150"
                                            height="50"
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
                          <Link
                            href={`/hospital/${hospital.slug}/${hospital.country}`}
                          >
                            <h3>{hospital.name}</h3>
                          </Link>

                          <div className="rating-star">
                            5{" "}
                            <i>
                              <AiTwotoneStar />
                            </i>{" "}
                            (523)
                          </div>

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
                            hospital.short_description.length > 200
                              ? `${hospital.short_description.slice(0, 200)}...`
                              : hospital.short_description}
                          </div>
                        </div>

                        <div className="hospital-item-button">
                          <HospitalListPopUpForm
                            name={hospital.name}
                            hospitalId={hospital.id}
                          />
                          <Link
                            href={`/hospital/${hospital.slug}/${hospital.country}`}
                            className="view-profile"
                          >
                            View Profile{" "}
                            <img src="/images/2023/05/profile.png" alt="icon" />
                          </Link>
                          {/* share  */}
                          <HospitalShare
                            slug={hospital.slug}
                            country={hospital.country}
                          />

                          <div className="hospital-location-box">
                            {hospital.address}
                            <img src="/images/2023/05/loc.png" alt="icon" />
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
  const combinedSlug = params.slug.join("/");
  return {
    alternates: {
      canonical: `https://medflick.com/hospital-list/${combinedSlug}`,
    },
  };
}
