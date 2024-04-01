import Link from "next/link";
import ShareProfile from "@/app/Home/doctorForm/ShareProfile";
import DoctorForm from "@/app/Home/doctorForm/DoctorForm";
import { notFound } from "next/navigation";
import SpecialitySelect from "@/app/doctorFilter/SpecialitySelect";
import DoctorsSearch from "@/app/doctors/[...slug]/DoctorsSearch";
import TreatmentDoctorPagination from "./TreatmentDoctorPagination";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";
import getALLCountry from "@/app/lib/getAllCountry";
import AppointmentForm from "@/app/Home/doctorForm/AppointmentForm";

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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor-list/${combinedSlug}`,
      { cache: "no-store" }
    );

    const datas = await res.json();
    const doctor = datas.doctors_list.doctors_list;

    const hospitalIcon = datas.doctors_list.hospital_image;
    const treatment = datas.doctors_list.treatment;
    const info = datas.doctors_list.specility_name;
    const pageNumber = datas.doctors_list.page;
    const totalDoctor = datas.doctors_list.count;

    const country = await getALLCountry();
    const doctorCountry = country.country_name;

    const parts = combinedSlug.split("/");
    const specialitySlug = parts[0];
    const countrySlug = parts[1];
    const citySlug = parts[2];

    const isPositionInDoctorCountry = doctorCountry.some(
      (countryObj) => countryObj.country === citySlug
    );

    const isPositionTreatment = treatment.some((e) => e.slug === countrySlug);

    const FormatedTreatment = formatText(countrySlug);
    const FormatedCity = formatText(citySlug);
    const FormatedHospital = formatText(specialitySlug);
    return (
      <>
        <NewHeader />
        <section id="find-doctors">
          <div className="midbox-inner  wiki-mk">
            <DoctorsSearch />
          </div>
        </section>
        <section id="find-doctors-list">
          <div className="midbox-inner  wiki-mk">
            {isPositionInDoctorCountry ? (
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
                            <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/doctor/${e.image}`}
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
                              <img
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/05/profile.png`}
                                alt="icon"
                              />
                            </Link>
                          ) : (
                            <span>No profile available</span>
                          )}
                        

                          <ShareProfile slug={e.slug} />

                          <div className="doc-Hospital">
                            {formatText(e.location)}
                            {matchedHospital && (
                              <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/hospital/${matchedHospital.icon}`}
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
                    <p style={{ textAlign: "center", fontSize: "18px" }}>
                      No Doctor Found
                    </p>
                  </div>
                )}
                <TreatmentDoctorPagination
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
  const FormatedHospital = formatText(specialitySlug);

  if (isPositionInDoctorCountry === true) {
    return {
      title:
        "Best " +
        FormatedTreatment +
        " " +
        "doctors in " +
        FormatedCity +
        "- " +
        "View review -" +
        currentYear,
      description:
        "Find Updated List of " +
        FormatedTreatment +
        " " +
        "Specialist doctors in " +
        FormatedCity +
        ". Find Top " +
        FormatedTreatment +
        " " +
        "Specialist " +
        FormatedCity +
        " and reviews | Book hassle-free appointment",
      alternates: {
        canonical: `https://medflick.com/doctor-list/${combinedSlug}`,
      },
    };
  } else {
    return {
      title: "List of Best Doctors " + FormatedHospital + " " + currentYear,
      description:
        "Find Updated List of " +
        FormatedHospital +
        " " +
        "Specialist doctors. Find Top " +
        FormatedHospital +
        " " +
        "Specialist  and reviews | Book hassle-free appointment",
      alternates: {
        canonical: `https://medflick.com/doctor-list/${combinedSlug}`,
      },
    };
  }
}
