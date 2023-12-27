import { AiTwotoneStar } from "react-icons/ai";
import Link from "next/link";
import SpecialitySelect from "@/app/doctorFilter/SpecialitySelect";
import DoctorForm from "@/app/Home/doctorForm/DoctorForm";
import ShareProfile from "@/app/Home/doctorForm/ShareProfile";
import Image from "next/image";
import DoctorListPopForm from "@/app/Home/doctorForm/DoctorListPopForm";
import DoctorPagination from "../DoctorPagination";
import DoctorsSearch from "./DoctorsSearch";

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

const Sdoctors = ({
  treatment,
  doctor,
  hospitalIcon,
  combinedSlug,
  info,
  pageNumber,
  totalDoctor,
  doctorCountry,
}) => {
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
  const isPositionCity = doctor.some((e) => e.location === countrySlug);

  const isPositionTreatmentCity = doctor.some((e) => e.location === citySlug);

  const formattedSpeciality = formatText(specialitySlug);
  const formattedCountry = formatText(countrySlug);
  const formattedCity = formatText(citySlug);
  const formattedTreatmentCountry = formatText(countrySlugTreatment);

  let updatedSpeciality;

  if (formattedSpeciality.includes("Neurosurgery")) {
    updatedSpeciality = formattedSpeciality.replace(
      /Neurosurgery/g,
      "Neurosurgeon"
    );
  } else if (formattedSpeciality.includes("Surgery")) {
    updatedSpeciality = formattedSpeciality.replace(/Surgery/g, "Surgeon");
  } else {
    updatedSpeciality = formattedSpeciality;
  }

  return (
    <>
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <DoctorsSearch doctors={doctor} slug={slugs} treatment={treatment} />
        </div>
      </section>

      <section id="find-doctors-list">
        <div className="midbox-inner  wiki-mk">
          {isPositionInDoctorCountry ? (
            <h1>
              Best {updatedSpeciality} Doctors in {formattedCountry}{" "}
              <span>({totalDoctor} Results)</span>
            </h1>
          ) : isPositionCity ? (
            <h1>
              Best {updatedSpeciality} Doctors in {formattedCountry},{" "}
              {formattedCity} <span>({totalDoctor} Results)</span>
            </h1>
          ) : isPositionTreatmentCity ? (
            <h1>
              Best {formattedCountry} Specialist  in {formattedCity},{" "}
              {formattedTreatmentCountry} <span>({totalDoctor} Results)</span>
            </h1>
          ) : (
            <h1>
              Best {updatedSpeciality} Doctors{" "}
              <span>({totalDoctor} Results)</span>
            </h1>
          )}
          {/* filters nav section */}
          <SpecialitySelect
            doctor={doctor}
            treatment={treatment}
            slug={combinedSlug}
          />

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
                          <Image
                            src={`https://dev.medflick.com/doctor/${e.image}`}
                            alt={e.slug}
                            width="181"
                            height="221"
                            className="doctor-speciality-img"
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
                          {e.designation}
                        </div>
                        {/* <div className="rating-star">
                          5{" "}
                          <i>
                            <AiTwotoneStar />
                          </i>{" "}
                          (523){" "}
                        </div> */}
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
                        <DoctorListPopForm
                          first={e.prefix}
                          middle={e.first_name}
                          last={e.last_name}
                          doctorId={e.id}
                        />
                        <Link
                          href={`/doctor/${e.slug}`}
                          className="view-profile"
                        >
                          View Profile{" "}
                          <img src="/images/2023/05/profile.png" alt="icon" />
                        </Link>

                        {/* share profile */}

                        <ShareProfile slug={e.slug} />

                        <div className="doc-Hospital">
                          {e.location.charAt(0).toUpperCase() +
                            e.location.slice(1)}
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
                  <h1 style={{ textAlign: "center", margin: "20px" }}>
                    No Doctor Found
                  </h1>
                </div>
              )}
              <DoctorPagination
                slug={combinedSlug}
                doctor={doctor}
                treatment={treatment}
                pageNumber={pageNumber}
                totalDoctor={totalDoctor}
              />
            </div>
            {/* form */}

            <DoctorForm info={info} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Sdoctors;
