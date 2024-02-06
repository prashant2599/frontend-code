"use client";
import HospitalSearch from "../hospitals/[...slug]/HospitalSearch";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import HospitalForm from "../Home/hospitalForm/HospitalForm";
import HospitalShare from "../Home/hospitalForm/HospitalShare";
import AppointmentForm from "../Home/hospitalForm/AppointmentForm";
import FilterationHospital from "../hospital-list-category/FilterationHospital";

const CountryWiseHospital = () => {
  const searchParams = useSearchParams();
  const [country, setCountry] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [hospitalGallery, setHospitalGallery] = useState([]);

  useEffect(() => {
    const country = searchParams.get("country");
    if (!country) {
      notFound();
      return;
    }

    if (country) {
      setCountry(country);
    }
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/hospital-list-category?country=${country}`;
   

    axios
      .get(apiUrl)
      .then((response) => {
        setHospitals(response.data.data);
        setHospitalGallery(response.data.hospital_gallery);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchParams]);
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
            Medflick Assured Hospitals <span>({hospitals.length} Results)</span>
          </h1>
          {/* <AllHospitalsFilteration /> */}
          <FilterationHospital country={country} />
          <div className="hospital-midbox">
            <div className="hospital-midbox-left">
              {hospitals.map((hospital) => {
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
                                <li className="active" id="tab1" key={e.id}>
                                  <img
                                    src={`https://dev.medflick.com/hospital/${e.icon}`}
                                  />{" "}
                                </li>
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
                        <img src="/images/2023/05/profile.png" alt="icon" />
                      </Link>

                      <HospitalShare
                        slug={hospital.slug}
                        country={hospital.country}
                      />

                      <div className="hospital-location-box">
                        {/* {formatText(hospital.city)} */}
                        <img src="/images/2023/05/loc.png" alt="icon" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <HospitalForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default CountryWiseHospital;
