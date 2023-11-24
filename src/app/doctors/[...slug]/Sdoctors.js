import { AiTwotoneStar } from "react-icons/ai";
import Link from "next/link";
import SpecialitySelect from "@/app/doctorFilter/SpecialitySelect";
import DoctorForm from "@/app/Home/doctorForm/DoctorForm";
import ShareProfile from "@/app/Home/doctorForm/ShareProfile";
import Image from "next/image";

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

const Sdoctors = ({ treatment, doctor, hospitalIcon, combinedSlug, info }) => {
  const slugs = combinedSlug;
  const parts = slugs.split("/");
  // const treatment = parts[0];
  const city = parts[2];
  const position1 = parts[1];



  // const matchedTreatment = treatment.find(
  //   (treatment) => treatment.slug === position1
  // );

  // const formattedposition1 = formatText(position1);
  // const formattedcity = formatText(position1);
  // const formattedcountry =
  //   doctor && doctor.length > 0 ? formatText(doctor[0].country) : null;

  // const matchingCity = doctor && doctor.length > 0 ? doctor[0].location : null;
  // const matchingCountry =
  //   doctor && doctor.length > 0 ? doctor[0].country : null;

  return (
    <>
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <div className="find-doctor-box">
            <h2>Find Doctors</h2>

            <div className="find-box">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search Doctor"
                  name="name"
                  required=""
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="location-box">
                <input
                  type="text"
                  placeholder="Any Location"
                  name="name"
                  required=""
                />
              </div>
              <button type="submit" name="en" className="find-doctor">
                Find Doctor
              </button>
            </div>
          </div>
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
                        <Image
                          src={`https://dev.medflick.com/doctor/${e.image}`}
                          alt={e.slug}
                          width="181"
                          height="221"
                          className="doctor-speciality-img"
                        />
                      </div>
                      <div className="doctor-item-doc">
                        <h3>
                          {e.prefix} {e.first_name} {e.last_name}
                        </h3>
                        <div className="department-sub">{e.designation}</div>
                        {/* <div className="rating-star">
                          5{" "}
                          <i>
                            <AiTwotoneStar />
                          </i>{" "}
                          (523){" "}
                        </div> */}

                        <div className="doc-experience">
                          <div className="years-exper">
                            {e.experience_year}+ Years of Experience{" "}
                          </div>
                          <div className="successful-plus">
                            {e.surgery_treatment}+ Successful Surgeries{" "}
                          </div>
                        </div>
                      </div>
                      <div className="doctor-item-button">
                        <Link href="/query" className="book-app">
                          Book Appointment{" "}
                          <img src="/images/2023/05/book.png" alt="icon" />
                        </Link>

                        {e.slug ? ( // Check if e.slug has a value
                          <Link
                            href={`/doctor/${e.slug}`}
                            className="view-profile"
                          >
                            View Profile{" "}
                            <img src="/images/2023/05/profile.png" alt="icon" />
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
