"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import AppointmentForm from "../Home/doctorForm/AppointmentForm";
import ShareProfile from "../Home/doctorForm/ShareProfile";
import DoctorsSearch from "../doctors/[...slug]/DoctorsSearch";
import DoctorForm from "../Home/doctorForm/DoctorForm";
import SpecialitySelect from "../doctorFilter/SpecialitySelect";
import FilterHospitalCategory from "./FilterHospitalCategory";
import { notFound } from "next/navigation";

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

const CategoryWiseDoctor = () => {
  const searchParams = useSearchParams();
  const [doctor, setDoctor] = useState([]);
  const [hospital, setHospital] = useState("");

  const [info, setInfo] = useState([]);
  const [hospitalIcon, setHospitalIcon] = useState([]);
  const [speciality, setSpeciality] = useState([]);

  useEffect(() => {
    const hospital = searchParams.get("hospital");
    if (!hospital) {
      notFound();
      return;
    }

    if (hospital) {
      setHospital(hospital);
    }
    const speciality = searchParams.get("speciality");
    if (speciality) {
      setSpeciality(speciality);
    }
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor-list?hospital=${hospital}&speciality=${speciality}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setDoctor(response.data.doctors_list.doctors_list);
        setInfo(response.data.doctors_list.specility_name);
        setHospitalIcon(response.data.doctors_list.hospital_image);
        setTreatment(response.data.doctors_list.treatment);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchParams]);

  const FormatedHospital = formatText(hospital);

  return (
    <>
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <DoctorsSearch />
        </div>
      </section>

      <section id="find-doctors-list">
        <div className="midbox-inner  wiki-mk">
          {/* {isPositionInDoctorCountry ? (
            <h1>
              Best {FormatedTreatment} Doctors in {FormatedCity}{" "}
              <span>({totalDoctor} Results)</span>
            </h1>
          ) : isPositionTreatment ? (
            <h1>
              Best {FormatedTreatment} Doctors{" "}
              <span>({totalDoctor} Results)</span>
            </h1>
          ) : (
            <h1>
              List of {FormatedHospital} Doctors{" "}
              <span>({doctor.length} Results)</span>
            </h1>
          )} */}
          <h1>
            List of {FormatedHospital} Doctors{" "}
            <span>({doctor.length} Results)</span>
          </h1>

          {/* filters nav section */}

          <FilterHospitalCategory hospital={hospital} speciality={speciality} />

          <div className="doctor-midbox">
            <div className="doctor-midbox-left">
              {doctor.length > 0 ? (
                doctor.map((e) => {
                  const matchedHospital = hospitalIcon?.find(
                    (hospital) => String(hospital.id) === e.hospital_id
                  );
                  return (
                    <div className="doctor-item-list" key={e.id}>
                      <div className="doctor-item-img">
                        <Link href={`/doctor/${e.slug}`}>
                          <img
                            src={`https://dev.medflick.com/doctor/${e.image}`}
                            alt={e.slug}
                          />
                        </Link>
                      </div>
                      <div className="doctor-item-doc">
                        <Link href={`/doctor/${e.slug}`}>
                          <h3>
                            {e.prefix} {e.first_name} {e.last_name}
                          </h3>
                        </Link>
                        <div
                          className="department-sub"
                          style={{ color: "#ff6800" }}
                        >
                          {e.designation.length > 55
                            ? `${e.designation.slice(0, 55)}...`
                            : e.designation}
                        </div>

                        <div className="department-sub-shotdesc">
                          {e.short_description &&
                          e.short_description.length > 100
                            ? `${e.short_description.slice(0, 100)}...`
                            : e.short_description}
                        </div>
                        <div className="doc-experience">
                          <div className="years-exper">
                            {e.experience_year}+ Years of Experience{" "}
                          </div>
                          {e.surgery_treatment !== null && (
                            <div className="successful-plus">
                              {e.surgery_treatment}+ Successful Surgeries
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="doctor-item-button">
                        <AppointmentForm
                          first={e.prefix}
                          middle={e.first_name}
                          last={e.last_name}
                          doctorId={e.id}
                          specialityId={e.speciality_id}
                        />

                        {e.slug ? ( // Check if e.slug has a value
                          <Link
                            href={`/doctor/${e.slug}`}
                            className="view-profile"
                          >
                            View Profile{" "}
                            <img  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/05/profile.png`} alt="icon" />
                          </Link>
                        ) : (
                          <span>No profile available</span>
                        )}

                        <ShareProfile slug={e.slug} />

                        <div className="doc-Hospital">
                          {formatText(e.location)}
                          {matchedHospital && (
                            <img
                              src={`https://dev.medflick.com/hospital/${matchedHospital.icon}`}
                              alt="icon"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  {setTimeout(() => {
                    <p style={{ textAlign: "center", fontSize: "18px" }}>
                      No Doctor Found
                    </p>;
                  }, 2000)}
                </div>
              )}
              {/* <TreatmentDoctorPagination
                slug={combinedSlug}
                doctor={doctor}
                treatment={treatment}
                pageNumber={pageNumber}
                totalDoctor={totalDoctor}
              /> */}
            </div>
            {/* form */}

            <DoctorForm info={info} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryWiseDoctor;
