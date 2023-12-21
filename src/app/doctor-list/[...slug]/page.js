import Link from "next/link";
import ShareProfile from "@/app/Home/doctorForm/ShareProfile";
import DoctorForm from "@/app/Home/doctorForm/DoctorForm";
import Image from "next/image";
import SpecialitySelect from "@/app/doctorFilter/SpecialitySelect";
import { notFound } from "next/navigation";
import DoctorListPopForm from "@/app/Home/doctorForm/DoctorListPopForm";
import DoctorsSearch from "@/app/doctors/[...slug]/DoctorsSearch";
import TreatmentDoctorPagination from "./TreatmentDoctorPagination";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";


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
    return (
      <>
        <NewHeader />
        <section id="find-doctors">
          <div className="midbox-inner  wiki-mk">
            <DoctorsSearch doctors={doctor} slug={combinedSlug} />
          </div>
        </section>
        <section id="find-doctors-list">
          <div className="midbox-inner  wiki-mk">
            {/* {info.doc_title && position1 === matchingCity && (
            <>
              <h1>
                Best {info.name} Doctors in {formattedcity}, {formattedcountry}{" "}
                <span>({doctor.length} Results)</span>
              </h1>
            </>
          )}
          {info.doc_title &&
            matchedTreatment &&
            position1 === matchedTreatment.slug && (
              <>
                <h1>
                  Best {formattedposition1} Doctors in {formattedcountry}{" "}
                  <span>({doctor.length} Results)</span>
                </h1>
              </>
            )}
          {info.doc_title &&
            position1 === matchingCountry &&
            !matchedTreatment && (
              <>
                <h1>
                  Best {info.name} Doctors in {formattedcountry}{" "}
                  <span>({doctor.length} Results)</span>
                </h1>
              </>
            )} */}

            {/* <h1>
            Medflick Assured Doctors <span>({doctor.length} Results)</span>
          </h1> */}
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

                          {e.slug ? ( // Check if e.slug has a value
                            <Link
                              href={`/doctor/${e.slug}`}
                              className="view-profile"
                            >
                              View Profile{" "}
                              <img
                                src="/images/2023/05/profile.png"
                                alt="icon"
                              />
                            </Link>
                          ) : (
                            <span>No profile available</span>
                          )}
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
  const combinedSlug = params.slug.join("/");
  return {
    openGraph: {
      images: "https://medflick.com/images/2023/02/logo.png",
    },
    alternates: {
      canonical: `https://medflick.com/doctor-list/${combinedSlug}`,
    },
  };
}
